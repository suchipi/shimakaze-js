/* eslint-disable global-require */
let mockCode;
let mockStdout;
let mockStderr;
jest.mock('child_process', () => ({
  exec: (command, options, callback) => {
    let error = null;
    if (mockCode !== 0) {
      error = new Error('Shell execution failed');
      error.code = mockCode;
    }
    callback(error, mockStdout, mockStderr);
  },
}));

let exec;
let ExecError;

describe('when the command succeeds', () => {
  beforeEach(() => {
    mockCode = 0;
    mockStdout = 'All good\n';
    mockStderr = '';
    ({ default: exec, ExecError } = require('./exec'));
  });

  it('resolves to a { code, stdout, stderr }', () =>
    exec('do-something').then((result) => {
      expect(result.code).toBe(mockCode);
      expect(result.stdout).toBe(mockStdout);
      expect(result.stderr).toBe(mockStderr);
    }),
  );
});


describe('when the command fails', () => {
  beforeEach(() => {
    mockCode = -1;
    mockStdout = '';
    mockStderr = 'Oh no\n';
    ({ default: exec, ExecError } = require('./exec'));
  });

  it('rejects an ExecError', () =>
    exec('do-something').then(() => {
      throw new Error('Should not have resolved');
    }, (error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(ExecError);
      expect(error.code).toBe(mockCode);
      expect(error.stdout).toBe(mockStdout);
      expect(error.stderr).toBe(mockStderr);
    }),
  );
});
