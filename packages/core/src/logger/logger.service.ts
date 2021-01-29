import { isObject } from '../libs/utils';
import { yellow } from 'colors';

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

export enum STATUS_COLOR {
  start = 'green',
  spinning = 'green',
  stop = 'blue',
  success = 'cyan',
  error = 'red',
  warn = 'yellow',
  info = 'cyan',
}

export enum ORA_STATUS {
  start = 'start',
  spinning = 'spinning',
  stop = 'stop',
  success = 'succeed',
  error = 'fail',
  warn = 'warn',
  info = 'info',
}

export function printMessage(messageOptions: IPrintMessage) {
  const { level, lable, message, color, context, writeStreamType } = messageOptions;
  const list = ['print', 'report', 'spinner', 'progress'];
  if (LOG_LEVEL_ENUM[level] > LOG_LEVEL_ENUM[lable] && !list.includes(level)) return;

  const output = isObject(message)
    ? `${color('Object:')}\n${JSON.stringify(message, null, 2)}\n`
    : color(message);
  const pidMessage = color(`[${lable.toUpperCase()}] ${process.pid}   - `);
  const contextMessage = context ? yellow(`[${context}] `) : '';
  const computedMessage = `${pidMessage}${getTimestamp()}   ${contextMessage}${output}\n`;
  process[writeStreamType ?? 'stdout'].write(computedMessage);
}

export function printStackTrace(trace: string) {
  if (!trace) {
    return;
  }
  process.stderr.write(`${trace}\n`);
}
