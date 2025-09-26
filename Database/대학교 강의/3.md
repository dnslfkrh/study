## SQL

비절차적 언어로, 데이터를 조회하거나 조작하는 등에 필요한 조건을 기술하지만, 실행 절차를 직접 명시하지 않는다.

### 데이터 정의어 (Data Definition Language, DDL)

-   CREATE
-   ALTER
-   DROP

### 데이터 조작어 (Data Manipulation Language, DML)

-   SELECT
-   INSERT
-   DELETE

### 데이터 제어어 (Data Control Languge, DCL)

-   GRANT
-   REVOKE

## WHERE 조건

-   비교: 비교 연산자
-   범위: BETWEEN
-   집합: IN, NOT IN
-   패턴: LIKE
-   NULL: IS NULL, IS NOT NULL
-   복합 조건: AND, OR, NOT

## ORDER BY

정렬할 수 있다.

-   DESC: 내림차순으로 정렬
-   ASC: 오름차순으로 정렬 (생략 시 기본 적용)

## 집계 함수

-   SUM: 합계
-   AVG: 평균
-   COUNT: 개수
-   MAX: 최대 반환
-   MIN: 최소 반환

## CREATE문

테이블을 구성할 때 사용되며, 속성과 속성에 대한 제약조건을 정의한다.

## ALTER문

생성된 테이블의 속성과 속성의 제약 조건을 변경, 키 설정 또한 변경할 수 있다.

## DROP문

테이블을 삭제할 수 있다, 데이터만 삭제하려면 DELETE문을 사용할 수 있다.

## INSERT문

테이블에 새로운 튜플을 삽입할 수 있다.

## UPDATE문

특정 속성값을 수정할 수 있다.

## DELETE문

테이블에 있는 기존 튜플을 삭제할 수 있다.

## SQL 예시

- 모든 도서를 검색  
```sql
SELECT * FROM book;
```

- 모든 도서의 이름과 가격을 검색
```sql
SELECT bookname, price FROM book;
```

- 가격이 2만원 미만인 도서를 검색
```sql
SELECT * FROM book WHERE price < 20000;
```

- 출판사가 A 혹은 B인 도서를 검색
```sql
SELECT * FROM book WHERE publisher IN ('A', 'B');
```

- 출판사가 A 혹은 B가 아닌 도서를 검색  
```sql
SELECT * FROM book WHERE publisher NOT IN ('A', 'B');
```

- 2번 고객이 구문한 도서의 총판매액을 검색  
```sql
SELECT SUM(salePrice) AS 총매출 FROM orders WHERE custid=2;
```

- 총 판매 건수를 검색  
```sql
SELECT COUNT(*) FROM orders;
```

- 가격이 8천원 이상인 도서를 구매한 고객에 대해 고객별 주문 수량을 검색 (단, 2권 이상 구매한 고객에 대해서만)  
```sql
SELECT custid, COUNT(_) AS 도서수량 FROM orders WHERE saleprice >= 8000 GROUP BY custid HAVING COUNT(_) >= 2;
```

- 신규 도서 테이블 생성  
```sql
CREATE TABLE NewBook (bookId INTEGER PRIMARY KEY, book name VARCHAR(20), PRICE INTEGER);
```

- NewBook 테이블의 isbn 속성 삭제  
```sql
ALTER TABLE NewBook DROP COLUMN isbn;
```

- NewBook 테이블 삭제  
```sql
DROP TABLE NewBook;
```

- 새로운 책 정보 삽입  
```sql
INSERT INTO Book VALUES (12, '스포츠 의학', '출판사', '9000'); (순서대로 id, 제목, 출판사, 가격)
```

- 5번 고객의 주소를 부산으로 변경  
```sql
UPDATE Customer SET addres='대한민국 부산' WHERE custid=5;
```

- 11번 도서를 삭제  
```sql
DELETE FROM Book WHERE bookid=11;
```

- 모든 고객 정보를 삭제  
```sql
DELETE FROM Customer;
```
