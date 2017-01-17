#!/usr/bin/env node
// @flow

import run from './index';
import parseCliArgv from './parseCliArgv';

run(parseCliArgv(process.argv));
