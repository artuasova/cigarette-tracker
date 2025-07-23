const countEl = document.getElementById('count');
const btn = document.getElementById('btn');
const resetBtn = document.getElementById('reset');
const dateEl = document.getElementById('date');

function todayKey() {
  return 'cigCount_' + new Date().toISOString().split('T')[0];
}

function load() {
  const key = todayKey();
  countEl.textContent = localStorage.getItem(key) || '0';
  dateEl.textContent = 'Дата: ' + key.split('_')[1];
}

btn.addEventListener('click', () => {
  const key = todayKey();
  let c = parseInt(localStorage.getItem(key)) || 0;
  localStorage.setItem(key, ++c);
  countEl.textContent = c;
});

resetBtn.addEventListener('click', () => {
  if (confirm('Сбросить счётчик за сегодня?')) {
    const key = todayKey();
    localStorage.setItem(key, 0);
    countEl.textContent = '0';
  }
});

load();
