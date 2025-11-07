# HPA (HorizontalPodAutoscaler)
파드 부하를 보면서 자동으로 늘리거나 줄이는 동적 제어 장치이다.

## 전제 조건
HPA는 `request 대비 실제 사용량`을 가지고 `계산`하기 때문에 컨테이너에 `resources.requests`가 있어야 한다.

## 예제

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

- `myapp` Deployment를 모니터링한다.
- CPU 평균 사용량이 70%를 넘으면 파드를 늘린다.
- 파드는 최소 2개, 최대 10로 조절한다.

`실행 중인 파드의 평균 사용률``(모든 파드의 현재 CPU 사용량 / requests.cpu)`을 70%과 비교해 줄이거나 추가한다. 