# 관점 지향 프로그래밍 (Aspect-Oriented Programming, AOP)이란?
관점 지향 프로그래밍은 소프트웨어 개발에서 **핵심 기능**(Core Logic)과 **횡단 관심사**(Cross-Cutting Concerns)를 **분리**하기 위해서 등장한 프로그래밍 패러다임이다.

이때, 횡단 관심사는 애플리케이션의 여러 부분에서 공통적으로 사용되지만, 비즈니스 로직과는 직접적인 관련이 없는 기능을 말한다.

로깅, 보안, 트랜잭션 관리 등 애플리케이션 전반에 걸쳐 반복 사용되지만, 비즈니스 로직과 섞여 있는 경우, 코드의 복잡성과 중복이 증가하는 기능들을 주로 횡단 관심사라고 표현한다.

관점 지향 프로그래밍, AOP는 이런 기능들은 핵심 로직과 분리하여 관리할 수 있게 해준다.

## AOP의 등장 배경 - 객체 지향 프로그래밍(OOP)의 한계
객체 지향 프로그래밍, **OOP**는 데이터와 메서드를 클래스로 묶어 코드 재사용과 확장성을 높이는 데 유리한 프로그래밍 패러다임이다.

### 하지만 OOP는 아래와 같은 한계점이 존재한다.
- **횡단 관심사의 중복**: 여러 클래스에서 로깅, 보안, 트랜잭션 같은 기능이 중복으로 등장한다.
- **복잡한 코드**: 핵심 비즈니스 로직과 횡단 관심사가 섞여 있어 코드가 복잡하다.
- **어려운 유지보수**: 횡단 관심사를 수정하려면 여러 클래스의 코드를 수정해야 한다.

### AOP는 이러한 OOP의 한계를 보완할 수 있다.
- **횡단 관심사 분리**: 핵심 비즈니스 로직과 횡단 관심사를 분리하여 깔끔한 코드를 유지한다.
- **중복 제거**: 공통 기능을 하나로 모듈화하여 재사용성을 더욱 높인다.
- **용이한 유지보수**: 횡단 관심사를 한 곳에서 관리하므로 수정이 쉽다.

## AOP의 핵심 개념
### Cross-Cutting Concerns(횡단 관심사): 여러 부분에서 공통적으로 요구되는 기능이다.
- **로깅**: 각 메서드의 실행을 기록한다.
- **보안**: 특정 조건에서 메서드 실행을 관리한다.
- **트랜잭션**: 데이터베이스 작업의 일관성을 보장한다.
- **에러 핸들링**: 오류 발생 시 일괄 처리한다.

### Aspect(관점): 횡단 관심사를 모듈화 한 것을 “Aspect”라고 한다.
- **Advice**: 언제 횡단 관심사를 적용할 지를 정의한다.
- **Pointcut**: 횡단 관심사를 적용할 지점을 정의한다.

## AOP 적용 방식
- **프록시 기반 적용**: 실행 시점에 프록시 객체를 생성하여 메서드 호출을 가로챈다.
- **바이트코드 조작**: 컴파일 시점에 바이트코드를 수정하여 횡단 관심사를 삽입한다.
- **데코레이터와 인터셉터**: 메서드 호출을 가로채거나 보상하는 방법으로 적용한다.

## AOP 적용 기술
### Java 기반 AOP
- **Spring AOP**: 프록시 기반으로 AOP 기능을 제공한다.
- **AspectJ**: 바이트코드 조작을 사용해 강력한 AOP 기능을 제공한다.

### JavaScript, TypeScript 기반 AOP
- **NestJS**: 데코레이터와 인터셉터를 사용해 AOP를 구현할 수 있다.
- **Middy** (AWS Lambda): 미들웨어를 이용해 AOP 패턴을 적용한다.