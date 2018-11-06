'use strict';

import * as assert from 'assert';

const itBehavesLikeExample = (url: string) => (example: string) => {
  describe(example, () => {
    beforeEach(() => {
      browser.url(url);
    })

    it('renders message after event loaded has been dispatched', () => {
      browser.waitUntil(() => browser.getText('#messages') !== '');

      assert(new RegExp(example).test(browser.getText('#messages')));
    });
  });
};

['/test/html/events/success.html'].forEach(url => {
  describe(`Events - ${url}`, () => {
    const itBehavesLikeBasicExample = itBehavesLikeExample(url);

    itBehavesLikeBasicExample('html-fragment');
    itBehavesLikeBasicExample('script');
    itBehavesLikeBasicExample('iframe');
  });
});
