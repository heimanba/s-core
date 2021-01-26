import download, { DownloadOptions as MyDownloadOptions } from 'download';
import got, { GotOptions } from 'got';

import { ProgressService, ProgressType, ProgressBarOptions } from '@serverless-devs/s-progress-bar';

import { green } from 'colors';

export interface requestOptions extends GotOptions<string> {
  searchParams: any;
}
export type DownloadOptions = MyDownloadOptions;

const defaultOptions = { responseType: 'json' };

export async function request(url: string, options?: requestOptions): Promise<any> {
  // @ts-ignore
  const result: any = await got(url, Object.assign(defaultOptions, options || {}));
  const { statusCode, body }: { statusCode: number; body: any } = result;
  const errorMessage = (code: string | number, message: string) =>
    `Url:${url}\n,params: ${JSON.stringify(options)}\n,ErrorMessage:${message}\n, Code: ${code}`;

  if (statusCode !== 200) {
    throw new Error(errorMessage(statusCode, '系统异常'));
  } else if (body.Error) {
    throw new Error(errorMessage(body.Error.Code, body.Error.Message));
  }
  return body.Response;
}

export async function downloadRequest(url, dest, options: MyDownloadOptions) {
  console.log('prepare downloading');
  let len;
  try {
    const { headers } = await got(url);
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