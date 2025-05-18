// 1. 기본 타입
const age: number = 22;
const isStudent: boolean = true;
const nickname: string = "dnslfkrh";

// 2. 배열과 튜플
const scores: number[] = [1, 2, 3, 4, 5];
const profile: [string, number] = ["용욱", 22]; // 튜플은 고정된 길이와 타입을 가진 배열.

// 3. 타입 추론
const city = "Yongin"; // 타입스크립트에서 string으로 추론.

// 4. any, unknown
// 둘의 차이는 타입 검사 여부.
// any는 어떤 타입이든 허용되지만, unknown은 타입 검사를 해야 사용 가능.
let anything: any = "자유롭게 변함";
anything = 123;
anything = true;

const notSure: unknown = "확실하지 않음";
if (typeof notSure === "string") {
  console.log(notSure.toUpperCase());
}

// 5. 타입 단언
const someValue: unknown = "문자열";
const strLength1: number = (someValue as string).length; // 타입 단언을 통해 unknown을 string으로 변환.
const strLength2: number = (<string>someValue).length; // 다른 방법으로 타입 단언.

console.log(age, isStudent, nickname);
console.log(scores, profile, city);
console.log(strLength1, strLength2);