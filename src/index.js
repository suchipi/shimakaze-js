// @flow
import temp from 'temp';
import pify from 'pify';
import path from 'path';
import mkdirp from 'mkdirp';
import { parse } from './config';
import type { InputConfig, Config } from './config';
import exec from './exec';

temp.track();

function sequenceArray(count: number) {
  return new Array(count).fill().map((_, i) => i + 1);
}

async function extractFonts(tmpDirPath, input) {
  const mkvInfo = await exec(`mkvinfo ${input}`);
  const fontCount = (mkvInfo.stdout.match(/Attached/g) || []).length;
  if (fontCount === 0) { return; }
  const fontsPath = path.join(tmpDirPath, 'fonts');
  await pify(mkdirp)(fontsPath);
  await exec(`mkvextract attachments ${input} ${sequenceArray(35).join(' ')}`, { cwd: fontsPath });
}

async function run(config: Config) {
  const tmpDirPath = await pify(temp.mkdir)('shimakaze-js');
  await extractFonts(tmpDirPath, config.input);
}

module.exports = function parseAndRun(config: InputConfig) {
  return run(parse(config));
};
