// 2.2.1 타입키워드 사용
type Foot = number;
type Pound = number;

type Patient = {
    name: string;
    height: Foot;
    weight?: Pound; // ? 있거나 없거나
};

let patient: Patient = {
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
    constructor(public firstName: string, public lastName: string, public age?: number){};
}

const p = new Person("john", "Smith");
console.log(p)
const e = new Person("john2", "Smith2", 25);
console.log(e)