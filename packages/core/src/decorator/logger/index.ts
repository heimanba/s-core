import { Logger as MyLogger } from '../../logger';

export const Logger = (context: string) => (target: any, key: string) => {
  // @ts-ignore
  let _val = this[key] || new MyLogger(context);

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

export const Log = Logger;
