'use strict';

export async function runInNextTick(f: Function) {
  await f();
}
