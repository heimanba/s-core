import { isObject } from '../libs/utils';
import { clc, yellow } from './cli-colors.util';
import { ILogger } from '../interface';

export type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose';

export class Logger {
  protected static instance?: typeof Logger | ILogger = Logger;
  private static logLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];
  private static lastTimestamp?: number;

  static overrideLogger(logger: ILogger | LogLevel[] | boolean) {
    if (Array.isArray(logger)) {
      this.logLevels = logger;
      return;
    }
    this.instance = isObject(logger) ? (logger as ILogger) : undefined;
  }

  static log(message: any, context = '', isTimeDiffEnabled = true) {
    this.printMessage(message, clc.green, context, isTimeDiffEnabled);
  }

  static error(message: any, trace = '', context = '', isTimeDiffEnabled = true) {
    this.printMessage(message, clc.red, context, isTimeDiffEnabled, 'stderr');
    this.printStackTrace(trace);
  }

  static warn(message: any, context = '', isTimeDiffEnabled = true) {
    this.printMessage(message, clc.yellow, context, isTimeDiffEnabled);
  }

  static debug(message: any, context = '', isTimeDiffEnabled = true) {
    this.printMessage(message, clc.magentaBright, context, isTimeDiffEnabled);
  }

  static verbose(message: any, context = '', isTimeDiffEnabled = true) {
    this.printMessage(message, clc.cyanBright, context, isTimeDiffEnabled);
  }

  static getTimestamp() {
    const localeStringOptions = {
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      day: '2-digit',
      month: '2-digit',
    };
    return new Date(Date.now()).toLocaleString(undefined, localeStringOptions);
  }

  private static printMessage(
    message: any,
    color: (message: string) => string,
    context = '',
    isTimeDiffEnabled?: boolean,
    writeStreamType?: 'stdout' | 'stderr',
  ) {
    const output = isObject(message)
      ? `${color('Object:')}\n${JSON.stringify(message, null, 2)}\n`
      : color(message);

    const pidMessage = color(`[S] ${process.pid}   - `);
    const contextMessage = context ? yellow(`[${context}] `) : '';
    const timestampDiff = this.updateAndGetTimestampDiff(isTimeDiffEnabled);
    const instance = (this.instance as typeof Logger) ?? Logger;
    const computedMessage = `${pidMessage}${instance.getTimestamp()}   ${contextMessage}${output}${timestampDiff}\n`;

    process[writeStreamType ?? 'stdout'].write(computedMessage);
  }

  private static updateAndGetTimestampDiff(isTimeDiffEnabled?: boolean): string {
    const includeTimestamp = Logger.lastTimestamp && isTimeDiffEnabled;
    const result = includeTimestamp ? yellow(` +${Date.now() - Logger.lastTimestamp}ms`) : '';
    Logger.lastTimestamp = Date.now();
    return result;
  }

  private static printStackTrace(trace: string) {
    if (!trace) {
      return;
    }
    process.stderr.write(`${trace}\n`);
  }

  constructor(protected context?: string, private readonly isTimestampEnabled = false) {}

  error(message: any, trace = '', context?: string) {
    const instance = this.getInstance();
    if (!this.isLogLevelEnabled('error')) {
      return;
    }
    instance && instance.error.call(instance, message, trace, context || this.context);
  }

  log(message: any, context?: string) {
    this.callFunction('log', message, context);
  }

  warn(message: any, context?: string) {
    this.callFunction('warn', message, context);
  }

  debug(message: any, context?: string) {
    this.callFunction('debug', message, context);
  }

  verbose(message: any, context?: string) {
    this.callFunction('verbose', message, context);
  }

  setContext(context: string) {
    this.context = context;
  }

  getTimestamp() {
    return Logger.getTimestamp();
  }

  protected getInstance(): typeof Logger | ILogger {
    const { instance } = Logger;
    return instance === this ? Logger : instance;
  }

  private callFunction(name: 'log' | 'warn' | 'debug' | 'verbose', message: any, context?: string) {
    if (!this.isLogLevelEnabled(name)) {
      return;
    }
    const instance = this.getInstance();
    const func = instance && (instance as typeof Logger)[name];
    func && func.call(instance, message, context || this.context, this.isTimestampEnabled);
  }

  private isLogLevelEnabled(level: LogLevel): boolean {
    return Logger.logLevels.includes(level);
  }
}
