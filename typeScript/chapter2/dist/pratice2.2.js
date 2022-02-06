let patient = {
    name: 'Joe Smith',
    height: 5
};
//클래스 내 커스텀 타입 사용
// class Person {
//     firstName: string;
//     lastName: string;
//     age: number;
// }
// const p = new Person();
// p.firstName = "John";
// p.lastName = "Smith";
// p.age = 25; 
//생성자가 추가된 Person class
class Person {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    ;
}
const p = new Person("john", "Smith");
console.log(p);
const e = new Person("john2", "Smith2", 25);
console.log(e);
