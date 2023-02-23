import path from 'node:path';

import { describe, it } from 'vitest';

import { expectNoErrorWithin, findEmberTry, overrideFile, run } from './utils.js';

let fixtures = await findEmberTry();

describe('Addon mode', () => {
  for (let fixture of fixtures) {
    it(`${fixture} try:each`, async ({ expect }) => {
      let { exitCode, stderr, stdout } = await run('try:each', {
        onTestPackage: fixture,
        args: ['--addon', '--cacheName', `${fixture}--try-each`],
        prepare: async (workingDirectory) => {
          await overrideFile('ember-try.js', path.join(workingDirectory, 'config'));
        },
      });

      stdout ||= (stderr as any).stdout;

      expectNoErrorWithin(expect, stderr);

      expect(exitCode).toBe(0);
      expect(stdout).toContain('Scenario ember-4.8: SUCCESS');
      expect(stdout).toContain('Scenario ember-release: SUCCESS');
      expect(stdout).toContain('Scenario ember-release + embroider-optimized: SUCCESS');
    });

    it(`${fixture} try:one`, async ({ expect }) => {
      let result = await run('try:one', {
        onTestPackage: fixture,
        args: ['ember-4.8', '--addon', '--cacheName', `${fixture}--try-one`],
      });

      let { exitCode, stderr, stdout } = result;

      expectNoErrorWithin(expect, stderr);

      expect(exitCode).toBe(0);
      expect(stdout).toContain('Scenario ember-4.8: SUCCESS');
    });
  }
});
