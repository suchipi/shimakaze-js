// @flow
type BaseConfig = {
  audioTrack: number,
  subtitleTrack: number,
  videoTrack: number,
  hardsub: boolean,
  extractFonts: boolean,
  ffmpegOptions: string,
  startTime: number,
}

export type InputConfig = BaseConfig & {
  _?: string[],
  input?: string,
  output?: string,
};

export type Config = BaseConfig & {
  input: string,
  output?: string,
};

const defaults: BaseConfig = {
  audioTrack: 0,
  subtitleTrack: 0,
  videoTrack: 0,
  hardsub: false,
  extractFonts: false,
  ffmpegOptions: '',
  startTime: 0,
};

function parse(config: InputConfig): Config {
  const {
    hardsub = defaults.hardsub,
    extractFonts = hardsub,
    audioTrack = defaults.audioTrack,
    subtitleTrack = defaults.subtitleTrack,
    videoTrack = defaults.videoTrack,
    startTime = defaults.startTime,
    ffmpegOptions = defaults.ffmpegOptions,
  } = config;

  let input;
  let output;
  if (Array.isArray(config._)) {
    input = config._[0];
    output = config._[1];
  } else if (typeof config.input === 'string') {
    input = config.input;
    if (typeof config.output === 'string') {
      output = config.output;
    }
  } else {
    throw new Error('You must specify input');
  }

  return {
    hardsub,
    extractFonts,
    audioTrack,
    subtitleTrack,
    videoTrack,
    startTime,
    ffmpegOptions,
    input,
    output,
  };
}

export {
  parse,
  defaults,
};
