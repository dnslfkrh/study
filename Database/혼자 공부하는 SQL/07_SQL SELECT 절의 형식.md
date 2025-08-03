## ORDER BY

결과의 값이나 개수에 대해서는 영향을 미치지 않지만, 결과가 출력되는 순서를 조절 (정렬)

## 오름차순

ORDER BY 기본이 오름차순이기 때문에 `ASC` 또는 `생략` 가능

```sql
SELECT * FROM member ORDER BY date;
```

```sql
SELECT * FROM member ORDER BY date ASC;
```

## 내림차순

`DESC`으로 내림차순 정렬 출력

```sql
SELECT * FROM member ORDER BY date DESC;
```

## ORDER BY 예제

`member` 테이블의 데이터를 데뷔 날짜로 정렬하여 출력
```sql
SELECT * FROM member ORDER BY debut_date;
```

`height` 내림차순으로 우선 정렬, `height`가 같은 데이터는 `debut_date` 오름차순으로 정렬

```sql
SELECT * FROM member ORDER BY height DECSk, debut_date ASC;
```

## LIMIT (n)

값만큼만 데이터 표시

`member` 테이블에서 데이터 3개만 출력하는 sql

```sql
SELECT * FROM member LIMIT 3;
```

데뷔 날짜가 가장 오래된 데이터 3개만 출력

```sql
SELECT * FROM member ORDER BY debut_date LIMIT 3;
```

## LIMIT (n, m)

앞에서 n개 건너뛰고, 그 다음부터 m개 출력

`member` 테이블에서 `debut_date` 기준으로 정렬 후,
가장 앞에서 3개를 건너뛰고 2개를 가지고 오는 sql (4번째, 5번째로 데뷔가 오래된 데이터 조회)

```sql
SELECT * FROM member ORDER BY debut_date LIMIT 3, 2;
```

## DISTINCT

중복된 컬럼 제거하려 출력

중복 제거 없이 모든 지역을 출력할 때 예시

```sql
SELECT addr FROM member;
```

`addr`
```
경기
서울
경기
전남
경북
서울
```

중복 제거 후 출력 예시

```sql
SELECT DISTINCT addr FROM member;
```
`addr`
```
경기
서울
전남
경북
```

## GROUP BY

그룹으로 묶어주는 역할

## SQL 순서

```sql
SELECT 열_이름(*)
    FROM 테이블_이름
        WHERE 조건식
            GROUP BY 열_이름
                HAVING 조건식
                    ORDER BY 열_이름
                        LIMIT 숫자
```

그룹 안 묶었을 때 예시

```sql
SELECT addr FROM member;
```

`addr`
```
경기
서울
경기
전남
경북
서울
```

그룹 묶을 때 예시

```sql
SELECT addr FROM member GROUP BY addr;
```

`addr`
```
경기
서울
전남
경북
```

## GROUP BY와 DISTINCT의 차이

`GROUP BY`는 집계 함수와 같이 쓰일 수 있지만, `DISTINCT`는 불가능하다.

가능한 `GROUP BY` 사용 예:

```sql
SELECT addr, COUNT(*) FROM member GROUP BY addr;
```

불가능한 `DISTINCT` 사용 예:

```sql
-- 문법 오류!
SELECT DISTINCT addr, COUNT(*) FROM member;
```

## 집계 함수

`SUM()` - 합계를 구함

`AVG()` - 평균을 구함

`MIN()` - 최소값을 구함

`MAX()` - 최대값을 구함

`COUNT()` - 행 개수를 구함

`COUNT(DISTINCT)` - 행 개수를 구함 (중복 제거)

## 행 출력 결과 바꾸기

```sql
SELECT mem_id FROM member;
```

출력: mem_id ..

```sql
SELECT mem_id "회원 아이디" FROM member;
```

출력: 회원 아이디 ..