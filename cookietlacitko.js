<script>
(function(){
  function přepniText(){
    var btn = document.querySelector('[data-testid="buttonCookiesAccept"]');
    if (btn) {
      btn.textContent = 'Rozumím';
      // jednou stačí, tak doběhneme
    } else {
      // pokud ho ještě nemáme, zkusíme za 200 ms znovu
      setTimeout(přepniText, 200);
    }
  }
  // Spustíme buď hned, nebo po DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', přepniText);
  } else {
    přepniText();
  }
})();
</script>
