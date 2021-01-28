import { isObject } from '../libs/utils';
import chalk from 'chalk';
import ora from 'ora';
import { STATUS_COLOR, ORA_STATUS, printMessage, printStackTrace } from './logger.service';

export type LogLevel = 'info' | 'debug' | 'warn' | 'error' | 'print' | 'report';

export interface ILogger {
  // 打印
  print: (message: any, options?: PrintLoggerOptions) => any;
  // 当成日志
  info: (message: any, options?: LoggerOptions) => any;
  debug?: (message: any, options?: LoggerOptions) => any;
  warn: (message: any, options?: LoggerOptions) => any;
  error: (message: any, options?: LoggerOptions) => any;
  // 错误上报 1. 打印ERROR 2. 异常上报
  report?: (message: any, options?: LoggerOptions) => any;
}

interface LoggerOptions {
  context?: string;
  level?: 'info' | 'debug' | 'warn' | 'error';
  trace?: string;
}


interface PrintLoggerOptions extends LoggerOptions {
  progress?: boolean;
  progressing?: {};
  spinner?: boolean;
  spinning?: {
    text: string;
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray';
  };
  status?: 'start' | 'spinning' | 'stop' | 'success' | 'error' | 'warn' | 'info';
}

interface IInstanceLogger extends ILogger {
  spinner?: any;
}

export class Logger implements ILogger {
  protected static instance?: typeof Logger | IInstanceLogger = Logger;
  static spinner = null;

  static overrideLogger(logger: ILogger | boolean) {
    this.instance = isObject(logger) ? (logger as ILogger) : undefined;
  }

  static print(message: any, options: PrintLoggerOptions = {}) {
    const { status, spinner, spinning } = options;
    const color = STATUS_COLOR[status];

    if (!spinner) {
      return process.stdout.write(`${color ? chalk[color](message) : message}\n`);
    } else if (status === 'start') {
      if (this.instance.spinner) {
        this.instance.spinner.clear();
        this.instance.spinner = null;
      }
      this.instance.spinner = ora(message).start();
    } else if (status === 'spinning') {
      this.instance.spinner.color = spinning.color;
      this.instance.spinner.text = spinning.text;
    } else {
      this.instance.spinner[ORA_STATUS[status]](message);
      if (this.instance.spinner) this.instance.spinner.clear();
    }
  }

  static report(message: any, options: LoggerOptions = {}) {
    const { context, level } = options;
    printMessage({ lable: 'report', level, message, color: chalk.green, context });
  }

  static info(message: any, options: LoggerOptions = {}) {
    const { context, level } = options;
    printMessage({ lable: 'info', level, message, color: chalk.green, context });
  }

  static error(message: any, options: LoggerOptions = {}) {
    const { context, trace, level } = options;
    printMessage({ lable: 'error', level, message, color: chalk.red, context, writeStreamType: 'stderr' });
    printStackTrace(trace);
  }

  static warn(message: any, options: LoggerOptions = {}) {
    const { context, level } = options;
    printMessage({ lable: 'warn', level, message, color: chalk.yellowBright, context });
  }

  static debug(message: any, options: LoggerOptions = {}) {
    const { context, level } = options;
    printMessage({ lable: 'debug', level, message, color: chalk.magentaBright, context });
  }


  constructor(protected context?: string) {
  }

  print(message: any, options: PrintLoggerOptions = {}) {
    this.callFunction('print', message, options);
  }

  report(message: any, options: LoggerOptions = {}) {
    this.callFunction('report', message, options);
  }

  info(message: any, options: LoggerOptions = {}) {
    this.callFunction('info', message, options);
  }


  debug(message: any, options: LoggerOptions = {}) {
    this.callFunction('debug', message, options);
  }


  warn(message: any, options: LoggerOptions = {}) {
    this.callFunction('warn', message, options);
  }


  error(message: any, options: LoggerOptions = {}) {
    this.callFunction('error', message, options);
  }

  setContext(context: string) {
    this.context = context;
  }

  protected getInstance(): typeof Logger | ILogger {
    const { instance } = Logger;
    return instance === this ? Logger : instance;
  }

  private callFunction(name: LogLevel, message: any, options: LoggerOptions = {}) {
    const instance = this.getInstance();
    const func = instance && (instance as typeof Logger)[name];
    func && func.call(instance, message, options);
  }
}

export const Log = Logger;
