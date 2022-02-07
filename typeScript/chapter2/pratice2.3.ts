/**
 * 2.3 any, unknown
 * any
 * 모든 타입의 값을 가질 수 있음
 * any 타입 역시 존재하지 않는 프로퍼티에 접근하면 런타입 중 예기치 않은 오류가 발생
 * 
 * unknown
 * 컴파일러는 프로퍼티에 접근하기 전 unknown 타입 범위를 줄이라고 경고한다.
 * 따라서 런타임 오류를 방지할 수 있습니다.
 **/

type Person = {
    address: string;
}

let person1: any;

person1 = JSON.parse('{"adress": "25 Broadway"}');

console.log(person1.adress);

let person2: unknown;

person2 = JSON.parse('{"address": "25 Broadway"}');

//console.log(person2.address);

const isPerson = (object: any): object is Person => !!object && "address" in object;

if(isPerson(person2)){
    console.log(person2.address);
} else{ 
    console.log('person2 is not a Person')
}