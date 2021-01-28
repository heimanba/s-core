import { LoggerClass } from './logger.class';
import { LogProperty } from './logger.property';

export { ILogger } from '../../logger';

export function Logger(this: any, ...args: any[]): any {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const _this = this;
  switch (args.length) {
    case 1:
      return LoggerClass.apply(_this, args);
    case 2:
      return LogProperty.apply(_this, args);
    default:
      return LogProperty.apply(_this, args);
  }
}

export const Log = Logger;
