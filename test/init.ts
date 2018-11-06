'use strict';

import * as assert from 'assert';

interface Test {
  example: string;
  setUp?: () => void;
}

const itBehavesLikeExample = (url: string) => (test: Test) => {
  const button = () => $(test.example).element('button');

  describe(test.example, () => {
    before(() => {
      browser.url(url);
      if (test.setUp) {
        test.setUp();
      }
    });

    context('on start', () => {
      it(`shows only an example of ${test.example}`, () => {
        assert.equal(browser.elements(test.example).value.length, 1);
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

['/test/html/basic/static.html', '/test/html/basic/dynamic.html'].forEach(url => {
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
        const frame = $('iframe').value;
        browser.frame(frame);
      },
    });
  });
});
