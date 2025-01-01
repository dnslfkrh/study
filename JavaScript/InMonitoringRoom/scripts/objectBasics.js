const person = { name: "mark", age: 30 }

console.log(person.name); // mark
console.log(person.age); // 30
console.log(person["age"]); // 30

person.city = "Seoul"
console.log(person); // {name: 'mark', age: 30, city: 'Seoul'}

delete person.age;
console.log(person); // { name: 'mark', city: 'Seoul'}