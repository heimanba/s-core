import { Logger as MyLogger } from '@tsed/logger';
import chalk from 'chalk';
import { S_CURRENT_HOME } from '../libs/common';
import minimist from 'minimist';

type LogColor =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'whiteBright'
  | 'gray';

export interface ILogger {
  // 打印
  log: (message: any, color?: LogColor) => any;
  // 当成日志
  info: (...data: any[]) => any;
  debug: (...data: any[]) => any;
  warn: (...data: any[]) => any;
  error: (...data: any[]) => any;
}

export const logger = (name: string) => {
  const loggers = new MyLogger(name);
  const args = minimist(process.argv.slice(2));
  loggers.appenders
    .set('std-log', {
      type: 'stdout',
      layout: { type: 'colored' },
      level: (args.debug ? ['debug'] : []).concat(['info', 'warn', 'error', 'fatal']),
    })
    .set('all-log-file', {
      type: 'file',
      filename: `${S_CURRENT_HOME}/logs/${name}/app.log`,
      level: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
      pattern: '.yyyy-MM-dd',
      maxLogSize: 5,
      layout: {
        type: 'json',
        separator: ',',
      },
    });
  return loggers;
};

export class Logger {
  static log(message: any, color?: LogColor) {
    return process.stdout.write(`${color ? chalk[color](message) : message}\n`);
  }

  static debug(name: string, data) {
    const Loggers = logger(name);
    Loggers.debug(data);
  }

  static info(name: string, data) {
    const Loggers = logger(name);
    Loggers.info(data);
  }

  static warn(name: string, data) {
    const Loggers = logger(name);
    Loggers.warn(data);
  }

  static error(name: string, data) {
    const Loggers = logger(name);
    Loggers.error(data);
  }
}

// refer https://logger.tsed.io/getting-started.html#installation
