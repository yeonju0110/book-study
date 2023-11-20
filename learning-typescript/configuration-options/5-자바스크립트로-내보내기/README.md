# 🎁 자바스크립트로 내보내기

- 바벨 같은 전용 컴파일러 도구의 등장으로 일부 프로젝트에서는 타입스크립트의 역할이 타입 검사만으로 축소됨
- 여전히 타입스크립트에 의존하고 있는 프로젝트도 많긴함

## 1. outDir

- 기본적으로 타입스크립트는 출력 파일을 해당 소스 파일과 동일한 위치에 생성함

- EX:

```
fruits/
    apple.js
    apple.ts
```

- 경우에 따라 출력 파일을 다른 폴더에 생성하는 것이 더 나을 수 있음
- `outDir` 컴파일러 옵션을 사용하면 출력 파일의 루트 디렉터리를 다르게 지정할 수 있음

#### `tsc --outDir dist`를 실행

- `dist/` 폴더 내에 출력 파일을 생성함

```
dist/
    fruits/
        apple.js
fruits/
    apple.ts
```

## 2. target

- 어느 버전까지 변환해야 하는지를 지정하는 'target' 컴파일러 옵션을 제공함

- target을 지정하지 않으면, 이전 버전과의 호환성을 위해 기본적으로 "es3"이 지정됨

  - 타입스크립트는 ES3(1999년경)과 같은 오래된 환경에서 실행할 수 있는 자바스크립트 출력 파일을 생성할 수 있음
  - 오래된 환경에서 최신 자바스크립트 기능을 지원하려면 더 많은 자바스크립트 코드를 생성해야 하므로, 파일 크기가 조금 더 커지고 런타임 성능이 조금 저하

- `tsc --init`은 "es2016"을 지정하도록 설정되어 있음
  - but, 현재 적어도 "es2019" 이상으로 지정하지 않을 이유가 없음
    - 대부분의 환경은 자바스크립트의 최신 구문 기능을 지원함

## 3. 내보내기 선언

```json
{
  "compilerOptions": {
    "declaration": true
  }
}
```

- 대부분의 패키지는 타입스크립트의 `declaration` 컴파일러 옵션을 사용해 소스 파일에서 `.d.ts` 출력 파일을 내보냄
- `.d.ts` 출력 파일은 `outDir` 옵션에 따라 `.js` 파일과 동일한 출력 규칙에 따라 내보내짐

- EX: `tsc -declaration`을 실행 -> 출력 `.js` 파일 + `fruits/apple.d.ts`이 생성

```
fruits/
    apple.d.ts // ✨ 생성
    apple.js // ✨ 생성
    apple.ts
```

#### emitDeclarationOnly

```json
{
  "compilerOptions": {
    "emitDeclarationOnly": true
  }
}
```

- 타입스크립트가 `.js`와 `.jsx` 파일 없이 선언 파일만 내보내도록 지시
- 이 옵션이 활성화된 경우 -> `declaration` 또는 `composite` 컴파일러 옵션을 활성화해야 함

```
fruits/
    apple.d.ts
    apple.ts
```

## 4. 소스 맵

- 출력 파일의 내용이 원본 소스 파일과 어떻게 일치하는지에 대한 설명
- 출력 파일을 탐색할 때 디버거 같은 개발자 도구에서 원본 소스 코드를 표시하도록 설정함

#### sourceMap

- `.js` 또는 `.jsx` 출력 파일과 함께 `.js.map` 또는 `.jsx.map` 소스 맵을 출력할 수 있음
- 그렇지 않으면 소스 맵 파일에 해당 출력 자바스크립트 파일과 동일한 이름으로 동일한 디렉터리에 생성됨

```
fruits/
    apple.js
    apple.js.map
    apple.ts
```

#### declarationMap

- `.d.ts` 선언 파일에 대한 소스 맵을 생성할 수도 있음

```
fruits/
    apple.d.ts
    apple.d.ts.map
    apple.js
    apple.ts
```

## 5. noEmit

- 파일 생성을 모두 건너뛰도록 지시 -> ts가 오로지 타입 검사기로만 작동함
- 다른 도구를 이용해 소스 파일을 컴파일하고, 자바스크립트를 출력하는 프로젝트에서 사용
