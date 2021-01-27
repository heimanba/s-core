type ColorTextFn = (text: string) => string;
const { green, yellow, red } = require('colors');

const isColorAllowed = () => !process.env.NO_COLOR;
const colorIfAllowed = (colorFn: ColorTextFn) => (text: string) =>
  (isColorAllowed() ? colorFn(text) : text);

export const clc = {
  green: colorIfAllowed((text: string) => green(text)),
  yellow: colorIfAllowed((text: string) => yellow(text)),
  red: colorIfAllowed((text: string) => red(text)),
  magentaBright: colorIfAllowed((text: string) => `\x1B[95m${text}\x1B[39m`),
  cyanBright: colorIfAllowed((text: string) => `\x1B[96m${text}\x1B[39m`),
};
