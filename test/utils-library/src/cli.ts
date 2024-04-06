#!/usr/bin/env node

import { myMerge } from '.';

const o = myMerge({ a: 1, b: 1 }, { b: 2, c: 2 });

console.log(JSON.stringify(o, null, 2));
