## QA란?

Quality Assurance의 약자로, 품질 보증으로 해석할 수 있다. 보다 완성도 있고 결함이 적은 결과물을 위해 진행하는 것을 뜻한다.

## QA의 필요성

1. 소프트웨어가 오작동 시 금전적, 시간적, 인명 등의 손실과 낭비가 발생할 수 있다.

2. 발생 가능한 문제점들을 최소화할 수 있다.

## 프로젝트 단계별 QA의 업무

1. 알파 테스트 전

- 일반 / 전문가 FGT

- 컨텐츠별 기능성 QA

2. 알파 테스트 후, 베타 테스트 전

- 기능성, 정성/정량 FUN, 네트워크, 시스템 기능성 QA

3. 베타 테스트 후, 오픈 베타 전

- 기능성, 호환성, 안정성, 정성 / 정량 FUN, 일반 / 전문가 FGT, 스토어 연동 QA

4. 오픈 베타 후, 라이브 전

- 기능성, 호환성, 안정성 QA, 결제 테스트

5. 라이브 이후

- 업데이트 기능, 이벤트, 점검 QA

## BTS (Bug Tracking System)

- mantis

- redmine

- jira (팀프로젝트에서 사용해 봤음)

- trello

## TC (Test Case)

테스트 항목 및 예상 결과를 정의한 문서로, 테스트 진행 시 사용된다.

## ISO/IEC 25010 품질 특성 모델

## 폭포수 수명주기 모델

1. 요구분석

2. 명세

3. 설계

4. 구현

5. 테스트

- 단계가 명확하여 에러를 초기에 발견할 수 있다.

- 명확한 작업을 제공할 수 있다.

- 빠른 개발이 필요하거나 변경이 잦은 경우 적합하지 않을 수 있다.

## 애자일 개발 모델

- 개발, 디자인, 테스트를 끊임없이 반복한다.

- 빠른 개발과 잦은 변경에 유리하다.

## SW개발 모델

V자 모델

1. 요구 분석 8. 인수 테스트

2. 명세 7. 시스템 테스트

3. 설계 6. 통합 테스트

4. 코딩 5. 단위테스트

### 단위 테스트

컴포넌트, 유닛, 모듈 테스트라고도 한다.

코드를 중심으로 수행하며, 개발자가 직접 테스트를 진행하기도 한다.

  
### 통합 테스트

컴포넌트 간의 인터페이스를 테스트한다.

- 백본: 중요한 부분부터 테스트 진행, 결함 초기 발견이 장점, 시간이 걸리는 게 단점

- 빅뱅: 모든 걸 한번에 진행, 빠른 소요 시간이 장점, 결함 격리가 어려운 게 단점

- 상향식: 아래에서부터 위로 테스트 진행, 드라이버 필요, 결함 격리 유리, 상부 구조에서 수정 불가

- 하향식: 위에서부터 아래로 테스트 진행, 스텁 필요, 결함 격리 유리, 하부 구조에서 수정 불가

### 시스템 테스트

제품의 동작에 대해 테스트를 수행한다.

- 기능성 요구사항: 기술문서 기반의 테스트 수행

- 비기능 요구사항: 성능, 가용성, 보안성 테스트

### 인수 테스트

실제 사용할 수 있는 준비가 되어 있는 지에 대해 평가한다.

- 알파 테스트: 개발 조직 내에서 고객이 수행한다.

- 베타 테스트: 실제 환경에서 사용자 및 잠재 고객에 의해 수행된다.

## 확인과 검증

1. 확인 (Validation)

- 요구사항에 맞는 제품을 만들고 있는가?

2. 검증 (Verification)

- 제품이 설계에 맞게 만들어지고 있는가?