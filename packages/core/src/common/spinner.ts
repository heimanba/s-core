import ora, { Ora } from 'ora';

export default function spinner(message: any): Ora {
  return ora(message).start();
}
