# 환경
Local CMOS Clock을 NTP 원본으로 사용 중이던 윈도우 서버의 노후화로 시간이 점점 틀어지는 환경이었다.

NTP 클라이언트 서버와 NTP 서버가 될 서버는 모두 내부망에 들어가 있지만, NTP 서버의 경우 DMZ 존에 있는 구성이었다.

이는 DMZ 등 네트워크 아키텍쳐에서 일반적인 구성이라고 한다. (외부 NTP 서버를 통해 동기화한 NTP 서버를 내부 서버들이 동기화하는 형태)

## 문제
2~3일에 한번씩 수동으로 시간을 맞춰줘야 했다.

30초 이상 시간이 틀어지게 될 경우, 해당 서버에서 사용 중이던 DB 데이터에 문제가 생길 수 있다고 했다.

## 환경 파악
내부망에 구성된 NTP 서버와 클라이언트를 연결하는 방화벽 정책을 확인했다. 확인 결과, NTP 통신에 문제가 없는 구성으로 보였다.

ping 명령을 사용해봤다. 확인된 방화벽 정책 상 두 서버의 통신이 문제 없이 되어야 했다. ping 명령도 잘 작동했다.

# 문제 해결 시도
## 1. NTP 데이터 조회
```cmd
w32tm /stripchart /computer:<NTP서버IP> /dataonly /samples:1
```
타임아웃 에러가 발생했다.

## 2. 인바운드 방화벽 설정
아웃바운드로 나간 요청이 인바운드 방화벽에서 막히는 걸 의심했다. 그래서 구성된 아웃바운드와 정확하게 반대되는 인바운드 설정을 적용했다. 하지만 인바운드 정책은 사용된 적이 없다. (사용 중인 방화벽에서 적용된 정책 사용 횟수를 볼 수 있다. + 로그) 그래서 인바운드 설정은 롤백 후 다시 확인해봤다.

## 3. 단순 연결 시도
```cmd
w32tm /config /manualpeerlist:"<NTP서버IP>" /syncfromflags:manual /update

w32tm /query /status 
```
명령을 정상적으로 수행했다는 말이 나오지만, 조회도 안 됐는데 연결이 될리가 없다.

# 원인 파악
결론부터 말하자면 `NTP 서버` 설정이 꺼져 있었다. 그래서 타임아웃이 나오던 거였다.

## 해결
`윈도우+R` 후 `regedit`에 들어가 아래 경로로 들어갔다.
```
컴퓨터 > HKEY_LOCAL_MACHINE > SYSTEM > CurrentControlSet > Services > W32Time > TimeProviders > NtpServer
```
그리고 `Enabled` 옵션을 (1)로 바꿔줬다. 기존에 (0)으로 되어 있어 NTP 서버 기능이 꺼져 있었던 것이다. 즉, 통신이 어딘가에서 막히던 것이 아니라 그냥 NTP 서버 자체가 시간 동기화 데이터를 못 주는 상태였던 것이다.

## 연결 확인
NTP 서버를 켜준 뒤, 다시 연결을 시도했다.

```cmd
w32tm /stripchart /computer:<NTP서버IP> /dataonly /samples:1
```

먼저 데이터 조회가 되는지 확인해 봤는데, 타임아웃 에러 없이 잘 조회되었다. 그래서 바로 연결을 시도했다.

```cmd
w32tm /config /manualpeerlist:"<NTP서버IP>" /syncfromflags:manual /update

w32tm /query /status 
```
하지만 /status로 조회를 해보니 여전히 `Local CMOS Clock`을 원본으로 동기화하고 있었다.

```cmd
w32tm /resync /rediscover 
```

이걸로 다시 확인을 해봤지만, 연결할 서버가 없어서 연결하지 못한다고 결과가 나왔다.

그래서 다시 확인해보니, 신뢰할 수 있는 NTP로 설정하는 것을 빼먹었다.

```cmd
w32tm /config /reliable:yes /update 
```

위 명령으로 NTP 서버에서 NTP 데이터를 신뢰할 수 있게 설정했다. 그리고 다시 연결을 시도했다.

```cmd
w32tm /config /manualpeerlist:"<NTP서버IP>" /syncfromflags:manual /update

w32tm /query /status 
```

연결이 됐다. 동기화가 잘 된다.

# 결론
- 방화벽 문제가 아니였다.
- NTP 설정 문제였기 때문에 타임아웃이 발생했던 것이다.
- 타임아웃 = 항상 방화벽 문제는 아니다.
- AI가 항상 모든 가능성과 방안을 제안하지는 않다. (Enabled 설정은 구글링을 통해 찾았다.)