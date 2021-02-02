import download, { DownloadOptions as MyDownloadOptions } from 'download';
import got from 'got';
import { ProgressService, ProgressType, ProgressBarOptions } from '@serverless-devs/s-progress-bar';
import { green } from 'colors';
import spinner from './spinner';
import { Logger } from '../logger';

// @ts-ignore
interface HintOptions {
  spinning?: string;
  success?: string;
  error?: string;
}
export interface requestOptions {
  method?: 'get' | 'post';
  data?: object;
  json?: boolean;
  hint?: HintOptions;
}

export type DownloadOptions = MyDownloadOptions;

enum METHOD_ENUM {
  get = 'query',
  post = 'body',
}

export async function request(url: string, options?: requestOptions): Promise<any> {
  // @ts-ignore
  const { method = 'get', data, json, hint = {} } = options || {};

  const { spinning, success, error } = hint;
  let vm = null;
  spinning && (vm = spinner(spinning));

  const result: any = await got(url, {
    method: method.toUpperCase(),
    [METHOD_ENUM[method]]: data,
    json: json || true,
  });

  spinning && vm.stop();

  const { statusCode, body }: { statusCode: number; body: any } = result;
  const errorMessage = (code: string | number, message: string) =>
    `Url:${url}\n,params: ${JSON.stringify(options)}\n,ErrorMessage:${message}\n, Code: ${code}`;

  if (statusCode !== 200) {
    error && Logger.error(error);
    throw new Error(errorMessage(statusCode, '系统异常'));
  } else if (body.Error) {
    error && Logger.error(error);
    throw new Error(errorMessage(body.Error.Code, body.Error.Message));
  }

  success && Logger.info(success);
  return body.Response;
}

export async function downloadRequest(url, dest, options: MyDownloadOptions) {
  console.log('prepare downloading');
  let len;
  try {
    const { headers } = await got(url, { method: 'HEAD' });
    len = parseInt(headers['content-length'], 10);
  } catch (err) {
    // ignore error
  }

  let bar;
  if (len) {
    const pbo: ProgressBarOptions = { total: len };
    bar = new ProgressService(ProgressType.Bar, pbo);
  } else {
    const pbo: ProgressBarOptions = {
      total: 120,
      width: 30,
    };
    const format = `((:bar)) ${green(':loading')} ${green('downloading')} `;
    bar = new ProgressService(ProgressType.Loading, pbo, format);
  }
  await download(url, dest, options).on('downloadProgress', (progress) => {
    bar.update(progress.transferred);
  });
  console.log('start downloading');
  bar.terminate();
}
