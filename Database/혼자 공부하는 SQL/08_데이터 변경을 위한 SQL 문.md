## 데이터 입력: INSERT

```sql
CREATE TABLE hongong1 (
    toy_id INT,
    toy_name CHAR(4),
    age INT
);

-- 전부다 한번에
INSERT INTO hongong1 VALUES (1, '우디', 25);

-- 원하는 컬럼에
INSERT INTO hongong1(toy_id, toy_name) VALUES (2, '버즈'); 
```

```sql
CREATE TABLE hongong2 (
    -- 자동 증가, PK 지정 필수
    toy_id INT AUTO_INCREMENT PRIMARY_KEY, 
    toy_name CHAR(4),
    age INT
);

-- 전부다 한번에, id는 자동 증가로 NULL 입력
INSERT INTO hongong2 VALUES (NULL, '우디', 25);

-- 원하는 컬럼에, id는 자동 증가로 NULL 입력
INSERT INTO hongong2(toy_id, toy_name) VALUES (NULL, '버즈'); 
```

```sql
-- AUTO_INCREMENT로 아이디가 얼마나 들어갔는지
SELECT LAST_INSERT_ID();
```

```sql
-- id를 1000부터 3단위로 증가, 이후 들어가는 id는 1000, 1003, 1006 ...
ALTER TABLE hongong2 AUTO_INCREMENT=1000;
SET @@auto_increment_increment=3;
```

```sql
-- world 데이터베이스의 city 테이블의 행 수 조회,  USE 데이터베이스 없이 다른 데이터베이스 사용 가능
SELECT COUNT(*) FROM world.city;
```

```sql
-- world 데이터베이스의 city 테이블 구조 조회
DESC world.city;
```

```sql
-- 새로운 테이블을 만든 후, 다른 테이블에서 조회한 데이터를 INSERT
INSERT INTO city_popul
    SELECT Name, Population FROM world.city;
```

## 데이터 수정: UPDATE

```sql
UPDATE city_popul
    SET city_name = '서울'
    WHERE city_name = 'Seoul';
```

```sql
UPDATE city_popul
    SET city_name = '뉴욕', population = 0
    WHERE city_name = 'New York';
```

```sql
UPDATE city_popul
    SET population = population / 10000;
```

## 데이터 삭제: DELETE

```sql
DELETE FROM 테이블_이름 WHERE 조건;
```

```sql
DELETE FROM cuty_popul
    WHERE city_name LIKE 'New%';
    LIMIT 5;
```