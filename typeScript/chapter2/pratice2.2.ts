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

//2.2.2클래스 내 커스텀 타입 사용
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
// class Person {
//     constructor(public firstName: string, public lastName: string, public age?: number){};
// }

// const p = new Person("john", "Smith");
// console.log(p)
// const e = new Person("john2", "Smith2", 25);
// console.log(e)

//2.2.3 인터페이스를 사용한 커스텀 타입
// interface Person {
//     firstName: string;
//     lastName: string;
//     age: number;
// }

// function savePerson(person: Person): void{
//     console.log('Saving', person);
// }

// const p: Person = {
//     firstName: 'John',
//     lastName: 'Smith',
//     age: 25
// };

// savePerson(p);

//2.2.4 구조적 타입 시스템과 명목적 타입 시스템
 
//명목적 타입 시스템 
/** JAVA
 * class Person {
 *  String name;
 * }
 * 
 * class Customer {
 *  String name;
 * } 
 * Customer cust = new Person(); 구문 오류: 왼쪽과 오른쪽의 class 이름이 같지 않다
 **/ 

//구조적타입 시스템
// class Person {
//     name: String;
//     age: number;
// }

// class Customer {
//     name: String;
// }

// const cust: Customer = new Person(); // 사용가능

//구조적타입 시스템
// class Person {
//     name: String;
// }

// class Customer {
//     name: String;
//     age: number;
// }

// const cust: Customer = new Person(); // 사용불가

//2.2.5 커스텀 타입의 유니온
interface Rectangle{
    kind: 'rectangle';
    width: number,
    height: number;
}

interface Circle {
    kind: 'circle';
    radius: number;
}

type Shape = Rectangle | Circle;

function area(shape: Shape): number {
    switch(shape.kind){
        case 'rectangle': return shape.height * shape.width;
        case 'circle': return Math.PI * shape.radius ** 2;
    }
}

const myRectangle: Rectangle = {kind:'rectangle', width: 10, height: 20};
console.log(`Rectangle's area is ${area(myRectangle)}`);

const myCircle: Circle =  {kind:'circle', radius: 10};
console.log(`Circle's area is ${area(myCircle)}`);