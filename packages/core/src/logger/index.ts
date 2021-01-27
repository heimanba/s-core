import { isObject } from '../libs/utils';
// import { clc } from '../libs/colors.util';
import colors from 'colors';
import { printMessage, printStackTrace } from './logger.service';

export type LogLevel = 'print' | 'info' | 'debug' | 'warn' | 'error' | 'report';

export interface ILogger {
  // 打印
  print: (message: any, options?: LoggerOptions) => any;
  // 当成日志
  info: (message: any, options?: LoggerOptions) => any;
  debug?: (message: any, options?: LoggerOptions) => any;
  warn: (message: any, options?: LoggerOptions) => any;
  error: (message: any, options?: LoggerOptions) => any;
  // 错误上报 1. 打印ERROR 2. 异常上报
  report?: (message: any, options?: LoggerOptions) => any;
}

export interface LoggerOptions {
  context?: string;
  color?: 'green' | 'yellow' | 'red' | 'cyan';
  level?: string;
  trace?: string;
}


export class Logger implements ILogger {
  protected static instance?: typeof Logger | ILogger = Logger;

  static overrideLogger(logger: ILogger | boolean) {
    this.instance = isObject(logger) ? (logger as ILogger) : undefined;
  }

  static print(message: any, options: LoggerOptions = {}) {
    const { color } = options;
    process.stdout.write(color ? colors[color](message) : message);
  }

  static report(message: any, options: LoggerOptions = {}) {
    const { context, level } = options;
    printMessage({ lable: 'report', level, message, color: colors.green, context });
  }

  static info(message: any, options: LoggerOptions = {}) {
    const { context, level } = options;
    printMessage({ lable: 'info', level, message, color: colors.green, context });
  }

  static error(message: any, options: LoggerOptions = {}) {
    const { context, trace, level } = options;
    printMessage({ lable: 'error', level, message, color: colors.red, context, writeStreamType: 'stderr' });
    printStackTrace(trace);
  }

  static warn(message: any, options: LoggerOptions = {}) {
    const { context, level } = options;
    printMessage({ lable: 'warn', level, message, color: colors.yellow, context });
  }

  static debug(message: any, options: LoggerOptions = {}) {
    const { context, level } = options;
    printMessage({ lable: 'debug', level, message, color: colors.magenta, context });
  }


  constructor(protected context?: string) {
  }

  print(message: any, options: LoggerOptions = {}) {
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
