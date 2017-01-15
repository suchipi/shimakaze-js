import { defaults, parse } from './config';

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
  it('returns an object with a key for every option', () => {
    const result = parse({ input: 'file.mkv' });
    options.forEach((option) => {
      expect(result[option]).toBeDefined();
    });
  });

  it('defaults every option to its default value if not provided', () => {
    options.forEach((option) => {
      const result = parse({ input: 'file.mkv' });
      expect(result[option]).toBe(defaults[option]);
    });
  });

  it('uses passed values instead of defaults if provided', () => {
    options.forEach((option) => {
      const result = parse({ [option]: 'something', input: 'file.mkv' });
      expect(result[option]).toBe('something');
    });
  });

  describe('extractFonts', () => {
    it('is set to true when hardsub is true', () => {
      const result = parse({ hardsub: true, input: 'file.mkv' });
      expect(result.extractFonts).toBe(true);
    });
  });

  describe('input/output', () => {
    it('can get them from input/output entries', () => {
      const result = parse({ input: 'foo', output: 'bar' });
      expect(result.input).toBe('foo');
      expect(result.output).toBe('bar');
    });

    it('can get them from a yargs-style command array', () => {
      const result = parse({ _: ['foo', 'bar'] });
      expect(result.input).toBe('foo');
      expect(result.output).toBe('bar');
    });

    it('cannot do a mix of both', () => {
      const result = parse({ _: ['foo'], output: 'bar' });
      expect(result.input).toBe('foo');
      expect(result.output).not.toBeDefined();
    });
  });
});
