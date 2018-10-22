(function() {
  var title = 'Script Tag Example';
  var id = 'script-example';
  var content =
    '<article id="script-example" class="message is-success">' +
    '<div class="message-header">Script Tag Example</div>' +
    '<div class="message-body">' +
    'When it is loaded, its code adds its content to the <em>div</em> with <em>id</em> "script-example-wrapper",' +
    'replace the "Loading..." message and setting a event in this <button class="button is-small">button</button>' +
    'to change its own color to green.' +
    '</div>' +
    '</article>';

  var example = document.getElementById(id + '-wrapper');
  example.innerHTML = content;

  var button = example.getElementsByTagName('button')[0];
  button.addEventListener('click', function() {
    button.classList.toggle('is-success');
  });
})();
