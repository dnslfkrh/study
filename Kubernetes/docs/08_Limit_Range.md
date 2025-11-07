# 리밋 레인지
기본적으로 쿠버네티스에서 컨테이너는 `무제한 컴퓨팅 리소스`로 실행된다. 쿠버네티스의 리소스 쿼터를 사용하면 클러스터 관리자는 네임스페이스별로 리소스 사용과 생성을 제한할 수 있다.

네임스페이스 내에서 파드는 리소스 쿼터에 정의된 만큼의 리소스만 사용할 수 있다.

클러스트 운영자 또는 네임스페이스 수준 관리자는 단일 오브젝트가 모든 리소스를 독점하지 않게 하는 것에 대해 우려할 수도 있다?

## 리밋 레인지 제약 조건
- 네임스페이스에서 파드 또는 컨테이너별 최소 및 최대 컴퓨팅 리소스 사용량을 지정한다.
- 네임스페이스에서 `퍼시스턴트볼륨클레임`별 최소 및 최대 스토리지 요청을 지정한다.
- 네임스페이스에서 리소스에 대한 요청과 제한 사이의 비율을 지정한다.
- 네임스페이스에서 컴퓨팅 리소스에 대한 기본 요청/제한을 설정하고 런타임에 있는 컨테이너에 자동으로 할당한다.

## 동작 순서
1. 관리자가 네임스페이스에 `LimitRange`를 만든다.
2. 사용자가 그 네임스페이스 안에 `Pod`를 만든다.
3. 쿠버네티스의 `어드미션 컨트롤러`가 LimitRange를 확인하고:
   1. request/limit 값이 없으면 기본값 할당
   2. 설정된 최소/최대 비율을 넘기면 거부한다.
4. 위반 시 Pod 생성은 실패한다.

## LimitRange 정의

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: cpi-resource-constraint
spec:
  limits:
  - default:
      cpu: 500m # limit 기본값
    defaultRequest:
      cpu: 500m # request 기본값 (손에 들고 있을 리소스 양)
    max:
      cpu: "1" # 최대 허용치
    min:
      cpu: 100m # 최소 허용치
```

### 이렇게 하면
- 아무 설정도 안 한 컨테이너는 자동으로 `requst=500m`, `limit=500`으로 할당한다.
- 직접 설정해도 min-max 범위를 벗어나면 에러난다.

## 문제 케이스 (단일 파드 생성 테스트 예제)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example-conflict-with-limitrange-cpu
spec:
  containers:
  - name: demo
    image: registry.k8s.io/pause:2.0
    resources:
      requests:
        cpu: 700m # 700m을 할당했지만, `limit: 500m`이 없어서 오류가 남.
```

## 정상 케이스 (단일 파드 생성 테스트 예제)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example-no-conflict-with-limitrange-cpu
spec:
  containers:
  - name: demo
    image: registry.k8s.io/pause:2.0
    resources:
      requests:
        cpu: 700m
      limits:
        cpu: 700m
```