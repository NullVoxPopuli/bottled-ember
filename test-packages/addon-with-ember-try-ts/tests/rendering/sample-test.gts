import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

import { hash } from '@ember/helper';

import { two } from '@nullvoxpopuli/addon-with-ember-try-ts';

module('Rendering | Sample', function (hooks) {
  setupRenderingTest(hooks);

  test('it works', async function (assert) {
    assert.ok(hash);

    await render(<template>
      Hello there! {{two}}
    </template>);

    assert.dom().containsText('Hello there! 2');
  });
});
