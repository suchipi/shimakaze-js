// @flow
import path from 'path';

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
  outputType: 'none' | 'rtmp' | 'file',
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
  if (Array.isArray(config._)) {
    input = config._[0];
  } else if (typeof config.input === 'string') {
    input = config.input;
  } else {
    throw new Error('Invalid input config value provided');
  }
  input = path.resolve(input);

  let output;
  if (Array.isArray(config._)) {
    output = config._[1];
  } else if (typeof config.output === 'string') {
    output = config.output;
  }

  let outputType;
  if (extractFonts && !hardsub) {
    outputType = 'none';
  } else if (typeof output === 'string' && (output.startsWith('rtmp') || output.startsWith('RTMP'))) {
    outputType = 'rtmp';
  } else {
    outputType = 'file';
  }

  if (outputType === 'file' && typeof output === 'string') {
    output = path.resolve(output);
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
    outputType,
  };
}

export {
  parse,
  defaults,
};
