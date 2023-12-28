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
