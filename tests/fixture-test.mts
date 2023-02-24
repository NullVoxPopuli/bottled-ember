import path from 'node:path';

import fse from 'fs-extra';
import { describe, it } from 'vitest';

import { expectNoErrorWithin, findFixtures, fixturesFolder, run } from './utils.js';

let fixtures = await findFixtures();

describe('Overlaying a whole project', () => {
  for (let fixture of fixtures) {
    it(fixture, async ({ expect }) => {
      let { exitCode, stderr, stdout } = await run('test', {
        onFixture: fixture,
        args: ['--cacheName', `${fixture}--test`],
      });

      if (stderr) {
        console.error(stderr);
      }

      const dist = path.join(fixturesFolder, fixture, 'dist');

      expect(exitCode).toBe(0);
      expectNoErrorWithin(expect, stderr || stdout);
      expect(fse.existsSync(dist), 'default output directory was created').toBe(true);
    });
  }
});
