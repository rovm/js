let firstName: string;
//let age: number;

/** 
 * string : 문자열
 * boolean : true/false 값
 * number : 숫자 
 * symbol : Smybol 생성자를 호출해 생성된 고윳값
 * any : 모든 타입을 허용하는 타입, 코드를 쓰지 동안 정해지지 않은 변수를 지정 할 수 있음
 * unknown : any와 비슷하나 먼저 타입을 지정하거나 좁히지 않으면 조작이 허용되지 않음
 * never : 도달할 수 없는 코드를 나타냄
 * void : 값이 없음
 **/

const odr = Symbol('orderID'); //새 symbol 생성
const myOrder = {
    odr : "123"
};

console.log(myOrder['odr']);

/* never는 함수가 절대 종료되지 않는 함수나 오류를 발생시키기 위해서만 존재하는 함수 */
// const logger = () => { 
//     while(true){
//         console.log('서버가 실행중입니다.')
//     }
// }

/* void 타입은 변수 선언이 아니라 값을 반환하지 않는 함수를 선언 */
function logError(errorMessage: string): void {
    console.log(errorMessage);
}

logError("삐빅");

const age = 25;
function getTax(income: number): number {
    return income * 0.15;
}

let yourTax = getTax(50000);
console.log(yourTax);

function calcTax(state: string, income: number, dependents: number): number | undefined{
    if(state === 'NY'){
        return income * 0.06 - dependents * 500;
    } else if(state === 'NJ'){
        return income * 0.05 - dependents * 300;
    }
}

// let tax: number = calcTax('NJ', 50000, 'two');
let tax: number = calcTax('NJ', 50000, 2)
