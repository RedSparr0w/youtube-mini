window.addEventListener("keypress", ({key}) => {
  const el = document.getElementsByTagName('video')[0];
  switch(key){
    case '+':
    case '=':
      el.volume = el.volume >= 0.95 ? 1 : +el.volume.toFixed(2) + 0.05;
      break;
    case '-':
      el.volume = el.volume <= 0.05 ? 0 : +el.volume.toFixed(2) - 0.05;
      break;
    default:
      return;
  }
});
