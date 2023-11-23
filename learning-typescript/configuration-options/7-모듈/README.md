# 🎁 모듈

```ts
import { value } from "my-example-lib";

export const logValue = () => console.log(value);
```

## 1. module

- 어떤 모듈 시스템으로 변환된 코드를 사용할지 결정
- target 옵션이 'es3' or 'es5'인 경우 -> 기본값이 commonjs
  - 그렇지 않으면 'es2015'로 기본 설정됨

```json
{
  "compilerOptions": {
    "module": "commonjs" // CommonJS 모듈로 출력되도록 지시
  }
}
```

```ts
const my_example_lib = require("my-example-lib");
exports.logValue = () => console.log(my_example_lib.value);
```

## 2. moduleResolution

- import에서 가져온 경로가 module에 매핑되는 과정
- 두 가지 로직 전략 중 하나를 제공하는 것을 선호

  1. node: 기존 Node.js와 같은 CommonJS 리졸버에서 사용하는 동작
  2. nodenext: ECMA스크립트 모듈에 대해 지정된 동작에 맞게 조정

TODO 더 조사해보기,,

```json
{
  "compilerOptions": {
    "moduleResolution": "nodenext"
  }
}
```

## 3. CommonJS와의 상호 운용성

- js 모듈로 작업할 때 모듈의 기본 내보내기와 네임스페이스 출력 간에는 차이점이 있음
- 모듈의 기본 내보내기: 내보낸 객체의 `.default 속성`
- 모듈의 네임스페이스 내보내기: 내보낸 `객체 자체`

| 구문 영역             | CommonJS                                 | ECMA스크립트 모듈              |
| --------------------- | ---------------------------------------- | ------------------------------ |
| 기본 내보내기         | module.exports.default = value;          | export default value;          |
| 기본 가져오기         | const { default: value } = require("...) | import value from "...";       |
| 네임스페이스 내보내기 | module.exports = value;                  | 지원 안 함                     |
| 네임스페이스 가져오기 | const value = require("...)              | import \* as value from "..."; |

#### esModuleInterop

- ECMA스크립트 모듈이 기본 또는 네임스페이스 가져오기에 대한 ECMA스크립트 모듈의 규칙을 준수하지 않는 경우에도 모듈에서 가져올 수 있도록 함
- module이 "es2015" 또는 "esnext"와 같은 ECMA스크립트 모듈 형식이 아닌 경우 ts에서 내보낸 js 코드에 소량의 로직을 추가함
- esModuleInterop을 활성화하는 이유 중 하나: 기본 내보내기를 제공하지 않는 "react" 같은 패키지를 위해서임

#### allowSyntheticDefaultImports

- ECMA스크립트 모듈이 호환되지 않는 CommonJS 네임스페이스 내보내기 파일에서 기본 가져오기를 할 수 있음을 타입 시스템에 알림
- 다음 중 하나가 true인 경우에만 true로 기본적으로 설정됨

1. module이 "system"인 경우
2. esModuleInterop이 true이고 module이 "es2015" 또는 "esnext"와 같은 ECMA스크립트 모듈 형식이 아닌 경우

- 즉, esModuleInterop이 true이지만 module이 "esnext"인 경우 타입스크립트는 컴파일된 출력 자바스크립트 코드가 가져오기 상호 운용성 지원을 사용하지 않는다고 가정

## 4. isolatedModules

- 프로젝트에서 타입스크립트가 아닌 다른 도구를 사용해 자바스크립트로 변환하는 경우 활성화하는 것이 좋음 ✨

- 한 번에 하나의 파일에서만 작동하는 바벨과 같은 외부 트랜스파일러는 타입 시스템 정보를 사용해 자바스크립트를 내보낼 수 없음
- 결과적으로 타입 정보에 의존하며 js를 내보내는 ts 구문 기능은 바벨 같은 트랜스파일러에서는 지원되지 않음
