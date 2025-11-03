# Nginx 웹서버에서 여러 서비스를 분리하는 방법

단일 도메인(`example.com`)으로 여러 서비스를 제공해야 할 때,  
각 서비스의 `프론트엔드(정적 파일)`와 `백엔드(API)`를 구분해 운영할 수 있다.  
이 글에서는 `rewrite`와 `location` 블록을 중심으로 구조를 정리한다.


## 목표
- 하나의 도메인 아래에서 여러 서비스(`/serviceA`, `/serviceB`) 운영
- 각 서비스는 독립된 프론트엔드/백엔드 구조 유지
- API와 정적 파일을 구분 처리

---

## 디렉토리 구조 (예시)

```bash
/application_data/
 ├─ serviceA_frontend/
 │   └─ index.html
 └─ serviceB_frontend/
     └─ index.html
```

- `serviceA_frontend`, `serviceB_frontend` : 각 서비스별 프론트엔드 빌드 폴더  
- 백엔드 프로세스 예시  
  ```
  serviceA_backend → 127.0.0.1:4001
  serviceB_backend → 127.0.0.1:4002
  ```

---

## Nginx 설정 예제

```nginx
# upstream 정의 (예시)
upstream serviceA_backend {
    server 127.0.0.1:4001;
}
upstream serviceB_backend {
    server 127.0.0.1:4002;
}

# HTTP → HTTPS 리다이렉트
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}

# WebSocket 처리용 map
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

# rate limiting 영역
limit_req_zone $binary_remote_addr zone=api_zone:10m rate=20r/m;

server {
    listen 443 ssl;
    server_name example.com;

    # ===== SSL 설정 (실환경에 맞게 경로/옵션 교체) =====
    ssl_certificate     /etc/ssl/certs/example.com.crt;
    ssl_certificate_key /etc/ssl/private/example.com.key;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    # ===== 보안 헤더 =====
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    # 필요 시 Content-Security-Policy 추가

    # 업로드 허용 크기
    client_max_body_size 100M;

    # ===== Service A API =====
    location ^~ /serviceA/api {
        # 요청: /serviceA/api/models → 백엔드: /api/models
        # example.com/servicesA/api/models로 요청이 들어오면
        # localhost:4001/api/models로 요청을 넣어준다.
        rewrite ^/serviceA/api(.*)$ /api$1 break;

        # rate limit 적용
        limit_req zone=api_zone burst=40 nodelay;

        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

        proxy_connect_timeout 300s;
        proxy_send_timeout 300s;
        proxy_read_timeout 300s;

        proxy_pass http://serviceA_backend;
    }

    # ===== Service A Frontend =====
    location /serviceA/ {
        alias /application_data/serviceA_frontend/;
        index index.html;
        try_files $uri $uri/ /serviceA/index.html;
        autoindex off;
        # 정적 캐시(필요 시 조정)
        expires 1h;
        add_header Cache-Control "public";
    }

    # ===== Service B API =====
    location ^~ /serviceB/api {
        # example.com/servicesB/api/models로 요청이 들어오면
        # localhost:4002/api/models로 요청을 넣어준다.
        rewrite ^/serviceB/api(.*)$ /api$1 break;

        # rate limit 적용
        limit_req zone=api_zone burst=40 nodelay;

        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

        proxy_connect_timeout 300s;
        proxy_send_timeout 300s;
        proxy_read_timeout 300s;

        proxy_pass http://serviceB_backend;
    }

    # ===== Service B Frontend =====
    location /serviceB/ {
        alias /application_data/serviceB_frontend/;
        index index.html;
        try_files $uri $uri/ /serviceB/index.html;
        autoindex off;
        expires 1h;
        add_header Cache-Control "public";
    }
}
```

---

## 핵심 포인트

### 1️⃣ `rewrite`로 API 경로 정리
프론트엔드와 백엔드의 URI 구조를 맞추기 위해 rewrite 사용했다

```nginx
rewrite ^/serviceA/api(.*)$ /api$1 break;
```
- 예시로 `/serviceA/api/models` 요청이 `/api/models`로 변환되어 백엔드로 전달  
- `break`는 같은 location 내에서 rewrite 이후 처리를 멈추게 한다

---

### 2️⃣ `alias` vs `root`
정적 파일 경로 처리 방식의 차이

| 구분      | 동작 방식              | 예시 요청           | 실제 경로                                              |
| --------- | ---------------------- | ------------------- | ------------------------------------------------------ |
| **alias** | location 경로를 대체   | `/serviceA/main.js` | `/application_data/serviceA_frontend/main.js`          |
| **root**  | location 경로를 덧붙임 | `/serviceA/main.js` | `/application_data/serviceA_frontend/serviceA/main.js` |

SPA에서는 `alias`가 일반적이다.

---

### 3️⃣ `try_files`로 SPA 대응
Vue, React, Vite 기반 프론트엔드의 라우팅 문제 해결.

```nginx
try_files $uri $uri/ /serviceA/index.html;
```
- 정적 파일이 존재하지 않으면 `index.html`로 전달  
- 프론트엔드 라우터가 이후 경로를 처리함

---

### 4️⃣ Proxy 헤더와 타임아웃
안정적인 API 요청을 위해 다음 설정을 포함한다.

```nginx
proxy_set_header X-Real-IP $remote_addr;
proxy_connect_timeout 300s;
proxy_read_timeout 300s;
```

- 클라이언트의 실제 IP 전달  
- 대기 시간이 긴 요청(예: 파일 업로드)에 대비

---

## 정리

| 항목        | 역할            | 주요 설정               |
| ----------- | --------------- | ----------------------- |
| API 프록시  | 백엔드 연결     | `rewrite`, `proxy_pass` |
| 정적 파일   | 프론트엔드 서빙 | `alias`, `try_files`    |
| 공통 안정성 | 연결 유지       | 헤더, 타임아웃 설정     |

---

## 결론

단일 도메인에서 여러 서비스를 구분하려면 URI 기준으로 `location`을 나누고, `rewrite`로 URI 경로를 정리하면 된다.

이 구조를 통해  
- 서비스별 독립 배포 가능  
- 도메인 관리 단순화  
- API와 정적 파일 간 경로 충돌 방지 가능

---
