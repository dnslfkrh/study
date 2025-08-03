## SELECT 문

테이블에서 데이터를 추출하는 기능 (읽기)

사용 예시

```sql
SELECT * FROM members;

SELECT * FROM members WHERE member_name = '이';

SELECT member_name FROM members;
```

## USE 문

사용할 데이터베이스를 지정하는 기능, 원하는 테이블의 데이터를 추출하기 위해서는 해당 테이블이 포함된 데이터베이스를 지정해야 됨

```sql
USE <DATABASE_NAME>
```

사용 예시

```sql
USE market_db;

SELECT * FROM members;
```

## 조건

```sql
SELECT mem_name, height, age FROM member
  WHERE height >= 160 OR age > 20;
```

```sql
SELECT mem_name, height FROM member
  WHERE height >= 160 AND height <= 165;

SELECT mem_name, height FROM member
  WHERE height BETWEEN 160 AND 165;
```

```sql
SELECT mem_name, addr FROM member
  WHERE addr = '경기' OR addr = '경남';

SELECT mem_name, addr FROM member
  WHERE addr IN('경기', '경남');
```

'우'로 시작하는 모든 멤버 이름을 조회하는 sql

```sql
SELECT * FROM member
  WHERE mem_name LIKE '우%';
```

총 4글자, 앞에 2글자 이후 '핑크'로 끝나는 멤버 이름을 조회하는 sql

```sql
SELECT * FROM member
  WHERE mem_name LIKE '__핑크';
```

