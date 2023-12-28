# JSX

## 🎀 JSX의 정의

- 자바스크립트에 내부에서 표현하기 까다로웠던 XML 스타일의 트리 구문을 작성하는 데 많은 도움을 주는 새로운 문법이라고 볼 수 있음
- XML과 유사한 내장형 구문
- 리액트에 종속적이지 않은 독자적인 문법
- ECMAScript라고 불리는 자바스크립트 표준의 일부는 아님

## 🎀 JSX의 특징

- 반드시 트랜스파일러를 거쳐야 비로소 자바스크립트 런타임이 이해할 수 있는 의미 있는 자바스크립트 코드로 변환됨
- HTML이나 XML을 자바스크립트 내부에 표현하는 것이 유일한 목적은 아님
- HTML, XML 외에도 다른 구문으로도 확장될 수 있게끔 고려돼 있으며 최대한 구문을 간결하고 친숙하게 작성할 수 있도록 설계돼 있음
- JSX의 설계 목적은 다양한 트랜스파일러에서 다양한 속성을 가진 트리 구조를 토큰화해 ECMAScript로 변환하는 데 초점을 두고 있음
- XML과 비슷하게 보이는 것은 단순히 자바스크립트 개발자로 하여금 친숙함을 느낄 수 있도록 하는 것

## 🎀 JSX 구성

- 기본적으로 JSXElement, JSXAttributes, JSXChildren, JSXStrings라는 4가지 컴포넌트를 기반으로 구성되어 있음

### 1. JSXElement

- JSX를 구성하는 가장 기본 요소
- HTML의 요소(element)와 비슷한 역할을 함
- 다음과 같은 형태 중 하나여야 함
  1. JSXOpeningElement
     - `<JSXElement JSXAttributes(optional)>`
  2. JSXClosingElement
     - JSXOpeningElement가 종료됐음을 알리는 요소
     - 반드시 JSXOpeningElement와 쌍으로 사용돼야 함
     - `</JSXElement>`
  3. JSXSelfClosingElement
     - 요소가 시작되고, 스스로 종료되는 형태를 의미 (내부적으로 자식을 포함할 수 없는 형태를 의미)
     - `<script />`와 동일한 모습을 띠고 있음
     - `<JSXElement JSXAttributes(optional) />`
  4. JSXFragment
     - 아무런 요소가 없는 형태
     - `<>JSXChildren(optional)</>`

#### 👀 리액트에서 컴포넌트를 만들어 사용할 때, 대문자로 시작해야하는 이유

- 리액트에서 HTML 태그명과 사용자가 만든 컴포넌트 태그명을 구분 짓기 위해서
- 미래에 추가되는 HTML에 대한 가능성을 열어두고 확실하게 구별할 수 있는 차이점을 두기 위한 것으로 보임
- JSXElement에 명시돼 있는 표준에는 없는 내용

#### JSXElementName

- JSXElement의 요소 이름으로 쓸 수 있는 것
- 이름으로 가능한 것
  1. JSXIdentifier
     - JSX 내부에서 사용할 수 있는 식별자를 의미
     - 가능: `<$></$>` `<_></_>`
     - 불가능: 숫자로 시작하거나 `$`, `_` 외의 다른 특수문자로 시작하는 것
  2. JSXNamespacedName
     - `JSXIdentifier:JSXIdentifier`
     - `:`을 통해 서로 다른 식별자를 이어주는 것도 하나의 식별자로 취급됨
     - 한 번만 묶을 수 있음
       - `<foo:bar:baz></foo:bar:baz>` 불가능
  3. JSXMemberExpression
     - `JSXIdentifier.JSXIdentifier`
     - `.`을 통해 서로 다른 식별자를 이어주는 것도 하나의 식별자로 취급됨
     - 여러번 묶을 수 있음
       - `<foo.bar.baz></foo.bar.baz>` 가능
       - `<foo:bar.baz></foo:bar.baz>` 불가능

### 2. JSXAttributes

- JSXElement에 부여할 수 있는 속성
- 필수값이 아님

1. JSXSpreadAttributes
   - `{...AssignmentExpression}`
   - 단순히 객체뿐만 아니라 자바스크립트에서 AssignmentExpression으로 취급되는 모든 표현식이 존재할 수 있음
   - EX. 조건문 표현식, 화살표 함수, 할당식 등
2. JSXAttribute
   - 속성을 나타내는 키와 값으로 짝을 이루어서 표현함
   1. 키: JSXAttributeName
      - `JSXIdentifier`와 `JSXNamespacedName`이 가능
        ```jsx
        function valid1() {
          return <foo.bar foo:bar="baz"></foo.bar>;
        }
        ```
   2. 값: JSXAttributeValue
      - 속성의 키에 할당할 수 있는 값
      - 다음 중 하나를 만족해야 함
        1. "큰따옴표로 구성된 문자열"
        2. '작은따옴표로 구성된 문자열'
        3. { AssignmentExpression }
        4. JSXElement
        5. JSXFragment
      - 예시
        ```jsx
        export default function App() {
          return <Child attribute=<div>hello</div> />;
        }
        ```

