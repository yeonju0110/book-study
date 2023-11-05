/**
 * 11.2 런타임 값 선언
 */

/**
 * 초깃값, 본문 설정은 불가
 */
// types.d.ts
declare let declared: string; // Ok

// @ts-ignore
declare let initializer: string = "Wanda"; // ❌ Error 초깃값 비허용

// fairies.d.ts
declare function canGrantWish(wish: string): boolean; // Ok

// -> 왜 오류가 안뜨나 봤더니 `skipLibCheck`가 false여야 오류 잡아줌
// declare function grantWish(wish: string) {
//   //   ❌ Error: 본문 설정 불가
//   return true;
// };

/**
 * 인터페이스와 같은 타입 형태는 `.d.ts`선언 파일에서 `declare` 키워드 유무와는 관계없이 허용됨
 * 함수와 변수 같은 런타임 구문에 `declare` 키워드가 없다면 타입 오류가 발생
 */
interface Writer {} // Ok
declare interface Writer {} // Ok

declare const fullName: string; // Ok
declare const firstName: "Liz"; // Ok

// @ts-ignore
const lastName = "Lemon"; // ❌ Error
