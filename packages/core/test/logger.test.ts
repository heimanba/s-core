import { Logger, ILogger } from '../src/decorators/logger/index';

class LoggerDemo {
  // @ts-ignore
  @Logger log: ILogger;
}

describe('logger.test', () => {
  it('test for class', () => {
    const demo = new LoggerDemo();
    expect(demo.log.debug).not.toBeNull();
  });
});
