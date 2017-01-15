#!/usr/bin/env node
// @flow

import { defaults } from './config';
import run from './index';

const argv = require('yargs')
  .usage('shimakaze input [options] output')
  .demandCommand(2) // input, output

  .describe('audio-track', 'Specify the audio track to use')
  .default('audio-track', defaults.audioTrack)
  .alias('a', 'audio-track')

  .describe('subtitle-track', 'Specify the subtitle track to use')
  .default('subtitle-track', defaults.subtitleTrack)
  .alias('s', 'subtitle-track')

  .describe('video-track', 'Specify the video track to use')
  .default('video-track', defaults.videoTrack)
  .alias('v', 'video-track')

  .describe('hardsub', 'Hardsub the video')
  .boolean('hardsub')
  .default('hardsub', defaults.hardsub)
  .alias('h', 'hardsub')

  .describe('extract-fonts', 'Extract the fonts from the video into ~/.fonts. This will automatically occur when hardsubbing')
  .boolean('extract-fonts')
  .default('extract-fonts', defaults.extractFonts)

  .describe('ffmpeg-options', 'Additional ffmpeg options to pass in. They will be added to the end so you can override whatever you like')
  .default('ffmpeg-options', defaults.ffmpegOptions)

  .describe('start-time', 'Start video at a certain time, in seconds')
  .default('start-time', defaults.startTime)
  .alias('t', 'start-time')

  .argv;

run(argv);
