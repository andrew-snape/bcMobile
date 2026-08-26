
var sceneCalculator = function(p) {
  p.calcButtons = [];
  p.calcInput;
  p.brokenKeys = ['7', '8'];
  p.level = 1;
  p.target = 2;
  var backButton;
  p.score = 0;
  p.moveHistory = [];

  // DOM elements for header info
  var headerDiv;
  var scoreDiv;

  p.clearMoveHistory = function() {
    p.moveHistory = [];
  };

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background('#f5f7fa');
    p.noStroke();

    buildHeader();
    buildScoreBar();
    p.makeCalcButtons();
    p.makeBrokenKeys();
    buildBackButton();
    buildCongratsHandler();
  };

  p.draw = function() {
    // Redraw background + card each frame
    p.background('#f5f7fa');

    // Calculator card shadow/face
    var cardX = p.windowWidth / 2 - 160;
    var cardY = 160;
    var cardW = 320;
    var cardH = 380;

    // Shadow
    p.noStroke();
    p.fill(0, 0, 0, 25);
    p.rect(cardX + 4, cardY + 8, cardW, cardH, 20);

    // White card face
    p.fill('#ffffff');
    p.rect(cardX, cardY, cardW, cardH, 20);

    // Update header text
    if (headerDiv) {
      headerDiv.html(
        '<span class="hdr-level">Level ' + p.level + '</span>' +
        '<span class="hdr-target">Target: <strong>' + p.target + '</strong></span>'
      );
    }

    // Update stars
    updateScoreBar();
  };

  // ── Header bar ──────────────────────────────────────
  function buildHeader() {
    headerDiv = p.createDiv('')
      .position(0, 0)
      .style('width', p.windowWidth + 'px')
      .style('height', '56px')
      .style('background', '#ffffff')
      .style('box-shadow', '0 2px 8px rgba(0,0,0,0.10)')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('justify-content', 'space-between')
      .style('padding', '0 20px')
      .style('font-family', "'GlacialIndifference',sans-serif")
      .style('font-size', '1.1em')
      .style('color', '#1a1a2e')
      .style('z-index', '10');
  }

  // ── Score / star bar ─────────────────────────────────
  function buildScoreBar() {
    scoreDiv = p.createDiv('')
      .position(p.windowWidth / 2 - 80, 70)
      .style('width', '160px')
      .style('text-align', 'center')
      .style('font-size', '2em')
      .style('letter-spacing', '8px');
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

  // ── Back button ──────────────────────────────────────
  function buildBackButton() {
    backButton = p.createButton('← Back')
      .position(p.windowWidth - 110, 8)
      .addClass('btn-nav')
      .attribute('aria-label', 'Back to level select')
      .touchStarted(back);
  }

  // ── Calculator buttons ───────────────────────────────
  p.makeCalcButtons = function() {
    var cx = p.windowWidth / 2;
    var startX = cx - 150;
    var inputY = 175;
    var row1Y = 245, row2Y = 319, row3Y = 393, row4Y = 467;
    var col = [startX, startX + 74, startX + 148, startX + 222];

    // Display input
    p.calcButtons.push(
      p.calcInput = p.createInput('')
        .position(startX + 4, inputY)
        .attribute('aria-label', 'calculator display')
        .attribute('readonly', '')
        .style('width', '286px')
        .style('height', '50px')
        .style('background', '#1a1a2e')
        .style('color', '#00e676')
        .style('font-size', '1.8em')
        .style('font-family', "'Courier New',monospace")
        .style('text-align', 'right')
        .style('padding', '0 12px')
        .style('border', 'none')
        .style('border-radius', '10px')
        .style('outline', 'none')
    );

    // Row 1: 7 8 9 /
    p.calcButtons.push(p.createButton('7').position(col[0], row1Y).attribute('aria-label', '7').addClass('calc-btn'));
    p.calcButtons.push(p.createButton('8').position(col[1], row1Y).attribute('aria-label', '8').addClass('calc-btn'));
    p.calcButtons.push(p.createButton('9').position(col[2], row1Y).attribute('aria-label', '9').addClass('calc-btn'));
    p.calcButtons.push(p.createButton('÷').position(col[3], row1Y).attribute('aria-label', 'divide').addClass('calc-btn calc-btn-operator'));
    // Row 2: 4 5 6 *
    p.calcButtons.push(p.createButton('4').position(col[0], row2Y).attribute('aria-label', '4').addClass('calc-btn'));
    p.calcButtons.push(p.createButton('5').position(col[1], row2Y).attribute('aria-label', '5').addClass('calc-btn'));
    p.calcButtons.push(p.createButton('6').position(col[2], row2Y).attribute('aria-label', '6').addClass('calc-btn'));
    p.calcButtons.push(p.createButton('×').position(col[3], row2Y).attribute('aria-label', 'multiply').addClass('calc-btn calc-btn-operator'));
    // Row 3: 1 2 3 -
    p.calcButtons.push(p.createButton('1').position(col[0], row3Y).attribute('aria-label', '1').addClass('calc-btn'));
    p.calcButtons.push(p.createButton('2').position(col[1], row3Y).attribute('aria-label', '2').addClass('calc-btn'));
    p.calcButtons.push(p.createButton('3').position(col[2], row3Y).attribute('aria-label', '3').addClass('calc-btn'));
    p.calcButtons.push(p.createButton('−').position(col[3], row3Y).attribute('aria-label', 'minus').addClass('calc-btn calc-btn-operator'));
    // Row 4: CE 0 = +
    p.calcButtons.push(p.createButton('CE').position(col[0], row4Y).attribute('aria-label', 'clear').addClass('calc-btn calc-btn-ce'));
    p.calcButtons.push(p.createButton('0').position(col[1], row4Y).attribute('aria-label', '0').addClass('calc-btn'));
    p.calcButtons.push(p.createButton('=').position(col[2], row4Y).attribute('aria-label', 'equals').addClass('calc-btn calc-btn-equals'));
    p.calcButtons.push(p.createButton('+').position(col[3], row4Y).attribute('aria-label', 'plus').addClass('calc-btn calc-btn-operator'));

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
          .removeClass('calc-btn-operator')
          .removeClass('calc-btn-equals')
          .addClass('calc-btn-broken')
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

