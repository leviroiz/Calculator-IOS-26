let expr = '';  // "expr" = uma string vazia que guardará o número digitado
justCalc = false;

function updateDisplay(e, r){ // função de update display em q "e" é a expressão e "r" o resultado
    document.getElementById('expr').textContent = e; // mostra a expressão digitada
    const el /* guarda o elemento */ = document.getElementById('res'); // mostra o resultado
    el.textContent = r; // usa o elemento logo em seguida 


// Ajustes visuais
  if (r.length > 9) el.style.fontSize = '40px';
  else if (r.length > 6) el.style.fontSize = '56px';
  else el.style.fontSize = '';
}

// Backspace
function deleteLast() {
  expr = expr.slice(0, -1);
  updateDisplay('', expr || '0');
}

// Numeros
function num(n) {
  if (justCalc) { expr = ''; justCalc = false; }
  expr += n; /*numero digitado no final da expressão*/
  updateDisplay('', expr); /*atualiza o display com a expressão atual*/
}

// Operações (*, /, +, -)
function op(o) {
  justCalc = false;
  if (!expr && o !== '-') return;
  if (['+', '-', '*', '/'].includes(expr.slice(-1))) { /*evita "3++5" ou "3+*5"*/
    expr = expr.slice(0, -1);
  }
  expr += o;
  updateDisplay(expr, document.getElementById('res').textContent);
}

// Ponto decimal
function dot() {
  if (justCalc) { expr = '0'; justCalc = false; }
  const parts = expr.split(/[\+\-\*\/]/);
  if (parts[parts.length - 1].includes('.')) return;
  if (!parts[parts.length - 1]) expr += '0';
  expr += '.';
  updateDisplay('', expr);
}

// Função AC
function clearAll() {
  expr = '';
  justCalc = false;
  updateDisplay('', '0');
}

// Função inverte
function toggleSign() {
  if (!expr) return;
  expr = expr.startsWith('-') ? expr.slice(1) : '-' + expr;
  updateDisplay('', expr);
}

// Porcentagem
function percent() {
  if (!expr) return;
  try {
    const v = Function('"use strict"; return (' + expr + ')')();
    expr = String(parseFloat((v / 100).toFixed(10)));
    updateDisplay('', expr);
  } catch {}
}

// Função "="
function calc() {
  if (!expr) return;
  try {
    const r = Function('"use strict"; return (' + expr + ')')();
    const fmt = parseFloat(r.toFixed(10)).toString();
    updateDisplay(expr + ' =', fmt);
    expr = fmt;
    justCalc = true;
  } catch {
    updateDisplay(expr, 'Erro');
    expr = '';
  }
}

// Suporte ao teclado
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') num(e.key);
  else if (e.key === '+') op('+');
  else if (e.key === '-') op('-');
  else if (e.key === '') op('');
  else if (e.key === '/') { e.preventDefault(); op('/'); }
  else if (e.key === '%') percent();
  else if (e.key === '.') dot();
  else if (e.key === 'Enter' || e.key === '=') calc();
  else if (e.key === 'Backspace') {
    expr = expr.slice(0, -1);
    updateDisplay('', expr || '0');
  }
  else if (e.key === 'Escape') clearAll();
});

// Efeito click
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.add('pressed');
    setTimeout(() => btn.classList.remove('pressed'), 150);
  });
});