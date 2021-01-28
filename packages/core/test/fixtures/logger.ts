import { Logger } from '../../src/decorators/logger/index';
import { sleep } from '../../src/libs/utils';

class LoggerDemo {
  // @ts-ignore
  @Logger logger: ILogger;

  getDefaultLog() {
    this.logger.print('abct', { status: 'success' });
  }


  getDefaultLogObect() {
    const jsonObj = { name: 'dankun', age: 20 };
    this.logger.error(jsonObj, { context: 'S-CORE' });
  }

  getDefaultLogWithContext() {
    this.logger.error('abct', { context: 'S-CORE' });
  }

  async printSpinner() {
    this.logger.print('开始执行', { spinner: true, status: 'start' });
    await sleep(1000);
    this.logger.print('执行下一步', {
      spinner: true,
      status: 'spinning',
      spinning: {
        text: 'hhhh',
        color: 'red',
      },
    });
    await sleep(1000);
    this.logger.print('执行成功', { spinner: true, status: 'success' });
  }
}

const demo = new LoggerDemo();
demo.getDefaultLog();
// demo.printSpinner();
demo.getDefaultLogWithContext();

// const logger = new Logger();
// logger.error('dankun');

// enum LogLevelEnum {
//   'info', 'debug', 'warn', 'error', 'print', 'report'
// }
//
// console.log(LogLevelEnum[2]);