### 3. JSXChildren

- JSXElement의 자식 값
- JSXChild를 0개 이상 가질 수 있음

- JSXChild: JSXChildren을 이루는 기본 단위

  1.  JSXText: `{, <, >, }`을 제외한 문자열 (\*다른 JSX 문법과 혼동을 줄 수 있기 때문)
      - 사용하고 싶으면 문자열로 표시하는 방법이 있음
        - `<>{'{} <>'}</>`
  2.  JSXElement
  3.  JSXFragment
  4.  { JSXChildExpression (optional) }

      ```jsx
      export default function App() {
        return <>{(() => "foo")()}</>; // foo라는 문자열이 출력됨
      }
      ```

### 4. JSXStrings

- JSXAttributeValue와 JSXText는 HTML과 JSX 사이에 복사와 붙여넣기를 쉽게 할 수 있도록 설계돼 있음
- HTML에서 사용 가능한 문자열은 모두 JSXStrings에서도 가능
- 개발자가 HTML의 내용을 손쉽게 JSX로 가져올 수 있도록 의도적으로 설계된 부분
- 정의된 문자열: "큰따옴표로 구성된 문자열", '작은따옴표로 구성된 문자열', JSText
- 현재 JSX는 HTML처럼 \을 이스케이프 문자열로 처리하고 있지 않음

## 🎀 JSX 예제

#### 📍 유효한 형태의 JSX

```jsx
const ComponentA = <A>안녕하세요.</A>;

const ComponentB = <A />;

const ComponentC = <A {...{ required: true }} />;

const ComponentD = <A required />;

const ComponentE = <A required={false} />;

const ComponentF = (
  <A>
    <B text="리액트" />
  </A>
);

const ComponentH = (
  <A>
    <B text="리액트" />
  </A>
);
```

#### 📍 리액트 내에서는 유효하지 않거나 사용되는 경우가 거의 없는 JSX 문법

```jsx
function ComponentA() {
  return <A.B></A.B>;
}

function ComponentB() {
  return <A.B.C></A.B.C>;
}

function ComponentC() {
  return <A:B.C></A:B.C>;
}

function ComponentC() {
  return <$></$>;
}

function ComponentE() {
  return <_></_>;
}
```

## 🎀 JSX는 어떻게 자바스크립트에서 변환될까?

### `@babel/plugin-transform-react-jsx` 플러그인

- 리액트에서 JSX 구문을 자바스크립트가 이해할 수 있는 형태로 변환해줌

#### JSX 코드

```jsx
const ComponentA = <A required={true}>Hello World</A>;

const ComponentB = <>Hello World</>;

const ComponentC = (
  <div>
    <span>hello world</span>
  </div>
);
```

#### 변환된 JSX 코드

```jsx
"use strict";

var ComponentA = React.createElement(A, {
  required: true,
  'Hello World',
});
var ComponentB = React.createElement(React.Fragment, null, 'Hello World')
var ComponentC = React.createElement('div', null, React.createElement('span', null, 'hello world'))
```

#### 리액트, 바벨 7.9.0 이후 버전에서 추가된 자동 런타임으로 트랜스파일한 결과

```jsx
"use strict";

var _jsxRuntime = require("custom-jsx-library/jsx-runtime");

var ComponentA = (0, _jsxRuntime.jsx)(A, {
  required: true,
  children: "Hello World",
});
var ComponentB = (0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
  children: "Hello World",
});
var ComponentC = (0, _jsxRuntime.jsx)('div', {
    children: (0, _jsxRuntime.jsx)('span', {
        children: 'hello world;,
    })
});
```

#### JSX가 변환되는 특성을 활용

JSX 반환값이 결국 React.createElement로 귀결된다는 사실을 파악한다면 이런 식으로 쉽게 리팩터링할 수 있음

```jsx
// ❌ 불필요한 코드 중복이 일어남
import { createElement, PropsWithChildren } from "react";

function TextOrHeading({
  isHeading,
  children,
}: PropsWithChildren<{ isHeading: boolean }>) {
  return isHeading ? (
    <h1 className="text">{children}</h1>
  ) : (
    <span className="text">{children}</span>
  );
}
```

```jsx
// ✅ 간결!
import { createElement } from "react";

function TextOrHeading({
  isHeading,
  children,
}: PropsWithChildren<{ isHeading: boolean }>) {
  return createElement(isHeading ? "h1" : "span", {
    className: "text",
    children,
  });
}
```
