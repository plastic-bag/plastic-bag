document.addEventListener('DOMContentLoaded', function() {
  const elements = document.querySelectorAll('plastic-bag');
  elements.forEach(function(element) {
    element.addEventListener('loaded', function(event) {
      const message = document.createElement('li');
      message.innerHTML = element.type;
      document.getElementById('loaded-messages').appendChild(message);
    });
  });
});
