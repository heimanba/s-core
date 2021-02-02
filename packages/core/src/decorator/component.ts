import { Component as MyComponent } from '../components';

export const Component = (name: string, provider: string) => (target: any, key: string) => {
  // @ts-ignore
  let _val = this[key] || new MyComponent(name, provider);

  const getter = function () {
    return _val;
  };

  const setter = function (newVal) {
    _val = newVal;
  };

  // @ts-ignore
  if (delete this[key]) {
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  }
};
