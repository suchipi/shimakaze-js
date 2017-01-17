import path from 'path';
import { defaults, parse } from './config';

const options = [
  'audioTrack',
  'subtitleTrack',
  'videoTrack',
  'hardsub',
  'extractFonts',
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
  const inputConfig = {
    audioTrack: undefined,
    subtitleTrack: undefined,
    videoTrack: undefined,
    hardsub: undefined,
    extractFonts: undefined,
    startTime: undefined,
    input: 'file.mkv',
    output: undefined,
  };

  it('returns an object with a key for every option', () => {
    const config = parse(inputConfig);
    options.forEach((option) => {
      expect(config[option]).toBeDefined();
    });
  });

  it('defaults every option to its default value if not provided', () => {
    options.forEach((option) => {
      const config = parse(inputConfig);
      expect(config[option]).toBe(defaults[option]);
    });
  });

  it('uses passed values instead of defaults if provided', () => {
    options.forEach((option) => {
      const config = parse({ ...inputConfig, [option]: 'something' });
      expect(config[option]).toBe('something');
    });
  });

  describe('extractFonts', () => {
    let hardsub;
    let extractFonts;

    describe('when hardsub is true', () => {
      beforeEach(() => {
        hardsub = true;
      });

      describe('and extractFonts is not defined', () => {
        it('gets set to true', () => {
          const config = parse({ ...inputConfig, hardsub, extractFonts });
          expect(config.extractFonts).toBe(true);
        });
      });

      describe('and extractFonts is explicitly set to false', () => {
        beforeEach(() => {
          extractFonts = false;
        });

        it('does not get set to true', () => {
          const config = parse({ ...inputConfig, hardsub, extractFonts });
          expect(config.extractFonts).toBe(false);
        });
      });
    });
  });

  describe('input/output/outputType', () => {
    const absPath = pathPart => path.join(process.cwd(), pathPart);

    it('errors if no input is provided', () => {
      expect(() => {
        parse({ ...inputConfig, input: undefined });
      }).toThrow();
    });

    describe('when extractFonts is requested and not hardsub', () => {
      let config;
      beforeEach(() => {
        config = parse({ ...inputConfig, extractFonts: true });
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
        config = parse({ ...inputConfig, output: rtmpServer });
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
        config = parse({ ...inputConfig, output: 'file.mp4' });
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
