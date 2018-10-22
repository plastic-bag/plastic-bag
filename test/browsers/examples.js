var assert = require('assert');

const itBehavesLikeExample = url => ({ setUp, example }) => {
  const button = () => $(example).element('button');

  describe(example, () => {
    before(() => {
      browser.url(url);
      setUp && setUp();
    });

    context('on start', () => {
      it(`shows only an example of ${example}`, () => {
        assert.equal(browser.elements(example).value.length, 1);
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
        const frame = $('iframe').value;
        browser.frame(frame);
      },
    });
  });
});
