# Rocky Linux 서버에 Docker 설치

Rocky Linux는 기본적으로 CentOS와 동일한 설정이다.

그래서 아래 링크의 내용을 그대로 수행하면 된다. (25년 11월 14일 기준)

## 공식 가이드

```
https://docs.docker.com/engine/install/centos/#install-docker-engine
```

## 설치 시작

### 1. 이전 버전 지우기

```bash
 sudo dnf remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

### 2. repository 셋업

```bash
sudo dnf -y install dnf-plugins-core
```

```bash
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

### 3. docker packages 설치

```bash
sudo dnf install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### 4. docker 실행 & 재기동 후 자동 실행


```bash
sudo systemctl enable --now docker
```

### 5. 작동 테스트

```bash
sudo docker run hello-world
```