import { HLogger } from '../../src';

class LoggerDemo {
  @HLogger('S-CORE') logger;

  getDefaultLog() {
    this.logger.info('abct');
  }

  getDefaultLogObect() {
    const jsonObj = { name: 'dankun', age: 20 };
    this.logger.error(jsonObj, { context: 'S-CORE' });
  }

  getDefaultLogWithContext() {
    this.logger.info('abct', { context: 'S-CORE', level: 'info' });
  }

  info() {
    this.logger.info('测试INFO', { context: 'S-CORE' });
  }

  error() {
    this.logger.error('测试ERROR', { context: 'S-CORE' });
  }

  warn() {
    this.logger.warn('测试WARN', { context: 'S-CORE' });
  }

  debug() {
    this.logger.debug('测试DEBUG', { context: 'S-CORE', level: 'debug' });
  }

  debugLevel() {
    this.logger.debug('测试DEBUG LEVEL', { context: 'S-CORE', level: 'error' });
  }

  log() {
    this.logger.log('开始执行..,');
    this.logger.log('执行成功', 'green');
  }
}

const demo = new LoggerDemo();
// demo.info();
// demo.error();
// demo.warn();
// demo.debug();
// demo.debugLevel();
demo.log();
// demo.getDefaultLog();
// demo.getDefaultLogWithContext();
// demo.error();
// demo.warn();
// demo.debug();

// demo.report();

// const logger = new Logger();
// logger.error('dankun');

// enum LogLevelEnum {
//   'info', 'debug', 'warn', 'error', 'print', 'report'
// }
//
// console.log(LogLevelEnum[2]);
