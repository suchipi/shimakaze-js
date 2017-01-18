#!/usr/bin/env node
// @flow
import parseAndRun from './index';
import parseCliArgv from './parseCliArgv';

parseAndRun(parseCliArgv(process.argv)).catch((err) => {
  console.error(err); // eslint-disable-line no-console
  process.exit(-1);
});
