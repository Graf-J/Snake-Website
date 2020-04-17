var button = document.getElementById('button');
var reset = document.getElementById('test');
var count = document.getElementById('count');

button.addEventListener('click', () => {
  count.innerHTML++;
})

reset.addEventListener('click', () => {
  count.innerHTML = 0;
})
