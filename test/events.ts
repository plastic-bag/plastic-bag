'use strict';

import * as assert from 'assert';

const strategies = ['html-fragment', 'script', 'iframe'];

describe('Events', () => {
  describe('loaded', () => {
    beforeEach(() => {
      browser.url('/test/html/events/loaded.html');
    });

    strategies.forEach(strategy => {
      it('renders loaded message after event has been dispatched', () => {
        const messagesSelector = `#loaded-messages`;

        assert(new RegExp(strategy).test(browser.getText(messagesSelector)));
      });

      it('does not render error message', () => {
        const messagesSelector = `#error-messages`;

        assert(!new RegExp(strategy).test(browser.getText(messagesSelector)));
      });
    });
  });

  describe('error', () => {
    beforeEach(() => {
      browser.url('/test/html/events/error.html');
    });

    strategies.forEach(strategy => {
      context(strategy, () => {
        it('renders error message after event has been dispatched', () => {
          const messagesSelector = `#error-messages`;

          assert(new RegExp(strategy).test(browser.getText(messagesSelector)));
        });

        it('does not render loaded message', () => {
          const messagesSelector = `#loaded-messages`;

          assert(!new RegExp(strategy).test(browser.getText(messagesSelector)));
        });
      })
    });
  });
});
