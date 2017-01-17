// @flow
import { exec as shelljsExec } from 'shelljs';
import SuperError from 'super-error';

export type ExecResult = {
  code: number,
  stdout: string,
  stderr: string,
}

export const ExecError = SuperError.subclass('ExecError');

export default function exec(command: string): Promise<ExecResult> {
  return new Promise((resolve, reject) => {
    shelljsExec(command, { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        reject(new ExecError('Exited with non-zero exit status', { code, stdout, stderr }));
      } else {
        resolve({ code, stdout, stderr });
      }
    });
  });
}
