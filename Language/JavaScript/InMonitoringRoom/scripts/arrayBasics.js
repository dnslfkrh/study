let numbers = [1, 2, 3, 4, 5];

numbers.push(6); // 끝에 원소 추가

numbers.unshift(0); // 맨앞에 원소 추가

numbers.pop(); // 끝에서 원소 제거

numbers.shift(); // 맨앞에서 원소 제거

// 새로운 배열로 변환
let newNumbers = numbers.slice(2, 4); // 2번째부터 3번째 요소까지 가져와서 배열 생성
console.log(newNumbers); // [3, 4]