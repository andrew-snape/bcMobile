
var sceneCalculator = function(p) {
  p.calcButtons = [];
  p.calcInput;
  p.brokenKeys = ['7', '8'];
  p.level = 1;
  p.target = 2;
  var backButton;
  p.score = 0;
  p.moveHistory = [];

  // Persistent containers (built once, contents rebuilt per level)
  var wrapDiv;
  var levelTargetSpan;
  var scoreDiv;
  var displayWrap;
  var gridWrap;

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
      levelTargetSpan.html('Level ' + p.level + ' &nbsp;·&nbsp; Target: <strong>' + p.target + '</strong>');
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

  // ── Calculator buttons (rebuilt per level) ────────────
  p.makeCalcButtons = function() {
    displayWrap.html('');
    gridWrap.html('');

    // Display input
    p.calcButtons.push(
      p.calcInput = p.createInput('')
        .addClass('phone-calc-display')
        .attribute('aria-label', 'calculator display')
        .attribute('readonly', '')
        .parent(displayWrap)
    );

    var keyDefs = [
      { label: '7' }, { label: '8' }, { label: '9' }, { label: '÷', op: true, aria: 'divide' },
      { label: '4' }, { label: '5' }, { label: '6' }, { label: '×', op: true, aria: 'multiply' },
      { label: '1' }, { label: '2' }, { label: '3' }, { label: '−', op: true, aria: 'minus' },
      { label: 'CE', fn: true, aria: 'clear' }, { label: '0' }, { label: '=', eq: true, aria: 'equals' }, { label: '+', op: true, aria: 'plus' }
    ];

    keyDefs.forEach(function(def) {
      var btn = p.createButton(def.label)
        .addClass('phone-calc-btn')
        .parent(gridWrap)
        .attribute('aria-label', def.aria || def.label);
      if (def.op || def.eq) btn.addClass('phone-calc-btn-op');
      if (def.fn) btn.addClass('phone-calc-btn-fn');
      p.calcButtons.push(btn);
    });

    // Wire up input behaviour
    // buttons index mapping: 0=input, 1=7,2=8,3=9,4=/, 5=4,6=5,7=6,8=*, 9=1,10=2,11=3,12=-, 13=CE,14=0,15==,16=+
    for (var i = 1; i <= 16; i++) {
      p.calcButtons[i].mousePressed(add);
    }
    p.calcButtons[13].mousePressed(zeroed);
    p.calcButtons[15].mousePressed(equals);
  };

  function add() {
    // Map display characters back to eval-safe operators
    var label = this.html();
    var val = label === '÷' ? '/' : label === '×' ? '*' : label === '−' ? '-' : label;
    p.calcInput.value(p.calcInput.value() + val);
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
        localStorage.setItem('level' + p.level, true);
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
  // Index mapping to key label for brokenKeys lookup:
  var keyMap = [null,'7','8','9','/','4','5','6','*','1','2','3','-',null,'0',null,'+'];

  p.makeBrokenKeys = function() {
    for (var i = 1; i <= 16; i++) {
      var k = keyMap[i];
      if (k && p.brokenKeys.indexOf(k) !== -1) {
        p.calcButtons[i]
          .removeClass('phone-calc-btn-op')
          .removeClass('phone-calc-btn-fn')
          .addClass('phone-calc-btn-broken')
          .attribute('aria-label', k + ' – broken key, unavailable')
          .attribute('aria-disabled', 'true')
          .attribute('disabled', '')
          .mousePressed(donothing);
      }
    }
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
    changeLevels();
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
    document.getElementById('levelsScreen').style.display = 'block';
    document.getElementById('calculatorScreen').style.display = 'none';
  }
};
