var assert = require('assert');

describe('Examples', () => {
  before(() => {
    browser.url('/test/html/index.html');
  });
  const itBehavesLikeBasicExample = ({ setUp, example }) => {
    const button = () => $(example).element('button');

    describe(`example ${example}`, () => {
      before(() => {
        setUp && setUp();
      });

      context('on start', () => {
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
