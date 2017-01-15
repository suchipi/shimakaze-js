// @flow
// import temp from 'temp';
import { parse } from './config';
import type { InputConfig, Config } from './config';
// import determineOutputType from './determineOutputType';

// temp.track();

function run(config: Config) {
  // const outputType = determineOutputType(config);

  console.log(config); // eslint-disable-line no-console
}

module.exports = function parseAndRun(config: InputConfig) {
  run(parse(config));
};
