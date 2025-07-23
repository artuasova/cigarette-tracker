const countEl = document.getElementById('count');
const btn = document.getElementById('btn');
const dateEl = document.getElementById('date');

function todayKey() {
  return 'cigCount_' + new Date().toISOString().split('T')[0];
}

function load() {
  const key = todayKey();
  countEl.textContent = localStorage.getItem(key) || 0;
  dateEl.textContent = 'Дата: ' + key.split('_')[1];
}

btn.addEventListener('click', () => {
  const key = todayKey();
  let c = parseInt(localStorage.getItem(key)) || 0;
  localStorage.setItem(key, ++c);
  countEl.textContent = c;
});

load();
