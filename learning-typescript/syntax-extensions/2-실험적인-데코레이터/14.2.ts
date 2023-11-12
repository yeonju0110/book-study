/**
 * 🎁 14.2 실험적인 데코레이터
 *
 * 🚨 ECMA스크립트 버전이 데코레이터 구문으로 승인될 때까지 가능하면 데코레이터를 사용하지 않는 것이 좋음
 * 🚨 tsconfig - "experimentalDecorators: true" 로 해야 활성화됨
 *
 * 데코레이터의 각 사용법은 데코레이팅하는 엔티티가 생성되자마자 한 번 실행됨
 */

{
  function logOnCall(target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    console.log("[logOnCall] I am decorating", target.constructor.name);

    descriptor.value = function (...args: unknown[]) {
      console.log(`[descriptor.value] Calling '${key}' with:`, ...args);
      return original.call(this, ...args);
    };
  }

  class Greeter {
    @logOnCall
    greet(message: string) {
      console.log(`[greet] Hello, ${message}!`);
    }
  }

  new Greeter().greet("you");

  // 출력 결과:
  // [logOnCall] I am decorating Greeter
  // [descriptor.value] Calling 'greet' with: you
  // [greet] Hello, you!
}
