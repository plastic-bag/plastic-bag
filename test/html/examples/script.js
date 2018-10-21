(function() {
  var title = 'Script Tag Example';
  var id = 'script-example';
  var template = `
        <article id="html-fragment-example" class="message is-success">
            <div class="message-header">
                ${title}
            </div>
            <div class="message-body">
                When it is loaded, its code adds its content to the <em>div</em> with <em>id</em> "${id}",
                replace the "Loading..." message and setting a event in this <button class="button is-small">button</button>
                to change its own color to green.
            </div>
        </article>
    `;

  var example = document.getElementById('script-example');
  example.innerHTML = template;

  var button = example.getElementsByTagName('button')[0];
  button.addEventListener('click', function() {
    button.classList.toggle('is-success');
  });
})();
