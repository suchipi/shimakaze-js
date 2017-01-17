import parseCliArgv from './parseCliArgv';

describe('parseCliArgv', () => {
  function verifyExamples(examples) {
    Object.entries(examples).forEach(([cmdString, expectedInputConfig]) => {
      const argv = cmdString.split(' ');
      expect(parseCliArgv(argv)).toMatchObject(expectedInputConfig);
    });
  }

  it('can parse input and output', () => {
    verifyExamples({
      'file.mkv': { input: 'file.mkv' },
      'file.mkv file.mp4': { input: 'file.mkv', output: 'file.mp4' },
    });
  });

  it('can parse audio track', () => {
    verifyExamples({
      '--audio-track 0 file.mkv file.mp4': { input: 'file.mkv', output: 'file.mp4', audioTrack: 0 },
      'file.mkv --audio-track 1 file.mp4': { input: 'file.mkv', output: 'file.mp4', audioTrack: 1 },
      'file.mkv file.mp4 --audio-track 2': { input: 'file.mkv', output: 'file.mp4', audioTrack: 2 },
      '-a 3 file.mkv file.mp4': { input: 'file.mkv', output: 'file.mp4', audioTrack: 3 },
      'file.mkv -a 4 file.mp4': { input: 'file.mkv', output: 'file.mp4', audioTrack: 4 },
      'file.mkv file.mp4 -a 5': { input: 'file.mkv', output: 'file.mp4', audioTrack: 5 },
    });
  });

  it('can parse subtitle track', () => {
    verifyExamples({
      '--subtitle-track 0 file.mkv file.mp4': { input: 'file.mkv', output: 'file.mp4', subtitleTrack: 0 },
      'file.mkv --subtitle-track 1 file.mp4': { input: 'file.mkv', output: 'file.mp4', subtitleTrack: 1 },
      'file.mkv file.mp4 --subtitle-track 2': { input: 'file.mkv', output: 'file.mp4', subtitleTrack: 2 },
      '-s 3 file.mkv file.mp4': { input: 'file.mkv', output: 'file.mp4', subtitleTrack: 3 },
      'file.mkv -s 4 file.mp4': { input: 'file.mkv', output: 'file.mp4', subtitleTrack: 4 },
      'file.mkv file.mp4 -s 5': { input: 'file.mkv', output: 'file.mp4', subtitleTrack: 5 },
    });
  });

  it('can parse video track', () => {
    verifyExamples({
      '--video-track 0 file.mkv file.mp4': { input: 'file.mkv', output: 'file.mp4', videoTrack: 0 },
      'file.mkv --video-track 1 file.mp4': { input: 'file.mkv', output: 'file.mp4', videoTrack: 1 },
      'file.mkv file.mp4 --video-track 2': { input: 'file.mkv', output: 'file.mp4', videoTrack: 2 },
      '-v 3 file.mkv file.mp4': { input: 'file.mkv', output: 'file.mp4', videoTrack: 3 },
      'file.mkv -v 4 file.mp4': { input: 'file.mkv', output: 'file.mp4', videoTrack: 4 },
      'file.mkv file.mp4 -v 5': { input: 'file.mkv', output: 'file.mp4', videoTrack: 5 },
    });
  });

  it('can parse hardsub', () => {
    verifyExamples({
      '--hardsub file.mkv file.mp4': { input: 'file.mkv', output: 'file.mp4', hardsub: true },
      'file.mkv --hardsub file.mp4': { input: 'file.mkv', output: 'file.mp4', hardsub: true },
      'file.mkv file.mp4 --hardsub': { input: 'file.mkv', output: 'file.mp4', hardsub: true },
      '-h file.mkv file.mp4': { input: 'file.mkv', output: 'file.mp4', hardsub: true },
      'file.mkv -h file.mp4': { input: 'file.mkv', output: 'file.mp4', hardsub: true },
      'file.mkv file.mp4 -h': { input: 'file.mkv', output: 'file.mp4', hardsub: true },
    });
  });

  it('can parse extract fonts', () => {
    verifyExamples({
      '--extract-fonts file.mkv': { input: 'file.mkv', extractFonts: true },
      'file.mkv --extract-fonts': { input: 'file.mkv', extractFonts: true },
      '--no-extract-fonts file.mkv': { input: 'file.mkv', extractFonts: false },
      'file.mkv --no-extract-fonts': { input: 'file.mkv', extractFonts: false },
      '--extract-fonts=false file.mkv': { input: 'file.mkv', extractFonts: false },
      'file.mkv --extract-fonts=false': { input: 'file.mkv', extractFonts: false },
    });
  });

  it('can parse start time', () => {
    verifyExamples({
      '--start-time 0 file.mkv file.mp4': { input: 'file.mkv', output: 'file.mp4', startTime: 0 },
      'file.mkv --start-time 1 file.mp4': { input: 'file.mkv', output: 'file.mp4', startTime: 1 },
      'file.mkv file.mp4 --start-time 2': { input: 'file.mkv', output: 'file.mp4', startTime: 2 },
      '-t 3 file.mkv file.mp4': { input: 'file.mkv', output: 'file.mp4', startTime: 3 },
      'file.mkv -t 4 file.mp4': { input: 'file.mkv', output: 'file.mp4', startTime: 4 },
      'file.mkv file.mp4 -t 5': { input: 'file.mkv', output: 'file.mp4', startTime: 5 },
    });
  });

  it('can parse all the options together', () => {
    verifyExamples({
      'file.mkv file.mp4 -a 0 -s 1 -v 2 -h --extract-fonts -t 10': {
        input: 'file.mkv',
        output: 'file.mp4',
        audioTrack: 0,
        subtitleTrack: 1,
        videoTrack: 2,
        hardsub: true,
        extractFonts: true,
        startTime: 10,
      },
      'file.mkv file.mp4 --audio-track 0 --subtitle-track 1 --video-track 2 --hardsub --extract-fonts --start-time 10': {
        input: 'file.mkv',
        output: 'file.mp4',
        audioTrack: 0,
        subtitleTrack: 1,
        videoTrack: 2,
        hardsub: true,
        extractFonts: true,
        startTime: 10,
      },
    });
  });
});
