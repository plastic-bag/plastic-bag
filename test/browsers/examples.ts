'use strict';

import '@wdio/sync'
import * as assert from 'assert';
import 'mocha'

interface Test {
  example: string;
  setUp?: () => void;
}

const itBehavesLikeExample = (url: string) => (test: Test) => {
  const button = () => $(`${test.example} button`);

  describe(test.example, () => {
    before(() => {
      browser.url(url);
      if (test.setUp) {
        test.setUp();
      }
    });

    context('on start', () => {
      it(`shows only an example of ${test.example}`, () => {
        assert.equal($$(test.example).length, 1);
      });

      it('has a button with default state', () => {
        const classList = button().getAttribute('class');
        assert.equal(classList, 'button is-small');
      });
    });

    context('on click', () => {
      beforeEach(() => {
        button().click();
      });

      it('changes button to success', () => {
        const classList = button().getAttribute('class');
        assert.equal(classList, 'button is-small is-success');
      });
    });
  });
};

['/test/html/index.html', '/test/html/dynamic.html'].forEach(url => {
  describe('Examples -', () => {
    const itBehavesLikeBasicExample = itBehavesLikeExample(url);

    itBehavesLikeBasicExample({
      example: '#html-fragment-example',
    });
    itBehavesLikeBasicExample({
      example: '#script-example',
    });
    itBehavesLikeBasicExample({
      example: '#iframe-example',
      setUp: () => {
        const frame = $('iframe');
        browser.switchToFrame(frame);
      },
    });
  });
});

describe.only('With ShadowDOM', () => {
  it('adds a shadowRoot in plastic-bag element', () => {
    browser.url('/test/html/index.html');
    assert.notStrictEqual($('.with-shadow-dom plastic-bag').getAttribute('shadowRoot'), null);
  });
});
