import { Log } from '../../src/decorators/logger/index';
import { ILogger } from '../../src/interface';

class LoggerDemo {
  @Log
  log: ILogger;
}

const demo = new LoggerDemo();
demo.log.error('dankun test');
