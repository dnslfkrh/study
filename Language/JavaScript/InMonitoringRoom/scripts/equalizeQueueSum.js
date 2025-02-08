function minOperation(queue1, queue2) {
    let sum1 = queue1.reduce((acc, num) => acc + num, 0); // queue1의 총합
    let sum2 = queue2.reduce((acc, num) => acc + num, 0); // queue2의 총합
    let totalSum = sum1 + sum2; // 추 큐의 총합

    // 총합이 홀수면 나눌 수 없음 -1 반환
    if (totalSum % 2 !== 0) {
        return -1;
    }

    let target = totalSum / 2; // 목표: 같은 합 == 두 합의 절반
    let operation = 0;
    let maxOperation = queue1.length * 3; // 최악 경우 최대한 반복

    let combinedQueue = [...queue1, ...queue2]; // 두 큐를 하나의 배열로 연결 (combinedQueue는 큐1, 2의 원소 순서 그대로)
    let i = 0; // 컴바인드 배열의 첫번째 원소부터 시작할 예정 == queue1 원소를 담당
    let j = queue1.length; // 컴바인드 배열 중 queue2의 원소부터 시작할 예정 == queue2 원소를 담당

    while (i < queue1.length && j < combinedQueue.length && operation < maxOperation) {
        // sum1, sum2 모두 같은 합을 가져야 하니까 하나만 비교해도 됨
        if (sum1 === target) {
            return operation; // 이동 횟수 반환
        }

        if (sum1 < target) { // sum1이 전체값의 반보다 작으면
            sum1 += combinedQueue[j]; // sum1에 queue2 원소 제공
            sum2 -= combinedQueue[j]; // sum2에서 제공한 원소 제거
            j++; // 다음 원소로 이동
        } else { // sum1이 전체값의 반보다 크면
            sum1 -= combinedQueue[i]; // sum1에서 제공한 원소 제거
            sum2 += combinedQueue[i]; // sum2에 queue1 원소 제공
            i++; // 다음 원소로 이동
        }
        operation++; // 이동 횟수 1 증가
    }
    return -1; // 그래도 합 같게 못하면 -1 반환
}

// 실행
let queue1 = [3, 2, 7, 2];
let queue2 = [4, 6, 5, 1];
console.log(minOperation(queue1, queue2)); // 2 (이동횟수: 2)