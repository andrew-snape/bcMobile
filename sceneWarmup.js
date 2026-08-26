// Teacher warm-up screen — projected on a TV/screen for whole-class work.
// Teacher picks how many digits the target number should have, generates it,
// then either randomises a chosen number of broken keys or taps keys by hand
// to break/fix them.
var sceneWarmup = function(p) {
  var HEADER_H = 70;

  var keyDefs = [
    { label: '7' }, { label: '8' }, { label: '9' }, { label: '÷', op: true },
    { label: '4' }, { label: '5' }, { label: '6' }, { label: '×', op: true },
    { label: '1' }, { label: '2' }, { label: '3' }, { label: '−', op: true },
    { label: 'CE', special: 'ce' }, { label: '0' }, { label: '=', special: 'eq' }, { label: '+', op: true }
  ];

  var calcButtons = [];
  var calcInput;
  var broken = [];
  var editMode = false;
  var editToggleBtn;
  var instructionDiv;
  var targetDisplay;
  var digitBtns = [];
  var breakCountBtns = [];
  var selectedDigits = 2;
  var selectedBreakCount = 1;
  var target = null;

  p.preload = function() {
    myFont = p.loadFont("assets/GlacialIndifference-Regular.otf");
  };

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke();
    p.background('#eef1f7');
    p.noLoop();

    broken = keyDefs.map(function() { return false; });

    buildHeader();
    buildMain();
    generateTarget();
  };

  // ── Layout ────────────────────────────────────────────
  function buildHeader() {
    var header = p.createDiv('').addClass('warmup-header')
      .style('width', p.windowWidth + 'px')
      .style('height', HEADER_H + 'px');

    p.createSpan('📺 Teacher Warm-Up').addClass('warmup-title').parent(header);

    p.createButton('← Back')
      .addClass('btn-nav')
      .parent(header)
      .attribute('aria-label', 'Back to home')
      .touchStarted(back);
  }

  function buildMain() {
    var main = p.createDiv('').addClass('warmup-main')
      .style('width', p.windowWidth + 'px')
      .style('height', (p.windowHeight - HEADER_H) + 'px')
      .style('top', HEADER_H + 'px');

    buildLeftPanel(main);
    buildRightPanel(main);
  }

  function buildLeftPanel(main) {
    var left = p.createDiv('').addClass('warmup-panel-left').parent(main);

    p.createSpan('Target Number').addClass('warmup-panel-label').parent(left);

    var digitRow = p.createDiv('').addClass('warmup-select-row').parent(left);
    p.createSpan('Digits').addClass('warmup-select-caption').parent(digitRow);
    for (var d = 1; d <= 5; d++) {
      (function(n) {
        var btn = p.createButton(String(n))
          .addClass('warmup-select-btn')
          .parent(digitRow)
          .attribute('aria-label', n + ' digit number')
          .touchStarted(function() { selectDigits(n); });
        if (n === selectedDigits) btn.addClass('selected');
        digitBtns.push(btn);
      })(d);
    }

    targetDisplay = p.createDiv('–').addClass('warmup-target-display').parent(left);

    p.createButton('🎲 New Number')
      .addClass('warmup-action-btn')
      .parent(left)
      .attribute('aria-label', 'Generate a new target number')
      .touchStarted(generateTarget);
  }

  function buildRightPanel(main) {
    var right = p.createDiv('').addClass('warmup-panel-right').parent(main);

    var card = p.createDiv('').addClass('warmup-calc-card').parent(right);

    calcInput = p.createInput('')
      .addClass('warmup-calc-display')
      .attribute('readonly', '')
      .attribute('aria-label', 'calculator display')
      .parent(card);

    var grid = p.createDiv('').addClass('warmup-calc-grid').parent(card);

    keyDefs.forEach(function(def, idx) {
      var btn = p.createButton(def.label)
        .addClass('calc-btn')
        .parent(grid)
        .attribute('aria-label', def.label);
      if (def.op) btn.addClass('calc-btn-operator');
      if (def.special === 'ce') btn.addClass('calc-btn-ce');
      if (def.special === 'eq') btn.addClass('calc-btn-equals');

      if (def.special === 'ce') {
        btn.touchStarted(clearInput);
      } else if (def.special === 'eq') {
        btn.touchStarted(equals);
      } else {
        btn.touchStarted(function() { keyPressed(idx); });
      }
      calcButtons.push(btn);
    });

    var breakPanel = p.createDiv('').addClass('warmup-break-controls').parent(right);

    p.createSpan('Broken Keys').addClass('warmup-panel-label').parent(breakPanel);

    var countRow = p.createDiv('').addClass('warmup-select-row').parent(breakPanel);
    p.createSpan('Count').addClass('warmup-select-caption').parent(countRow);
    for (var c = 1; c <= 4; c++) {
      (function(n) {
        var btn = p.createButton(String(n))
          .addClass('warmup-select-btn')
          .parent(countRow)
          .attribute('aria-label', n + ' broken keys')
          .touchStarted(function() { selectBreakCount(n); });
        if (n === selectedBreakCount) btn.addClass('selected');
        breakCountBtns.push(btn);
      })(c);
    }

    var btnRow = p.createDiv('').addClass('warmup-break-btn-row').parent(breakPanel);

    p.createButton('🎲 Randomise Keys')
      .addClass('warmup-action-btn warmup-action-btn-small')
      .parent(btnRow)
      .attribute('aria-label', 'Randomly break keys')
      .touchStarted(randomizeBroken);

    p.createButton('↺ Reset Keys')
      .addClass('warmup-action-btn warmup-action-btn-small warmup-action-btn-secondary')
      .parent(btnRow)
      .attribute('aria-label', 'Fix all keys')
      .touchStarted(resetBroken);

    editToggleBtn = p.createButton('✏️ Edit Keys: Off')
      .addClass('warmup-action-btn warmup-action-btn-small warmup-action-btn-secondary')
      .parent(btnRow)
      .attribute('aria-label', 'Toggle manual key editing')
      .touchStarted(toggleEditMode);

    instructionDiv = p.createDiv('Tap a number or operator above to break or fix it.')
      .addClass('warmup-instruction')
      .parent(breakPanel)
      .style('display', 'none');
  }

  // ── Digit / break-count selection ────────────────────
  function selectDigits(n) {
    selectedDigits = n;
    digitBtns.forEach(function(btn, i) {
      if (i + 1 === n) btn.addClass('selected'); else btn.removeClass('selected');
    });
  }

  function selectBreakCount(n) {
    selectedBreakCount = n;
    breakCountBtns.forEach(function(btn, i) {
      if (i + 1 === n) btn.addClass('selected'); else btn.removeClass('selected');
    });
  }

  // ── Target number ─────────────────────────────────────
  function generateTarget() {
    var n = selectedDigits;
    if (n === 1) {
      target = Math.floor(Math.random() * 9) + 1;
    } else {
      var min = Math.pow(10, n - 1);
      var max = Math.pow(10, n) - 1;
      target = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    targetDisplay.html(target);
    calcInput.elt.classList.remove('warmup-correct');
  }

  // ── Calculator input ──────────────────────────────────
  function keyPressed(idx) {
    if (editMode) {
      toggleBroken(idx);
      return;
    }
    if (broken[idx]) return;
    var label = keyDefs[idx].label;
    var val = label === '÷' ? '/' : label === '×' ? '*' : label === '−' ? '-' : label;
    calcInput.value(calcInput.value() + val);
    calcInput.elt.classList.remove('warmup-correct');
  }

  function clearInput() {
    calcInput.value('');
    calcInput.elt.classList.remove('warmup-correct');
  }

  function equals() {
    var expr = calcInput.value();
    if (!expr) return;
    var value;
    try {
      value = eval(expr); // jshint ignore:line
    } catch (e) {
      shakeInput();
      return;
    }
    calcInput.value(value);
    if (target !== null && value == target) {
      calcInput.elt.classList.add('warmup-correct');
    } else {
      calcInput.elt.classList.remove('warmup-correct');
    }
  }

  function shakeInput() {
    var el = calcInput.elt;
    el.classList.remove('shake');
    void el.offsetWidth;
    el.classList.add('shake');
    el.addEventListener('animationend', function() {
      el.classList.remove('shake');
    }, { once: true });
  }

  // ── Broken keys ───────────────────────────────────────
  function toggleBroken(idx) {
    broken[idx] = !broken[idx];
    updateBrokenVisual(idx);
  }

  function updateBrokenVisual(idx) {
    var btn = calcButtons[idx];
    var def = keyDefs[idx];
    if (broken[idx]) {
      btn.addClass('calc-btn-broken').attribute('aria-disabled', 'true');
    } else {
      btn.removeClass('calc-btn-broken').attribute('aria-disabled', 'false');
      if (def.op) btn.addClass('calc-btn-operator');
    }
  }

  function randomizeBroken() {
    resetBroken();
    var breakable = [];
    keyDefs.forEach(function(def, idx) {
      if (!def.special) breakable.push(idx);
    });
    for (var j = breakable.length - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var tmp = breakable[j]; breakable[j] = breakable[k]; breakable[k] = tmp;
    }
    var count = Math.min(selectedBreakCount, breakable.length);
    for (var m = 0; m < count; m++) {
      broken[breakable[m]] = true;
      updateBrokenVisual(breakable[m]);
    }
  }

  function resetBroken() {
    keyDefs.forEach(function(def, idx) {
      broken[idx] = false;
      updateBrokenVisual(idx);
    });
  }

  function toggleEditMode() {
    editMode = !editMode;
    editToggleBtn.html(editMode ? '✏️ Edit Keys: On' : '✏️ Edit Keys: Off');
    if (editMode) {
      editToggleBtn.addClass('warmup-action-btn-active');
      instructionDiv.style('display', 'block');
    } else {
      editToggleBtn.removeClass('warmup-action-btn-active');
      instructionDiv.style('display', 'none');
    }
  }

  function back() {
    document.getElementById('warmupScreen').style.display = 'none';
    document.getElementById('homeScreen').style.display = 'block';
  }
};
