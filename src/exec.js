// @flow
import { exec as childProcessExec } from 'child_process';
import SuperError from 'super-error';

export type ExecResult = {
  code: number,
  stdout: string,
  stderr: string,
}

type ChildProcessExecOptions = {
  cwd?: string,
  env?: {[key:string]: string},
  encoding?: string,
  shell?: string,
  timeout?: number,
  maxBuffer?: number,
  killSignal?: string,
  uid?: number,
  gid?: number,
}

export const ExecError = SuperError.subclass('ExecError');

export default function exec(
  command: string, options?: ChildProcessExecOptions,
): Promise<ExecResult> {
  return new Promise((resolve, reject) => {
    childProcessExec(command, options, (error, passedStdout, passedStderr) => {
      let stdout;
      let stderr;

      if (passedStdout instanceof Buffer) {
        stdout = passedStdout.toString('utf-8');
      } else {
        stdout = passedStdout;
      }
      if (passedStderr instanceof Buffer) {
        stderr = passedStderr.toString('utf-8');
      } else {
        stderr = passedStderr;
      }

      if (error) {
        reject(
          new ExecError('Exited with non-zero exit status', {
            code: error.code,
            stdout,
            stderr,
          }).causedBy(error),
        );
      } else {
        resolve({ code: 0, stdout, stderr });
      }
    });
  });
}
