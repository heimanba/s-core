import { zip } from '../../../src/common';

zip({
  codeUri: './demo',
  include: ['../spinner.ts'],
  exclude: ['a.md'],
  // exclude: ['dir'],
  // exclude: ['./demo/dir'],
  outputFilePath: './zipdist',
});
