#### 대학교 네트워크 강의 수업 자료를 바탕으로 정리한 글이다.

기본적인 네트워크 지식을 다룬다.

## 네트워크 계층

다른 네트워크에 있는 목적지로 데이터를 전달하려면 네트워크 계층의 기술이 필요하다.

### 데이터 링크 계층의 한계

이더넷 규칙을 기반으로 데이터 전송을 진행하지만, 인터넷 또는 다른 네트워크로는 데이터를 전송할 수 없다.

### 네트워크 간의 통신

서로 다른 네트워크 간의 통신을 가능하게 하는 것이 네트워크 계층이다.

## IP

네트워크 계층에는 IP(Internet Protocol)라는 프로토콜이 있다.

-   IP 주소는 어떤 네트워크에 속한 컴퓨터인지를 구분할 수 있게 도와준다.
-   IP 주소가 있으면 다른 네트워크에 있는 목적지를 지정할 수 있다.

### 연결 구조

목적지 IP 주소까지 어떤 경로로 데이터를 보낼지 결정하는 것을 라우팅(Routing)이라고 한다.

-   라우팅은 라우터라는 장비가 한다.
-   라우터에는 라우팅 테이블이 있어서 경로 정보를 등록하고 관리한다.

### IP 헤더

1.  버전
2.  헤더 길이
3.  서비스 유형
4.  전체 패킷 길이
5.  ID (일련번호)
6.  조각 상태
7.  조각의 위치
8.  TTL
9.  프로토콜
10.  헤더 체크성
11.  출발지 IP 주소 (32bit)
12.  목적지 IP 주소 (32bit)

### IPv4

-   32bit
-   컴퓨터가 읽기 위해 8bit 단위로 나눠서 표시한다.

### IPv6

-   128bit

### MAC 주소

-   48bit, 16진수

### IP 주소 클래스

일반적인 네트워크에서는 A~C class만 사용할 수 있다.

-   A class: 대규모 네트워크 주소
-   B class: 중형 네트워크 주소
-   C class: 소규모 네트워크 주소
-   D class: 멀티캐스트(multicasst)
-   E class: 연구 및 특수 용도 주소

### 공인 IP 주소 범위

-   A: 1.0.0.0 ~ 9.255.255.255, 11.0.0.0 ~ 126.255.255.255
-   B: 128.0.0.0 ~ 172.15.255.255, 172.32.0.0 ~ 191.255.255.255
-   C: 192.0.0.0 ~ 192.162.255.255, 192.169.0.0 ~ 223.255.255.255

### 사설 IP 주소 범위

-   A: 10.0.0.0 ~ 10.255.255.255
-   B: 172.16.0.0 ~ 172.31.255.255
-   C: 192.168.0.0 ~ 192.168.255.255

## 네트워크 주소

전체 네트워크에서 작은 네트워크를 식별하는 데 사용된다.

-   예시: 192.168.1.0 (시작점)

## 브로드캐스트 주소

해당 네트워크에서 모든 컴퓨터에 데이터를 보낼 때 사용된다.

-   예시: 192.168.1.255 (끝점)

## 서브네팅

네트워크는 분할하는 것을 말한다.

네트워크 ID, 호스트 ID로 구성되어 있던 것이 서브넷 ID가 추가되어 나눠진다.

## 서브넷

분할된 네트워크를 말한다.

### 프릭스 표기법

서브넷 마스크에 포함된 1의 개수를 /로 표현 (/24, /16)

## 전송 계층

### 역할

목적지까지 신뢰할 수 있는 데이터를 전달하는 역할을 수행한다.

1.  오류를 점검하는 기능, 오류 발생 시 재전송 요청
2.  전송된 데이터의 목적지가 어떤 애플리케이션인지 식별하는 기능

## TCP

### TCP 헤더

1.  출발지 포트 번호 (16비트)
2.  목적지 포트 번호 (16비트)
3.  일련번호 (32비트)
4.  확인 응답 번호 (32비트)
5.  헤더 길이 (4비트)
6.  예약 영역 (6비트)
7.  코드 비트 (6비트)
8.  윈도우 크기 (16비트)
9.  체크섬 (16비트)
10.  긴급 포인터 (16비트)
11.  옵션

### 3-way 핸드셰이크

컴퓨터 A가 컴퓨터 B와 연결하고 싶다.

1.  A의 연결 확립 요청 (SYN)
2.  B의 확립 응답과 연결 확립 요청 (SYN + ACK)
3.  A의 확립 응답 (ACK)  
    연결 종료 시 FIN ACK 사용
4.  연결 종료 요청 (FIN)
5.  연결 종료 응답과 종료 요청 (ACK + FIN)
6.  연결 종료 응답 (ACK)

## 포트 번호

애플리케이션을 확인할 수 있다.

-   SSH: 22
-   SMTP: 25
-   DNS: 53
-   HTTP: 80
-   POP3: 110
-   HTTPS: 443

## UDP

TCP와 달리 전송 자체에만 초점이 맞춰진 프로토콜으로, 연결의 신뢰성과 정확성을 보다 요구하지 않으며, 빠르고 효율적인 전송을 돕는다.

### UDP 헤더

신뢰성과 정확성이 요구되지 않기 때문에 아래 정보들로 충분하다. 그렇기 때문에 빠르고 효율적으로 데이터를 전송할 수 있다.

1.  출발지 포트 번호
2.  목적지 포트 번호
3.  길이
4.  체크섬