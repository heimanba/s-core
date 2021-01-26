import { Log } from '../src/decorators/logger/index';
import { ILogger } from '../src/interface';

class LoggerDemo {
  @Log
  log: ILogger;
}

describe('logger.test', () => {
  it('test for class', () => {
    const demo = new LoggerDemo();
    expect(demo.log.debug).not.toBeNull();
  });
});
