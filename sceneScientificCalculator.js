
var sceneScientificCalculator = function(p) {
  p.sciButtons = [];
  p.sciInput;
  var backButton;

  // ── Layout constants ──────────────────────────────────
  var CX, CARD_X, CARD_Y, CARD_W, CARD_H;
  var DISP_Y, DISP_H;
  var BTN_W, BTN_H, GAP;
  var COL, ROW;

  // ── Setup ─────────────────────────────────────────────
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background('#f5f7fa');
    p.noStroke();

    recalcLayout();
    buildBackButton();
    buildDisplay();
    buildButtons();
  };

  p.draw = function() {
    p.background('#f5f7fa');

    // Card shadow
    p.noStroke();
    p.fill(0, 0, 0, 25);
    p.rect(CARD_X + 4, CARD_Y + 8, CARD_W, CARD_H, 20);

    // Card face
    p.fill('#ffffff');
    p.rect(CARD_X, CARD_Y, CARD_W, CARD_H, 20);

    // Title
    p.fill('#4361ee');
    p.textSize(16);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Scientific Calculator', CX, CARD_Y + 22);
    p.textAlign(p.LEFT, p.BASELINE);
  };

  // ── Layout ────────────────────────────────────────────
  function recalcLayout() {
    CX = p.windowWidth / 2;

    CARD_W = Math.min(360, p.windowWidth - 20);
    BTN_W  = 54;
    BTN_H  = 46;
    GAP    = 8;

    var cols = 5;
    var gridW = cols * BTN_W + (cols - 1) * GAP;
    CARD_W = gridW + 24; // 12px padding each side

    CARD_X = CX - CARD_W / 2;
    CARD_Y = 46;

    DISP_Y = CARD_Y + 36;
    DISP_H = 50;

    var firstRowY = DISP_Y + DISP_H + 10;

    // 5 columns of buttons
    COL = [];
    for (var c = 0; c < cols; c++) {
      COL.push(CARD_X + 12 + c * (BTN_W + GAP));
    }

    // 7 rows
    ROW = [];
    for (var r = 0; r < 7; r++) {
      ROW.push(firstRowY + r * (BTN_H + GAP));
    }

    CARD_H = (ROW[ROW.length - 1] + BTN_H + 16) - CARD_Y;
  }

  // ── Back button ───────────────────────────────────────
  function buildBackButton() {
    backButton = p.createButton('← Back')
      .position(p.windowWidth - 110, 3)
      .addClass('btn-nav')
      .attribute('aria-label', 'Back to home')
      .touchStarted(goBack);
  }

  // ── Display ───────────────────────────────────────────
  function buildDisplay() {
    p.sciInput = p.createInput('')
      .position(CARD_X + 12, DISP_Y)
      .attribute('aria-label', 'scientific calculator display')
      .attribute('readonly', '')
      .style('width', (CARD_W - 24) + 'px')
      .style('height', DISP_H + 'px')
      .style('background', '#1a1a2e')
      .style('color', '#00e676')
      .style('font-size', '1.5em')
      .style('font-family', "'Courier New',monospace")
      .style('text-align', 'right')
      .style('padding', '0 10px')
      .style('border', 'none')
      .style('border-radius', '10px')
      .style('outline', 'none');

    p.sciButtons.push(p.sciInput);
  }

  // ── Buttons ───────────────────────────────────────────
  function buildButtons() {
    /*
      Layout (5 cols × 7 rows):
      Row 0:  sin(  cos(  tan(  √(    π
      Row 1:  log(  ln(   x²    xʸ    e
      Row 2:  (     )     %     ±     ⌫
      Row 3:  7     8     9     ÷     CE
      Row 4:  4     5     6     ×     (blank)
      Row 5:  1     2     3     −     =
      Row 6:  0     .     (blank)(blank) +
    */
    var defs = [
      // row 0 — trig / sqrt / pi
      { lbl:'sin(',  val:'Math.sin(',    cls:'calc-btn calc-btn-sci',  r:0, c:0 },
      { lbl:'cos(',  val:'Math.cos(',    cls:'calc-btn calc-btn-sci',  r:0, c:1 },
      { lbl:'tan(',  val:'Math.tan(',    cls:'calc-btn calc-btn-sci',  r:0, c:2 },
      { lbl:'√(',    val:'Math.sqrt(',   cls:'calc-btn calc-btn-sci',  r:0, c:3 },
      { lbl:'π',     val:'Math.PI',      cls:'calc-btn calc-btn-sci',  r:0, c:4 },
      // row 1 — log / ln / x² / pow / e
      { lbl:'log(',  val:'Math.log10(',  cls:'calc-btn calc-btn-sci',  r:1, c:0 },
      { lbl:'ln(',   val:'Math.log(',    cls:'calc-btn calc-btn-sci',  r:1, c:1 },
      { lbl:'x²',    val:'**2',          cls:'calc-btn calc-btn-sci',  r:1, c:2 },
      { lbl:'xʸ',    val:'**',           cls:'calc-btn calc-btn-sci',  r:1, c:3 },
      { lbl:'e',     val:'Math.E',       cls:'calc-btn calc-btn-sci',  r:1, c:4 },
      // row 2 — parens / modulo / negate / backspace
      { lbl:'(',     val:'(',            cls:'calc-btn',               r:2, c:0 },
      { lbl:')',     val:')',            cls:'calc-btn',               r:2, c:1 },
      { lbl:'%',     val:'%',           cls:'calc-btn',               r:2, c:2 },
      { lbl:'±',     val:'negate',       cls:'calc-btn',               r:2, c:3 },
      { lbl:'⌫',     val:'backspace',    cls:'calc-btn calc-btn-ce',   r:2, c:4 },
      // row 3 — 7 8 9 ÷ CE
      { lbl:'7',     val:'7',            cls:'calc-btn',               r:3, c:0 },
      { lbl:'8',     val:'8',            cls:'calc-btn',               r:3, c:1 },
      { lbl:'9',     val:'9',            cls:'calc-btn',               r:3, c:2 },
      { lbl:'÷',     val:'/',            cls:'calc-btn calc-btn-operator', r:3, c:3 },
      { lbl:'CE',    val:'clear',        cls:'calc-btn calc-btn-ce',   r:3, c:4 },
      // row 4 — 4 5 6 ×
      { lbl:'4',     val:'4',            cls:'calc-btn',               r:4, c:0 },
      { lbl:'5',     val:'5',            cls:'calc-btn',               r:4, c:1 },
      { lbl:'6',     val:'6',            cls:'calc-btn',               r:4, c:2 },
      { lbl:'×',     val:'*',            cls:'calc-btn calc-btn-operator', r:4, c:3 },
      // row 5 — 1 2 3 − =
      { lbl:'1',     val:'1',            cls:'calc-btn',               r:5, c:0 },
      { lbl:'2',     val:'2',            cls:'calc-btn',               r:5, c:1 },
      { lbl:'3',     val:'3',            cls:'calc-btn',               r:5, c:2 },
      { lbl:'−',     val:'-',            cls:'calc-btn calc-btn-operator', r:5, c:3 },
      { lbl:'=',     val:'equals',       cls:'calc-btn calc-btn-equals', r:5, c:4 },
      // row 6 — 0 . +
      { lbl:'0',     val:'0',            cls:'calc-btn',               r:6, c:0 },
      { lbl:'.',     val:'.',            cls:'calc-btn',               r:6, c:1 },
      { lbl:'+',     val:'+',            cls:'calc-btn calc-btn-operator', r:6, c:4 }
    ];

    for (var i = 0; i < defs.length; i++) {
      (function(def) {
        var btn = p.createButton(def.lbl)
          .position(COL[def.c], ROW[def.r])
          .attribute('aria-label', def.lbl)
          .style('width', BTN_W + 'px')
          .style('height', BTN_H + 'px');

        // Apply CSS classes
        var classes = def.cls.split(' ');
        for (var k = 0; k < classes.length; k++) {
          btn.addClass(classes[k]);
        }

        btn.mousePressed(function() { handleInput(def.val); });
        p.sciButtons.push(btn);
      })(defs[i]);
    }
  }

  // ── Input handler ─────────────────────────────────────
  function handleInput(val) {
    var cur = p.sciInput.value();
    if (val === 'clear') {
      p.sciInput.value('');
    } else if (val === 'backspace') {
      p.sciInput.value(cur.slice(0, -1));
    } else if (val === 'negate') {
      if (cur === '' || cur === '0') return;
      if (cur.charAt(0) === '-') {
        p.sciInput.value(cur.slice(1));
      } else {
        p.sciInput.value('-' + cur);
      }
    } else if (val === 'equals') {
      evaluate();
    } else {
      p.sciInput.value(cur + val);
    }
  }

  // ── Evaluation ────────────────────────────────────────
  function evaluate() {
    var expr = p.sciInput.value();
    if (!expr) return;
    var result;
    try {
      // jshint ignore:line
      result = (new Function('return (' + expr + ')'))(); // safer than eval
    } catch(e) {
      shakeInput();
      return;
    }
    if (result === undefined || result === null || isNaN(result)) {
      shakeInput();
      return;
    }
    p.sciInput.value(formatResult(result));
  }

  // ── Result formatter ─────────────────────────────────
  function formatResult(n) {
    var abs = Math.abs(n);
    // Very large or very small: keep scientific notation but trim to 6 sig-figs
    if (abs !== 0 && (abs >= 1e10 || abs < 1e-6)) {
      return n.toExponential(5).replace(/\.?0+e/, 'e');
    }
    // Normal range: remove floating-point noise, strip trailing zeros
    return parseFloat(n.toPrecision(10)).toString();
  }

  // ── Shake animation ───────────────────────────────────
  function shakeInput() {
    var el = p.sciInput.elt;
    el.classList.remove('shake');
    void el.offsetWidth;
    el.classList.add('shake');
    el.addEventListener('animationend', function() {
      el.classList.remove('shake');
    }, { once: true });
  }

  // ── Navigation ────────────────────────────────────────
  function goBack() {
    document.getElementById('scientificScreen').style.display = 'none';
    document.getElementById('homeScreen').style.display = 'block';
  }

  // ── Cleanup ───────────────────────────────────────────
  p.remove = function() {
    for (var i = 0; i < p.sciButtons.length; i++) {
      p.sciButtons[i].remove();
    }
    if (backButton) backButton.remove();
    p.sciButtons = [];
  };
};
