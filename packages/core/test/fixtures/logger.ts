import { Logger } from '../../src/decorator/index';

class LoggerDemo {
  // @ts-ignore
  @Logger('S-CORE') logger: ILogger;

  getDefaultLog() {
    this.logger.info('abct', { status: 'success' });
  }

  getDefaultLogObect() {
    const jsonObj = { name: 'dankun', age: 20 };
    this.logger.error(jsonObj, { context: 'S-CORE' });
  }

  getDefaultLogWithContext() {
    this.logger.info('abct', { context: 'S-CORE', level: 'info' });
  }
  error() {
    this.logger.error('abct', { context: 'S-CORE', level: 'error' });
  }
  warn() {
    this.logger.warn('abct', { context: 'S-CORE', level: 'warn' });
  }
  debug() {
    this.logger.debug('abct', { context: 'S-CORE', level: 'debug' });
  }

  log() {
    this.logger.log('开始执行', { color: 'green' });
  }
}

const demo = new LoggerDemo();
// demo.getDefaultLog();
// demo.log();
// demo.getDefaultLog();
demo.getDefaultLogWithContext();
demo.error();
demo.warn();
demo.debug();

// demo.report();

// const logger = new Logger();
// logger.error('dankun');

// enum LogLevelEnum {
//   'info', 'debug', 'warn', 'error', 'print', 'report'
// }
//
// console.log(LogLevelEnum[2]);
