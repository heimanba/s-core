import { isObject } from '../libs/utils';
import chalk from 'chalk';
import ora from 'ora';
import ProgressBar from 'progress';
import { ORA_STATUS, printMessage, printStackTrace } from './logger.service';

export type LogLevel =
  | 'info'
  | 'debug'
  | 'warn'
  | 'error'
  | 'log'
  | 'report'
  | 'spinner'
  | 'progress';

export interface ILogger {
  // 打印
  log: (message: any, options?: LogOptions) => any;
  // 当成日志
  info: (message: any, options?: LoggerOptions) => any;
  debug: (message: any, options?: LoggerOptions) => any;
  warn: (message: any, options?: LoggerOptions) => any;
  error: (message: any, options?: LoggerOptions) => any;
  // 错误上报 1. 打印ERROR 2. 异常上报
  report: (message: any, options?: LoggerOptions) => any;
  spinner: (message: any, options?: SpinnerOptions) => any;
  progress: (message: any, options?: ProgressOptions) => any;
}

interface LoggerOptions {
  context?: string;
  level?: 'info' | 'debug' | 'warn' | 'error';
  trace?: string;
}

interface SpinnerOptions extends LoggerOptions {
  spinning?: {
    text: string;
    color: LogOptions;
  };
  status?: 'start' | 'spinning' | 'stop' | 'success' | 'error' | 'warn' | 'info';
}

interface IInstanceLogger extends ILogger {
  ora?: any;
  bar?: any;
}

interface LogOptions {
  color?: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray';
}

interface ProgressOptions {
  status: 'start' | 'tick';
  size: number;
  curr?: number;
  head?: string;
  width?: number;
  renderThrottle?: number;
  stream?: NodeJS.WritableStream;
  complete?: string;
  incomplete?: string;
  clear?: boolean;
  callback?: Function;
}

export class Logger implements ILogger {
  static ora = null;
  static bar = null;

  protected static instance?: typeof Logger | IInstanceLogger = Logger;

  static overrideLogger(logger: ILogger | boolean) {
    this.instance = isObject(logger) ? (logger as ILogger) : undefined;
  }

  static log(message: any, options: LogOptions = {}) {
    const { color } = options;
    return process.stdout.write(`${color ? chalk[color](message) : message}\n`);
  }

  static spinner(message: any, options: SpinnerOptions = {}) {
    const { status, spinning } = options;
    if (status === 'start') {
      if (this.instance.ora) {
        this.instance.ora.clear();
        this.instance.ora = null;
      }
      this.instance.ora = ora(message).start();
    } else if (status === 'spinning') {
      this.instance.ora.color = spinning.color;
      this.instance.ora.text = spinning.text;
    } else {
      this.instance.ora[ORA_STATUS[status]](message);
      if (this.instance.ora) this.instance.ora.clear();
    }
  }

  static progress(message: any, options: ProgressOptions) {
    const { status, size, ...rest } = options;
    if (status === 'start') {
      this.instance.bar = new ProgressBar(`${message} [:bar] :percent :etas :current/:total`, {
        total: size,
        ...rest,
      });
    } else if (status === 'tick') {
      this.instance.bar.tick(size);
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
    printMessage({
      lable: 'error',
      level,
      message,
      color: chalk.red,
      context,
      writeStreamType: 'stderr',
    });
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

  constructor(protected context?: string) {}

  log(message: any, options: LogOptions = {}) {
    this.callFunction('log', message, options);
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

  spinner(message: any, options: SpinnerOptions = {}) {
    this.callFunction('spinner', message, options);
  }

  progress(message: any, options: ProgressOptions) {
    this.callFunction('progress', message, options);
  }

  setContext(context: string) {
    this.context = context;
  }

  protected getInstance(): typeof Logger | ILogger {
    const { instance } = Logger;
    return instance === this ? Logger : instance;
  }

  private callFunction(
    name: LogLevel,
    message: any,
    options: LoggerOptions | LogOptions | ProgressOptions,
  ) {
    const instance = this.getInstance();
    const func = instance && (instance as typeof Logger)[name];
    func && func.call(instance, message, options);
  }
}

export const Log = Logger;
