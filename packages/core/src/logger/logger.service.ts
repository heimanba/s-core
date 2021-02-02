import { isObject } from '../libs/utils';
import chalk from 'chalk';

interface IPrintMessage {
  lable: string;
  message: any;
  level: string;
  color: (message: string) => string;
  context?: string;
  writeStreamType?: 'stdout' | 'stderr';
}

function getTimestamp() {
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

enum LOG_LEVEL_ENUM {
  'debug',
  'info',
  'warn',
  'error',
}

export function printMessage(messageOptions: IPrintMessage) {
  const { level, lable, message, color, context, writeStreamType } = messageOptions;
  if (LOG_LEVEL_ENUM[level] > LOG_LEVEL_ENUM[lable] && level !== 'log') return;

  const output = isObject(message) ? `'Object:'\n${JSON.stringify(message, null, 2)}\n` : message;
  const contextMessage = context ? chalk.yellowBright(`[${context}] `) : '';
  let computedMessage = `[${getTimestamp()}] ${process.pid} `;
  computedMessage += `[${lable.toUpperCase().padEnd(5)}] `;
  computedMessage += `${contextMessage} - ${output}\n`;
  process[writeStreamType ?? 'stdout'].write(color(computedMessage));
}

export function printStackTrace(trace: string) {
  if (!trace) {
    return;
  }
  process.stderr.write(`${trace}\n`);
}
