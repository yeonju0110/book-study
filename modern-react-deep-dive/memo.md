## JSX가 변환되는 특성 활용

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

## 렌더링

- 리액트에서는 렌더링이 실행될 때마다 함수형 컴포넌트의 함수가 다시 실행됨
- 함수형 컴포넌트는 매번 함수를 실행해 렌더링을 수행함

## useState: 게으른 초기화

- useState에 변수 대신 함수를 넘기는 것
- state가 처음 만들어질 때만 사용됨. 이후에 리렌더링이 발생된다면 이 함수의 실행은 무시됨

```js
// 변수
const [count, setCount] = useState(
  Number.parseInt(window.localStorage.getItem(cacheKey))
);
// 함수 -> 게으른 초기화
const [count, setCount] = useState(() =>
  Number.parseInt(window.localStorage.getItem(cacheKey))
);
```

- ⭐️ 사용 권장되는 경우

  > useState의 초기값이 복잡하거나 무거운 연산을 포함하는 등 실행 비용이 많이 드는 경우

  - localStorage나 sessionStorage에 대한 접근
  - map, filter, find 같은 배열에 대한 접근
  - 초깃값 계산을 위해 함수 호출이 필요할 때
  - EX. `Number.parseInt(window.localStorage.getItem(cacheKey))`와 같이 한 번 실행되는 데 어느 정도 비용이 드는 값

## useEffect의 의존성 배열

- 빈 배열이 아닐 때
  - 특정 값을 사용하지만 해당 값의 변경 시점을 피할 목적이라면 메모이제이션을 적절히 활용해 해당 값의 변화를 막거나 적당한 실행 위치를 다시 한번 고민해보기 ⭐️
