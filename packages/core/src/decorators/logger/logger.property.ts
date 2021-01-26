/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Logger } from '../../logger';

export const LogProperty = (target: any, key: string) => {
  // @ts-ignore
  let _val = this[key] || Logger;

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
