// 1. 함수 파라미터와 반환 타입
function add(x: number, y: number): number {
  return x + y;
}

// 2. 선택적 파라미터
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
}

// 3. 기본 파라미터
function countdown(start: number = 10): void {
  for (let i = start; i >= 0; i--) {
    console.log(i);
  }
}

// 4. 가변(REST) 파라미터
function sumAll(...numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0); // 누적값과 현재값을 더해서 새로운 누적값
}
// reduce는 배열의 각 요소에 대해 주어진 함수를 실행하고, 그 결과를 단일 값으로 줄여주는 메서드.
// 위 코드에서는 acc는 누적값, curr은 현재 요소를 나타냄.
// 초기값은 0으로 설정되어 있음.
// reduce 메서드는 배열을 순회하면서 각 요소를 누적값에 더해주고, 최종적으로 누적값을 반환함.