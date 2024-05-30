document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('myButton');
  var messageDiv = document.getElementById('message');

  button.addEventListener('click', function() {
      messageDiv.textContent = 'Button wurde geklickt!';
  });
});
