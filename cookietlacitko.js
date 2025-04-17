<script>
(function(){
  var tries = 0;
  var interval = setInterval(function(){
    var btn = document.querySelector('[data-testid="buttonCookiesAccept"]');
    if (btn) {
      btn.textContent = 'Rozumím';
      clearInterval(interval);
    } else if (++tries > 100) {
      clearInterval(interval);
      console.warn('Cookie button not found after 100 tries');
    }
  }, 150);
})();
</script>
