interface Animal {
    name: string;
    speak(): void;
}

class Dog implements Animal {
    constructor(public name: string) { }

    speak() {
        console.log(`$this.name) says woof!`);
    }
}

class Cat implements Animal {
    constructor(public name: string) { }

    speak() {
        console.log(`$this.name) says meow!`);
    }
}

const dog: Animal = new Dog("Minsu");
const cat: Animal = new Cat("Minji");

dog.speak(); // 출력: Minsu says woof!
cat.speak(); // 출력: Minji says meow!