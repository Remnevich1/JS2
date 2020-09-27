const textEl = document.querySelector('.text');
let text = textEl.textContent;
text = text.replace(/\s'/g, ' "');
text = text.replace(/'\s/g, "\"\n");
textEl.textContent = text;
