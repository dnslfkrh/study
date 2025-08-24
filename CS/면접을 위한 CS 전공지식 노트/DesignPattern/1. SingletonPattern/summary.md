# Singleton Pattern (싱글톤 패턴)

하나의 클래스에 오직 하나의 인스턴스를 가지는 패턴.

## 장점

비용 절감: 만들어진 인스턴스를 다른 모듈이 공유하며 사용할 수 있기 때문에 인스턴스를 생성할 때 필요한 비용을 줄일 수 있음.

## 단점

높은 의존성: 여러 모듈에서 공유되며 사용되기에 의존성이 높아짐.

낮은 독립성: TDD(Test Driven Development) 진행 시 주로 단위 테스트를 하는데, 싱글톤 패턴으로 구현된 인스턴스는 독립성이 낮기 때문에 테스트 시 걸림돌이 될 수 있음.

## 자바스크립트에서의 싱글톤

```javascript
const obj = {
    a: 30
}

const obj2 = {
    a: 30
}

console.log(obj === obj2); // false
```

```javascript
class Singleton {
    constructor () {
        if (!Singleton.instance) {
            Singleton.instance = this;
        }
        return Singleton.instance;
    }
    
    getInstance() {
        return this;
    }
}

const a = new Singleton();
const b = new Singleton();
console.log(a === b); // true
```
## 의존성 주입

싱글톤 패턴의 단점으로 모듈 간의 높은 결합을 뽑을 수 있음. 이때 의존성 주입 (DI, Dependency Injection)을 통해 단점을 어느정도 해결 가능. (의존성이란 종속성이라고도 하며 A가 B에 의존성이 있다는 말은 B의 변경 사항에 대해 A 또한 변경되어야 한다는 것을 의미.)

### 의존성 주입의 장점

모듈을 쉽게 교체 가능한 구조로 변경되기 때문에 쉬운 테스팅과 마이그레이션 가능.

일관된 애플리케이션 의존성 방향.

### 의존성 주입의 단점

모듈이 더욱 분리되면서 클래스가 증가하기 때문에 복잡성이 증가 가능.

### 의존성 주입 원칙

상위 모듈을 하위 모듈에서 어떠한 것도 가져오지 않아야 함.

양쪽 모듈 둘 다 추상화에 의존해야 하며, 이때 추상화는 세부 사항에 의존하지 말아야 함.
