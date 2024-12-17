## 다양한 기본 기능

NestJS는 데이터베이스, 객체 관계 매핑(object-relational mapping, ORM), 설정, 검사 등 다양한 기능을 프레임워크 내에서 기본적으로 제공한다. 그러면서 필요한 기능을 설치를 통해 자유롭게 사용할 수 있는 NodeJS의 장점은 그대로 유지한다.

NestJS는 Angular(앵귤러)로부터 영향을 많이 받은 프레임워크이다. 모듈/컴포넌트 기반으로 프로그램을 작성하여 재사용성을 높인다.

### 도입한 객체 지향 개념
- **제어 반전**(inversion of control, IoC),

- **의존성 주입**(dependency injection),

- **관점 지향 프로그래밍**(aspect-oriented programming, AOP)

NestJS는 최신 프레임워크가 갖춰야 하는 기능(**CQRS**(command query responsibility separation), **HTTP 헤더 보안**, **인터셉터**, **미들웨어**, **스케줄링**, **로깅**, **테스팅**)을 대부분 프레임워크에 내장하고 있다.

## 객체 지향 프로그래밍과 모듈화

NestJS는 **DI**, **IoC**를 채용하여 객체 지향 프로그래밍과 모듈화를 쉽게 구현할 수 있다.

### DI (Dependency Injection)

객체가 직접 의존성을 생성하거나 관리하지 않고, 외부에서 필요한 의존성을 주입받는 것이다.  
예시: DI 컨테이너를 사용 `@Injectable()`

### IoC (Inversion of Control)

객체가 의존성을 스스로 관리하는 대신, 외부 컨테이너가 객체의 생명 주기와 의존성을 제어하는 원칙이다.  
예시: IoC 컨테이너로 객체의 생성과 소멸, 의존성 주입과 해제, 의존성 트리 관리
