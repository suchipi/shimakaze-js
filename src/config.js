// @flow
import path from 'path';

export type InputConfig = {
  audioTrack?: number,
  subtitleTrack?: number,
  videoTrack?: number,
  hardsub?: boolean,
  extractFonts?: boolean,
  startTime?: number,
  input: string,
  output?: string,
};

export type Config = InputConfig & {
  outputType: 'none' | 'rtmp' | 'file',
};

const defaults = {
  audioTrack: 0,
  subtitleTrack: 0,
  videoTrack: 0,
  hardsub: false,
  extractFonts: false,
  startTime: 0,
};

function parse(config: InputConfig): Config {
  const {
    hardsub = defaults.hardsub,
    audioTrack = defaults.audioTrack,
    subtitleTrack = defaults.subtitleTrack,
    videoTrack = defaults.videoTrack,
    startTime = defaults.startTime,
  } = config;

  let {
    extractFonts,
    input,
    output,
  } = config;

  if (hardsub && extractFonts == null) {
    extractFonts = true;
  }

  if (extractFonts == null) {
    extractFonts = false;
  }

  if (typeof input !== 'string') {
    throw new Error('Invalid input config value provided');
  }
  input = path.resolve(input);

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
    input,
    output,
    outputType,
  };
}

export {
  parse,
  defaults,
};
