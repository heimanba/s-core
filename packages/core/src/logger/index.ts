import { isObject } from '../libs/utils';
import chalk from 'chalk';
import { printMessage, printStackTrace } from './logger.service';

export type LogLevel = 'info' | 'debug' | 'warn' | 'error' | 'log';

export interface ILogger {
  // 打印
  log: (message: any, options?: LogOptions) => any;
  // 当成日志
  info: (message: any, options?: LoggerOptions) => any;
  debug: (message: any, options?: LoggerOptions) => any;
  warn: (message: any, options?: LoggerOptions) => any;
  error: (message: any, options?: LoggerOptions) => any;
}

interface LoggerOptions {
  context?: string;
  level?: 'info' | 'debug' | 'warn' | 'error';
  trace?: string;
}

type IInstanceLogger = ILogger;

interface LogOptions {
  color?: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray';
}

export class Logger implements ILogger {
  protected static instance?: typeof Logger | IInstanceLogger = Logger;

  static overrideLogger(logger: ILogger | boolean) {
    this.instance = isObject(logger) ? (logger as ILogger) : undefined;
  }

  static log(message: any, options: LogOptions = {}) {
    const { color } = options;
    return process.stdout.write(`${color ? chalk[color](message) : message}\n`);
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

  constructor(protected context?: string) {
    this.setContext(context);
  }

  log(message: any, options: LogOptions = {}) {
    this.callFunction('log', message, options);
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

  private callFunction(name: LogLevel, message: any, options: LoggerOptions | LogOptions) {
    const instance = this.getInstance();
    const func = instance && (instance as typeof Logger)[name];
    func &&
      func.call(
        instance,
        message,
        Object.assign(options || {}, {
          // @ts-ignore
          context: options.context || this.context,
        }),
      );
  }
}
