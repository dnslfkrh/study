# 배열 (Array)
- 동일한 자료형의 데이터틀이 같은 크기로 나열되어 순서를 가지는 집합
- 정적인 자료 구조로 기억장소의 추가가 어려움
- 데이터 삭제 시 데이터가 저장되어 있던 기억장소는 빈 공간으로 남아 메모리 낭비 발생
- 첨자(지수 표시하는 방법)를 이용한 데이터 접근
- 반복적인 데이터 처리에 적합
- 데이터마다 동일한 이름의 변수 사용으로 처리 간편
- 첨자 개수에 따라 n차원 배열이라고 함

```c
int arr[5] = { 10, 20, 30, 40, 50 }
// int: 모든 요소가 동일한 자료형
// arr[5]: 각 요소의 크기가 동일 (int = 4byte)
// { 10, 20, 30, 40, 50}: 순서를 가지며 저장
// 배열의 크기는 컴파일 시점에서 고정되어 변경되지 않음: 정적 자료 구조


int arr[5] = {10, 20, 30, 40, 50};
int size = 5;

// index 2의 값(30) 삭제
for (int i = 2; i < size - 1; i++) {
    arr[i] = arr[i + 1];
}
size--;
// 논리적으로는 삭제되어도, 빈 공간이 그대로 남아 있음


printf("%d\n", arr[2]); // 30
// 내부 동작
*(arr + 2)
// arr: 시작 주소
// 첨자 2: offset(거리, 상쇄하다)


for (int i = 0; i < 5; i++) {
    printf("%d ", arr[i]);
}
// 반복적인 데이터 처리에 적합
// 일괄 처리, 통계, 합계에 적합


// 배열이 없다면
int a1 = 10, a2 = 20, a3 = 30, a4 = 40, a5 = 50;
// 배열 사용
int arr[5] = {10, 20, 30, 40, 50};


// 첨자 개수에 따른 n차원 배열
int matrix[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};
// 2차원 배열로, 실제 구조는 1 2 3 4 5 6

matrix[1][2]; // 6
// 0부터 1까지 -> [1]
// 0부터 2까지 -> [2]
// matrix[1][2] -> 두번째 묶음에서 세번째
// 첫번째 묶음: {1, 2, 3}
// 두번째 묶음: {4, 5, 6}
```

# 선형 리스트 (Linear List)
- 일정한 순서에 의해 나열된 자료 구조
- 배열을 이용하는 `연속 리스트`와 포인터를 이용하는 `연결 리스트`

## 연속 리스트 (Contiguous List)
- 배열처럼 연속되는 기억장소에 저장
- 기억장소를 연속적으로 배정받아 이용 효율은 밀도가 1로 가장 좋음
- 리스트 중간에 데이터를 저장하기 위해서는 빈공간을 만들어줘야 함
- 중간에 있는 데이터가 삭제되면 자료 이동이 필요함 (빈공간 없애기)

```c
#define MAX 10

typedef struct {
    int data[MAX];
    int length;
} ArrayList;
// data: 실제 데이터 저장
// length: 현재 데이터 개수


void insert(ArrayList *list, int value) {
    list->data[list->length] = value;
    list->length++;
}
// 데이터 삽입
// [10][20][30][ ][ ][ ][ ][ ][ ][ ]


void delete(ArrayList *list, int index) {
    for (int i = index; i < list->length - 1; i++) {
        list->data[i] = list->data[i + 1];
    }
    list->length--;
}
// 중간 삭제
// [10][20][30][40][50] 30이 삭제되면
// [10][20][40][50][] 전부 왼쪽으로 이동
```

## 연결 리스트
- 연속적인 배열이 아닌 임의의 기억공간에 저장
- 순서에 따라 노드의 포인터 부분을 이용해 서로 연결
- 노드의 삽입, 삭제에 용이
- 연결을 위한 포인터를 찾기 위해 시간이 걸림

```c
typedef struct Node {
    int data;
    struct Node *next;
} Node;
// [10|*] → [20|*] → [30|null]


// 연결 리스트 삽입 (맨 앞에)
void insertFront(Node **head, int value) {           // 머리 노드(head) 변경을 위해 Node **으로 head 주소 받음
    Node *newNode = (Node *)malloc(sizeof(Node));    // malloc: 동적 메모리 할당 함수, newNode는 시작 주소
    newNode->data = value;                           // 새 노드의 데이터 영역에 값 저장
    newNode->next = *head;                           // 새 노드가 기존 노드 가리키도록 연결
    *head = newNode;                                 // 새 노드가 리스트의 첫 노드가 됨
}
// 메모리 이동 없음
// 포인터만 변경


void deleteFront(Node **head) {
    Node *temp = *head;
    *head = temp->next;
    free(temp);
}
// 중간 노드도 연결만 바꾸면 됨


void printList(Node *head) {
    while (head != NULL) {
        printf("%d -> ", head->data);
        head = head->next;
    }
    printf("NULL\n");
}
// 순차 접근만 가능
// O(n)
```
