<script>
document.addEventListener('DOMContentLoaded', function(){
  // najdeme tlačítko podle data-testid
  var btn = document.querySelector('[data-testid="buttonCookiesAccept"]');
  if (btn) {
    btn.textContent = 'Rozumím';
  }
});
</script>
