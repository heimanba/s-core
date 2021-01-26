import { Logger as MyLogger } from '../../logger';

export function LoggerClass<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    log = MyLogger;
  };
}
