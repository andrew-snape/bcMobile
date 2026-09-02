
var sceneCalculator = function(p) {
  p.calcButtons = [];
  p.calcInput;
  p.brokenKeys = ['7', '8'];
  p.level = 1;
  p.target = 2;
  p.extraKeys = [];     // e.g. ['.'], ['(',')','±'], ['(',')','^','√'] — Challenge Pack levels only
  p.storageKey = null;  // overrides the default 'level' + p.level localStorage key
  p.levelLabel = null;  // overrides the default 'Level ' + p.level topbar text
  p.onComplete = null;  // called instead of the legacy changeLevels() chain on a 3-star win
  p.backTarget = null;  // overrides the default 'levelsScreen' Back destination
  var backButton;
  p.score = 0;
  p.moveHistory = [];

  // Persistent containers (built once, contents rebuilt per level)
  var wrapDiv;
  var levelTargetSpan;
  var scoreDiv;
  var displayWrap;
  var gridWrap;
  var keyButtons = {}; // canonical key -> button, rebuilt per level

  p.clearMoveHistory = function() {
    p.moveHistory = [];
  };

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background('#1c1c1e');
    p.noStroke();

    buildLayout();
    p.makeCalcButtons();
    p.makeBrokenKeys();
    buildCongratsHandler();
  };

  p.draw = function() {
    p.background('#1c1c1e');

    if (levelTargetSpan) {
      levelTargetSpan.html((p.levelLabel || ('Level ' + p.level)) + ' &nbsp;·&nbsp; Target: <strong>' + p.target + '</strong>');
    }
    updateScoreBar();
  };

  // ── Layout shell (built once) ─────────────────────────
  function buildLayout() {
    wrapDiv = p.createDiv('').addClass('phone-calc-wrap');

    var topbar = p.createDiv('').addClass('phone-calc-topbar').parent(wrapDiv);

    backButton = p.createButton('← Back')
      .addClass('phone-calc-back')
      .parent(topbar)
      .attribute('aria-label', 'Back to level select')
      .touchStarted(back);

    levelTargetSpan = p.createSpan('').addClass('phone-calc-level').parent(topbar);

    scoreDiv = p.createDiv('').addClass('phone-calc-stars').parent(topbar);

    displayWrap = p.createDiv('').addClass('phone-calc-display-wrap').parent(wrapDiv);
    gridWrap = p.createDiv('').addClass('phone-calc-grid').parent(wrapDiv);

    updateScoreBar();
  }

  function updateScoreBar() {
    if (!scoreDiv) return;
    var html = '';
    for (var i = 0; i < 3; i++) {
      var cls = i < p.score ? 'score-star earned' : 'score-star';
      html += '<span class="' + cls + '" aria-label="' + (i < p.score ? 'star earned' : 'star not yet earned') + '">★</span>';
    }
    scoreDiv.html(html);
  }

  // Extra keys available to Challenge Pack levels, keyed by the same
  // canonical string used in brokenKeys. `evalValue` is what actually gets
  // appended to the (eval-safe) input — '^' becomes JS '**', '√' opens a
  // 'Math.sqrt(' call — everything else is used to reuse phone-calc-btn styling.
  var EXTRA_KEY_DEFS = {
    '.': { label: '.', evalValue: '.', aria: 'decimal point' },
    '(': { label: '(', evalValue: '(', aria: 'open bracket' },
    ')': { label: ')', evalValue: ')', aria: 'close bracket' },
    '±': { label: '±', fn: true, aria: 'toggle sign', negate: true },
    '^': { label: '^', evalValue: '**', op: true, aria: 'power' },
    '√': { label: '√', evalValue: 'Math.sqrt(', op: true, aria: 'square root' }
  };

  // ── Calculator buttons (rebuilt per level) ────────────
  p.makeCalcButtons = function() {
    displayWrap.html('');
    gridWrap.html('');
    keyButtons = {};

    // Display input
    p.calcButtons.push(
      p.calcInput = p.createInput('')
        .addClass('phone-calc-display')
        .attribute('aria-label', 'calculator display')
        .attribute('readonly', '')
        .parent(displayWrap)
    );

    var keyDefs = [
      { label: '7', key: '7' }, { label: '8', key: '8' }, { label: '9', key: '9' }, { label: '÷', key: '/', evalValue: '/', op: true, aria: 'divide' },
      { label: '4', key: '4' }, { label: '5', key: '5' }, { label: '6', key: '6' }, { label: '×', key: '*', evalValue: '*', op: true, aria: 'multiply' },
      { label: '1', key: '1' }, { label: '2', key: '2' }, { label: '3', key: '3' }, { label: '−', key: '-', evalValue: '-', op: true, aria: 'minus' },
      { label: 'CE', key: 'CE', fn: true, aria: 'clear' }, { label: '0', key: '0' }, { label: '=', key: '=', eq: true, aria: 'equals' }, { label: '+', key: '+', evalValue: '+', op: true, aria: 'plus' }
    ];

    (p.extraKeys || []).forEach(function(k) {
      var def = EXTRA_KEY_DEFS[k];
      if (def) keyDefs.push(Object.assign({ key: k }, def));
    });

    keyDefs.forEach(function(def) {
      if (def.evalValue === undefined && def.key !== 'CE' && def.key !== '=' && !def.negate) {
        def.evalValue = def.key; // digits, plain symbols: append themselves
      }

      var btn = p.createButton(def.label)
        .addClass('phone-calc-btn')
        .parent(gridWrap)
        .attribute('aria-label', def.aria || def.label);
      if (def.op || def.eq) btn.addClass('phone-calc-btn-op');
      if (def.fn) btn.addClass('phone-calc-btn-fn');

      if (def.eq) {
        btn.mousePressed(equals);
      } else if (def.key === 'CE') {
        btn.mousePressed(zeroed);
      } else if (def.negate) {
        btn.mousePressed(negate);
      } else {
        btn.mousePressed(appendValue(def.evalValue));
      }

      p.calcButtons.push(btn);
      keyButtons[def.key] = btn;
    });
  };

  function appendValue(val) {
    return function() {
      p.calcInput.value(p.calcInput.value() + val);
    };
  }

  // '±' only starts a new negative number (input empty, or right after an
  // operator/open-bracket) rather than toggling the sign of whatever's
  // already typed — enough to let players write e.g. "6+-3" when the
  // '-' key itself is broken, without the ambiguity of guessing whether a
  // trailing '-' already in the string is an operator or a sign.
  function negate() {
    var v = p.calcInput.value();
    if (v === '' || /[+\-*/^(]$/.test(v)) {
      p.calcInput.value(v + '-');
    }
  }

  function zeroed() {
    p.calcInput.value('');
  }

  function equals() {
    var expr = p.calcInput.value();
    var value;
    try {
      value = eval(expr); // jshint ignore:line
    } catch(e) {
      shakeInput();
      return;
    }
    if (value == p.target && p.moveHistory.indexOf(expr) === -1) {
      p.score += 1;
      p.moveHistory.push(expr);
      zeroed();
      updateScoreBar();
      if (p.score === 3) {
        localStorage.setItem(p.storageKey || ('level' + p.level), true);
        showCongrats();
      }
    } else {
      p.calcInput.value(value);
      shakeInput();
    }
  }

  function shakeInput() {
    var el = p.calcInput.elt;
    el.classList.remove('shake');
    // Force reflow so re-adding the class triggers animation
    void el.offsetWidth;
    el.classList.add('shake');
    el.addEventListener('animationend', function() {
      el.classList.remove('shake');
    }, { once: true });
  }

  function donothing() {}

  // ── Broken keys ──────────────────────────────────────
  p.makeBrokenKeys = function() {
    Object.keys(keyButtons).forEach(function(k) {
      if (k === 'CE' || k === '=') return; // never breakable
      if (p.brokenKeys.indexOf(k) !== -1) {
        keyButtons[k]
          .removeClass('phone-calc-btn-op')
          .removeClass('phone-calc-btn-fn')
          .addClass('phone-calc-btn-broken')
          .attribute('aria-label', k + ' – broken key, unavailable')
          .attribute('aria-disabled', 'true')
          .attribute('disabled', '')
          .mousePressed(donothing);
      }
    });
  };

  // ── Congrats overlay ─────────────────────────────────
  function buildCongratsHandler() {
    var btn = document.getElementById('congratsContinue');
    if (btn) {
      btn.addEventListener('click', hideCongrats);
      btn.addEventListener('touchstart', hideCongrats, { passive: true });
    }
  }

  function showCongrats() {
    var overlay = document.getElementById('congratsOverlay');
    if (overlay) overlay.classList.add('active');
  }

  function hideCongrats() {
    var overlay = document.getElementById('congratsOverlay');
    if (overlay) overlay.classList.remove('active');
    if (p.onComplete) {
      p.onComplete();
    } else {
      changeLevels();
    }
  }

  // ── Auto advance ─────────────────────────────────────
  function changeLevels() {
    var next = p.level < 35 ? p.level + 1 : 35;
    if (p.level === 35) { level35(); return; }
    var fns = [null,level1,level2,level3,level4,level5,level6,level7,level8,level9,level10,
               level11,level12,level13,level14,level15,level16,level17,level18,level19,level20,
               level21,level22,level23,level24,level25,level26,level27,level28,level29,level30,
               level31,level32,level33,level34,level35];
    if (fns[next]) fns[next]();
  }

  function back() {
    document.getElementById(p.backTarget || 'levelsScreen').style.display = 'block';
    document.getElementById('calculatorScreen').style.display = 'none';
  }
};
