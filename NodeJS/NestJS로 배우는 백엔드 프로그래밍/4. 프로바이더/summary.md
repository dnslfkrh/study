## 프로바이더

애플리케이션의 핵심 기능을 처리하는 것, 또는 비즈니스 로직을 처리하는 것을 프로바이더라고 할 수 있다.

## 컨트롤러

클라이언트의 요청과 응답을 가공하고 처리하는 것이 컨트롤러이다.

### 프로바이더의 존재 이유

응답과 함께 비즈니스 로직을 처리할 수도 있다. 하지만 컨트롤러에서 비즈니스 로직을 처리하는 것은 단일 책임 원칙에 어긋나며, 코드의 역할과 가독성이 애매해지거나 떨어질 수 있다. 그렇기 때문에 핵심 기능을 분리된 프로바이더에서 처리하여 각 코드의 역할을 분명하게 하며, 유지 보수와 재사용이 쉽도록 애플리케이션을 개발할 수 있다.

## NestJS에서의 프로바이더

### 서비스 (Service)

핵심 비즈니스 로직을 처리, 관리하는 프로바이더이다.

### 저장소 (Repository)

데이터베이스와의 상호작용을 담당하는 프로바이더이다.

### 팩토리 (Factory)

특정 상황에 따라 객체를 동적으로 생성하는 역할을 한다.

### 헬퍼 (Helper)

재사용이 쉬운 작은 함수나 유틸리티 기능을 한다.

#### 일반적인 상황에선

보통 서비스와 저장소까지는 많이 사용하는 것으로 알고 있었다. 간단한 경우에는 서비스에서 모든 비즈니스 로직을 처리하는 경우도 있었다. 이 책에서 소개해준 4가지 프로바이더를 적용해 봐야겠다.

## 예시

### 상황

4가지 프로바이더를 사용해서 회원가입을 구현한다고 가정한다.

### 서비스

비즈니스 로직을 처리한다.

```typescript
async findVerificationCode(dto: VerifyPhoneNumberDto, res: Response) {
    const { phone_number, code } = dto;
    
    await this.verificationCodeRepository.findVerificationCode(phone_number, code);
    await this.verificationCodeRepository.deleteOnesVerificationCode(phone_number);

    const registerJwtToken = this.jwtFactory.generateJwtToken({ phone_number }, '5m', JWT_SECRET);
    this.jwtHelper.resCookie(res, 'register_jwt_token', registerJwtToken, 300000);

    return { token: registerJwtToken };
}
```

### 저장소

데이터베이스와 상호작용한다.

```typescript
async findVerificationCode(phone_number: string, code: string) {
    return await this.verificationCodeRepository.findOne({
        where: { phone_number, code }
    });
}

async deleteOnesVerificationCode(phone_number: string) {
    return await this.verificationCodeRepository.delete({ phone_number });
}
```

### 팩터리

객체를 생성한다.

```typescript
@Injectable()
export class JwtFactory {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    generateJwtToken(payload: any, expiresIn: string, secret: string) {
        return this.jwtService.sign(payload, { expiresIn });
    }
}
```

### 헬퍼

기타 기능을 처리한다.

```typescript
@Injectable()
export class JwtHelper {
    resCookie(res: Response, option: string, token: string, expiresIn: number) {
        res.cookie(option, token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: expiresIn
        });
    }
}
```

### 솔직히 위 코드들이 프로바이더의 적절한 예시가 될 수 있는지는 잘 모르겠다..
다만 위처럼 팩터리와 헬퍼를 만들면 유틸리티로 만드는 것보다 확실히 구조가 쉽게 느껴지는 것 같다.

## 요약

사실 팩터리와 헬퍼는 유틸리티로 묶는 것이 효율적일 수도 있다고 생각했다. 지금까지 알고 있던 유틸리티와 크게 다르지 않았기 때문이다. 하지만 유틸리티로 묶는 것보다 이렇게 팩터리, 헬퍼로 묶는 것이 각 함수의 역할을 설명하기에는 더 적합한 것 같다. 유틸리티 폴더 안에 두 기능이 존재하는 것보다 팩토리, 헬퍼로 각각 묶는 것이 구체적인 기능 설명은 부족할 수 있어도 역할을 어느정도 설명해줄 수 있을 것 같다.