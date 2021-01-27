import { Log } from '../../src/decorators/logger/index';
// import { ILogger } from '../../src/interface';

// import { Logger } from '../../src/logger/index';

class LoggerDemo {
  // @ts-ignore
  @Log logger: ILogger;

  getDefaultLog() {
    this.logger.print('abct', { color: 'green' });
  }


  getDefaultLogObect() {
    const jsonObj = { name: 'dankun', age: 20 };
    this.logger.error(jsonObj, { context: 'S-CORE' });
  }

  getDefaultLogWithContext() {
    this.logger.error('abct', { context: 'S-CORE' });
  }
}

const demo = new LoggerDemo();
demo.getDefaultLog();
// demo.getDefaultLogObect();
// demo.getDefaultLogWithContext();

// const logger = new Logger();
// logger.error('dankun');

// enum LogLevelEnum {
//   'info', 'debug', 'warn', 'error', 'print', 'report'
// }
//
// console.log(LogLevelEnum[2]);
