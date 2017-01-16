// @flow
import temp from 'temp';
import { parse } from './config';
import type { InputConfig, Config } from './config';

temp.track();

function run(config: Config) {
  console.log(config); // eslint-disable-line no-console
}

module.exports = function parseAndRun(config: InputConfig) {
  run(parse(config));
};
