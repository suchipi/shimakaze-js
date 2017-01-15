// @flow
import type { Config } from './config';

export type OutputType = 'none' | 'rtmp' | 'file';

export default function determineOutputType(config: Config): OutputType {
  const {
    extractFonts,
    hardsub,
    input,
  } = config;

  if (extractFonts && !hardsub) {
    return 'none';
  } else if (input.startsWith('rtmp') || input.startsWith('RTMP')) {
    return 'rtmp';
  }

  return 'file';
}
