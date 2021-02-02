import { Logger } from '../../src/decorator/logger/index';
import { sleep } from '../../src/libs/utils';

const https = require('https');

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
    this.logger.error('abct', { context: 'S-CORE', level: 'error' });
    this.logger.warn('abct', { context: 'S-CORE', level: 'warn' });
    this.logger.debug('abct', { context: 'S-CORE', level: 'debug' });
  }

  print() {
    this.logger.log('开始执行', { color: 'green' });
  }

  async spinner() {
    this.logger.spinner('开始执行', { status: 'start' });
    await sleep(1000);
    this.logger.spinner('执行下一步', {
      status: 'spinning',
      spinning: {
        text: 'hhhh',
        color: 'red',
      },
    });
    await sleep(1000);
    this.logger.spinner('执行成功', { status: 'success' });
  }

  progress() {
    const req = https.request({
      host: 'download.github.com',
      port: 443,
      path: '/visionmedia-node-jscoverage-0d4608a.zip',
    });

    req.on('response', (res) => {
      const len = parseInt(res.headers['content-length'], 10);
      this.logger.progress('下载文件', {
        status: 'start',
        complete: '=',
        incomplete: ' ',
        width: 20,
        size: len,
      });

      res.on('data', (chunk) => {
        this.logger.progress('下载文件', {
          status: 'tick',
          size: chunk.length,
        });
      });

      res.on('end', () => {
        console.log('\n');
      });
    });

    req.end();
  }

  report() {
    this.logger.report('错误上报', {
      type: 'error',
      context: 'fc',
    });
    this.logger.report('组件数据上报', {
      type: 'component',
      context: 'fc',
      params: {
        action: 'deploy',
        account: '123435',
      },
    });
  }
}

const demo = new LoggerDemo();
// demo.getDefaultLog();
// demo.print();
// demo.spinner();
// demo.progress();
demo.getDefaultLog();

// demo.report();

// const logger = new Logger();
// logger.error('dankun');

// enum LogLevelEnum {
//   'info', 'debug', 'warn', 'error', 'print', 'report'
// }
//
// console.log(LogLevelEnum[2]);
