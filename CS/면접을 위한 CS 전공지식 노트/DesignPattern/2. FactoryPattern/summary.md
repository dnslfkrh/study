# Factory Pattern (팩토리 패턴)

객체를 사용하는 코드에서 객체 생성 부분을 분리해 추상화한 패턴이자 상속 관계에 있는 두 클래스에서 상위 클래스가 뼈대를 결정하고, 하위 클래스에서 객체 생성에 대한 구체적인 내용을 결정하는 패턴.

객체 생성을 담당하는 클래스가 상위 클래스와 하위 클래스로 분리되기 때문에 비교적 낮은 결합도를 가지며, 뼈대만 결정하면 되기 때문에 더욱 많은 곳에서 유연하게 사용될 수 있음.

객체의 생성을 담당하는 로직이 한 곳으로 분리되어 있기 때문에 유지 보수성이 증가.

## 자바스크립트에서의 팩토리 패턴
```javascript
class Car {
    drive() {
        throw new Error(“Method ‘drive()’ must be implemented.”); // 메서드 구현 강제
    }
}

class Sedan extends Car {
    drive() {
        console.log(“Sedan”);
    }
}

class SUV extends Car {
    drive() {
        console.log(“SUV”);
    }
}

class Truck extends Car {
    drive() {
        console.log(“Truck”);
    }
}

// 생성해야 되는 자동차의 종류가 늘어나면 이곳만 수정하면 됨 (new는 이곳에서만 사용)
class CarFactory {
    static createCar(type) {
        switch (type.toLowerCase()) {
            case “sedan”:
                return new Sedan();
            case “suv”:
                return new SUV();
            case “truck”:
                return new Truck();
            default:
                return new Error(“Unknown Car Type.”);
        }
    }
}

// 매번 new를 사용하지 않고 하나의 클래스로 객체를 생성할 수 있음
const car1 = CarFactory.createCar(“sedan”);
const car2 = CarFactory.createCar(“suv”);
const car3 = CarFactory.createCar(“truck”);
```

## 팩토리 패턴 정리 (내가 이해한 팩토리 패턴)

팩토리 패턴을 쓰지 않으면 클라이언트에서 다이렉트로 각각 필요한 생성 클래스를 호출하기 때문에 여러 클래스가 뒤죽박죽 연결되어 유지 보수가 어려워질 수 있음. (자동차 객체 생성이면 자동차 종류마다의 클래스를 호출해야 됨)

팩토리 패턴을 사용하면 클라이언트에서 객체 생성이 필요할 때 하나의 클래스만 호출하기 때문에 코드와 클래스의 연결이 가벼워지고, 그에 따라 유지 보수성이 증가함. (자동차 팩토리 클래스가 있으면 해당 클래스만 호출해서 원하는 자동차 종류를 생성할 수 있음)
