document.addEventListener('DOMContentLoaded', function() {
  var breadcrumb = document.querySelector('.breadcrumb');
  if (breadcrumb) {
    var text = breadcrumb.textContent.toLowerCase();

    // Nejprve odebereme případné staré třídy
    document.body.classList.remove('in-rozbalene', 'in-pouzite-2', 'in-nove');

    if (text.includes('mobilní telefony')) {
      if (text.includes('zánovní')) {
        document.body.classList.add('in-rozbalene');
      } else if (text.includes('použité')) {
        document.body.classList.add('in-pouzite-2');
      } else {
        document.body.classList.add('in-nove');
      }
    }
  }
});