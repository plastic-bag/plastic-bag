'use strict';

import * as assert from 'assert';

const strategies = ['html-fragment', 'script', 'iframe'];

describe('Events', () => {
  describe('loaded', () => {
    beforeEach(() => {
      browser.url('/test/html/events/loaded.html');
    });

    strategies.forEach(strategy => {
      it(`renders message after event has been dispatched`, () => {
        const messagesSelector = `#loaded-messages`;

        assert(new RegExp(strategy).test(browser.getText(messagesSelector)));
      });
    });
  });
});
