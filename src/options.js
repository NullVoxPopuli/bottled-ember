// TODO: validate inputs?
import { cosmiconfig } from 'cosmiconfig';
/**
  * Local Alias:
  * @typedef {import('./types').Options} Options
  */

/** @type { Options } */
const DEFAULTS = {
  emberVersion: '4.8',
  cacheName: 'default',
  deps: {},
  links: [],
  /**
   * TODO: instead/and/or?, check for existence of matching folders?
   */
  noOverlay: false,
  templateOverlay: '',
  outputPath: null,
  port: null,
  environment: null,
};

/**
  * Merged version of all the Options prioritizing:
  *  - Defaults
  *  - Config overrides
  *  - Args passed to the CLI override everything
  *
  * @return {Promise<Options>}
  */
export async function resolveOptions(argv) {
  const explorer = cosmiconfig('buttered-ember');
  const fromArgs = parseArgs(argv);
  const result = await explorer.search();

  return {
    ...DEFAULTS,
    ...result?.config,
    ...fromArgs,
  };
}

/**
  * Normalize the args from argv to the shape of Options
  *
  * @return {Partial<Options>}
  */
export function parseArgs(argv) {
  let fromArgs = {};

  if (argv.emberVersion) fromArgs.emberVersion = argv.emberVersion;
  if (argv.environment) fromArgs.environment = argv.environment;
  if (argv['cache-name']) fromArgs.cacheName = argv['cache-name'];
  if (argv['no-overlay']) fromArgs.noOverlay = argv['no-overlay'];
  if (argv['output-path']) fromArgs.outputPath = argv['output-path'];
  if (argv.p) fromArgs.port = argv.p;
  if (argv.deps) fromArgs.deps = argv.deps.split(',');
  if (argv.links) fromArgs.links = argv.links.split(',');

  return fromArgs;
}
