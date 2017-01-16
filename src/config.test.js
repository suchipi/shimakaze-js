import path from 'path';
import { defaults, parse as realParse } from './config';

const options = [
  'audioTrack',
  'subtitleTrack',
  'videoTrack',
  'hardsub',
  'extractFonts',
  'ffmpegOptions',
  'startTime',
];

describe('defaults', () => {
  it('has an option for every config value', () => {
    options.forEach((option) => {
      expect(defaults[option]).toBeDefined();
    });
  });
});

describe('parse', () => {
  let parse;
  Object.entries({
    'using input/output config entries': () => { parse = realParse; },
    'using yargs-style input/output': () => {
      parse = ({ input, output, ...rest }) => {
        const _ = [];
        if (input) _.push(input);
        if (output) _.push(output);
        return realParse({ _, ...rest });
      };
    },
  }).forEach(([description, beforeCallback]) => {
    beforeEach(beforeCallback);

    describe(description, () => {
      it('returns an object with a key for every option', () => {
        const config = parse({ input: 'file.mkv' });
        options.forEach((option) => {
          expect(config[option]).toBeDefined();
        });
      });

      it('defaults every option to its default value if not provided', () => {
        options.forEach((option) => {
          const config = parse({ input: 'file.mkv' });
          expect(config[option]).toBe(defaults[option]);
        });
      });

      it('uses passed values instead of defaults if provided', () => {
        options.forEach((option) => {
          const config = parse({ [option]: 'something', input: 'file.mkv' });
          expect(config[option]).toBe('something');
        });
      });

      describe('extractFonts', () => {
        it('is set to true when hardsub is true', () => {
          const config = parse({ hardsub: true, input: 'file.mkv' });
          expect(config.extractFonts).toBe(true);
        });
      });

      describe('input/output/outputType', () => {
        const absPath = pathPart => path.join(process.cwd(), pathPart);

        it('errors if no input is provided', () => {
          expect(() => {
            parse({});
          }).toThrow();
        });

        describe('when extractFonts is requested and not hardsub', () => {
          let config;
          beforeEach(() => {
            config = parse({ extractFonts: true, input: 'file.mkv' });
          });

          it('returns "none" as the outputType', () => {
            expect(config.outputType).toBe('none');
          });

          it('parses the input into an absolute path', () => {
            expect(config.input).toBe(absPath('file.mkv'));
          });

          it('does not return an output', () => {
            expect(config.output).not.toBeDefined();
          });
        });

        describe('when using an rtmp server as the output path', () => {
          const rtmpServer = 'rtmp://example.com/my-server/live';
          let config;
          beforeEach(() => {
            config = parse({ input: 'file.mkv', output: rtmpServer });
          });

          it('returns "rtmp" as the outputType', () => {
            expect(config.outputType).toBe('rtmp');
          });

          it('parses the input into an absolute path', () => {
            expect(config.input).toBe(absPath('file.mkv'));
          });

          it('passes the output through unmodified', () => {
            expect(config.output).toBe(rtmpServer);
          });
        });

        describe('when outputting to file', () => {
          let config;
          beforeEach(() => {
            config = parse({ input: 'file.mkv', output: 'file.mp4' });
          });

          it('returns "rtmp" as the outputType', () => {
            expect(config.outputType).toBe('file');
          });

          it('parses the input into an absolute path', () => {
            expect(config.input).toBe(absPath('file.mkv'));
          });

          it('parses the output into an absolute path', () => {
            expect(config.output).toBe(absPath('file.mp4'));
          });
        });
      });
    });
  });
});
