import { describe, expect, it } from 'vitest';

import { resolveOptions } from '../src/options.js';

import type { Args } from '../src/types.js';

describe('resloveOptions', () => {
  it('basically nothing', async () => {
    const input: Args = {
      emberVersion: '4.10',
      environment: 'development',
      cacheName: 'test',
      localFiles: './',
      reLayer: false,
      force: false,
      command: 'test',
      name: 'test-app',
      addon: false,
    };

    let result = await resolveOptions(input);

    expect(result).toMatchObject(input);
  });
});
