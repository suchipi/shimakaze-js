"use strict";
const defaults = {
  audioTrack: 0,
  subtitleTrack: 0,
  videoTrack: 0,
  hardsub: false,
  extractFonts: false,
  ffmpegOptions: "",
  startTime: 0,
};

function parse(config) {
  let hardsub = config.hardsub;
  let extractFonts = config.hardsub || config.extractFonts;
  let audioTrack = config.audioTrack;
  let subtitleTrack = config.subtitleTrack;
  let videoTrack = config.videoTrack;
  let startTime = config.startTime;
  let ffmpegOptions = config.ffmpegOptions;

  if (hardsub == null) hardsub = defaults.hardsub;
  if (extractFonts == null) extractFonts = defaults.extractFonts;
  if (audioTrack == null) audioTrack = defaults.audioTrack;
  if (subtitleTrack == null) subtitleTrack = defaults.subtitleTrack;
  if (videoTrack == null) videoTrack = defaults.videoTrack;
  if (startTime == null) startTime = defaults.startTime;
  if (ffmpegOptions == null) ffmpegOptions = defaults.ffmpegOptions;

  let input;
  let output;

  if (Array.isArray(config._)) {
    input = config._[0];
    output = config._[1];
  } else {
    input = config.input;
    output = config.output;
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

module.exports = {
  parse,
  defaults,
};