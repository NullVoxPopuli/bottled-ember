import path from 'node:path';

import { execa } from 'execa';
import { describe, expect, it } from 'vitest';

import { testPackagesFolder } from './utils.js';

// Who tests the tests? This file.
describe('Ensure the test packages / fixtures are set up properly', () => {
  it('Projects using Glint have no type errors', async () => {
    const projectPath = path.join(testPackagesFolder, 'addon-with-ember-try-ts');

    let result = await execa('glint', { cwd: projectPath });

    expect(result.exitCode).toBe(0);
  });
});
