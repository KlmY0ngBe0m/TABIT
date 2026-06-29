# TABIT

[日本語 README](./README.md)

## 프로젝트 소개

TABIT은 사용자의 예산, 여행 기간, 동행 유형, 여행 스타일, 관심사에 맞춰 일본 여행지와 간단한 여행 일정을 제안하는 AI 여행 추천 웹 서비스입니다.

처음에는 HTML/CSS/JavaScript로 프로토타입을 만들었고, 이후 Next.js와 TypeScript를 사용하는 웹 애플리케이션으로 전환했습니다. 현재는 Next.js API Route에서 OpenAI API를 호출해 사용자 입력 기반 여행 추천을 생성합니다.

## 대상 사용자

일본 여행을 계획하는 여행자를 대상으로 합니다.

특히 여행지를 직접 조사하는 시간을 줄이고, 예산과 관심사에 맞는 후보를 빠르게 확인하고 싶은 사용자를 대상으로 합니다.

## 주요 기능

- 예산, 여행 기간, 동행 유형, 여행 스타일, 관심사 입력
- 예산과 관심사 입력 검증
- 한국어 / 일본어 UI 전환
- OpenAI API를 통한 여행 추천 생성
- API 요청 중 로딩 표시
- API 실패 시 fallback 추천
- 추천 여행지, 추천 이유, 예상 예산, 간단 일정 표시

## 사용 기술

- Next.js
- React
- TypeScript
- OpenAI API
- HTML / CSS
- Git / GitHub

## 개발 방향

이 프로젝트에서는 단순히 AI API를 호출하는 것에 그치지 않고, 사용자 입력, 프론트엔드 상태 관리, 서버 API 처리, fallback 처리, 다국어 UI를 하나의 서비스로 구현하는 것을 목표로 했습니다.

여행업계, 관광 DX, 웹 개발, 시스템 엔지니어 직무 지원을 고려한 포트폴리오 프로젝트입니다.

## 현재 프로토타입

첫 번째 버전은 `practice` 폴더에서 HTML, CSS, JavaScript만 사용해 만들었습니다.

이후 유지보수성과 확장성을 높이기 위해 Next.js와 TypeScript로 전환했습니다. 현재 메인 구현은 `frontend` 폴더에 있습니다.

## 구현 완료 기능

- HTML/CSS/JavaScript 기반 초기 프로토타입
- Next.js / TypeScript로 전환
- 여행 조건 입력 폼
- React state를 통한 입력값 관리
- 컴포넌트 분리
  - TravelForm
  - InterestSelector
  - RecommendationCard
- 한국어 / 일본어 표시 전환
- Next.js API Route 생성
- OpenAI API 연동
- API 키 환경 변수 관리
- API 실패 시 fallback 추천
- 로딩 표시
- 에러 처리

## 현재 처리 흐름

```text
사용자 입력
-> React state 관리
-> Next.js API Route
-> OpenAI API 요청
-> AI 여행 추천 생성
-> 결과 카드 표시
```

OpenAI API 키가 설정되어 있지 않거나 API 요청에 실패한 경우, 선택한 관심사를 기준으로 fallback 추천을 반환합니다.

## 환경 변수

`frontend/.env.local` 파일을 만들고 OpenAI API 키를 설정합니다.

```env
OPENAI_API_KEY=your_api_key_here
```

`.env.local`은 GitHub에 커밋하면 안 됩니다.

## 실행 방법

```bash
cd frontend
npm install
npm run dev
```

브라우저에서 아래 주소로 접속합니다.

```text
http://localhost:3000
```

## 테스트 항목

- 예산이 입력되지 않은 경우 에러 메시지가 표시되는지
- 최소 예산 미만인 경우 에러 메시지가 표시되는지
- 관심사가 선택되지 않은 경우 에러 메시지가 표시되는지
- 추천 생성 중 로딩 표시가 나오는지
- OpenAI API가 성공한 경우 AI 추천 결과가 표시되는지
- OpenAI API가 실패한 경우 fallback 추천이 표시되는지
- 한국어 / 일본어 UI 전환이 가능한지

## 현재 상태

OpenAI API를 이용한 AI 여행 추천 기능까지 구현했습니다.

현재는 로컬 환경에서 동작 확인을 진행했으며, 다음 단계에서는 README 정리, UI 개선, 배포를 진행할 예정입니다.

## 앞으로의 계획

- 서비스 배포
- UI 디자인 개선
- AI 응답 형식 검증 강화
- 추천 기록 저장 기능
- 여행 일정 PDF 출력
- 프로젝트 설명용 문서 작성