var sceneLevels = function(p) {
  var grid = [];
  var TOTAL_LEVELS = 36;
  var PAGE_START = 1;
  var PAGE_SIZE = 12;

  p.mousePressed = function() { return false; };
  p.level = 0;

  var progressDiv;
  var progressBarDiv;

  p.preload = function() {
    myFont = p.loadFont("assets/GlacialIndifference-Regular.otf");
  };

  p.setup = function() {
    p.createCanvas(p.displayWidth, p.displayHeight);
    p.background('#f5f7fa');

    createNavButtons();
    createProgressBar();
    createLevels();

    // Header bar
    p.noStroke();
    p.fill('#ffffff');
    p.rect(0, 0, p.displayWidth, 56);
    p.fill('#4361ee');
    p.textFont(myFont);
    p.textSize(22);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Levels', p.displayWidth / 2, 28);
    p.textAlign(p.LEFT, p.BASELINE);
  };

  p.draw = function() {
    // Update completed level colours
    for (var i = 0; i < grid.length; i++) {
      var lvl = PAGE_START + i;
      if (localStorage['level' + lvl] === 'true') {
        grid[i].addClass('level-btn-completed');
      }
    }
    // Update progress bar
    updateProgress();
  };

  function countCompleted() {
    var count = 0;
    for (var i = 1; i <= TOTAL_LEVELS; i++) {
      if (localStorage['level' + i] === 'true') count++;
    }
    return count;
  }

  function createProgressBar() {
    var completed = countCompleted();
    var pct = Math.round((completed / TOTAL_LEVELS) * 100);

    progressDiv = p.createDiv('Levels completed: <strong>' + completed + ' / ' + TOTAL_LEVELS + '</strong>')
      .position(20, 62)
      .style('font-family', "'GlacialIndifference',sans-serif")
      .style('font-size', '0.9em')
      .style('color', '#6c757d')
      .style('width', (p.displayWidth - 40) + 'px');

    progressBarDiv = p.createDiv('<div class="progress-bar-fill" style="width:' + pct + '%"></div>')
      .position(20, 80)
      .addClass('progress-bar-wrap')
      .style('width', (p.displayWidth - 40) + 'px');
  }

  function updateProgress() {
    var completed = countCompleted();
    var pct = Math.round((completed / TOTAL_LEVELS) * 100);
    if (progressDiv) progressDiv.html('Levels completed: <strong>' + completed + ' / ' + TOTAL_LEVELS + '</strong>');
    if (progressBarDiv) {
      var fill = progressBarDiv.elt.querySelector('.progress-bar-fill');
      if (fill) fill.style.width = pct + '%';
    }
  }

  function createNavButtons() {
    p.createButton('← Back')
      .position(20, 8)
      .addClass('btn-nav')
      .attribute('aria-label', 'Back to home')
      .touchStarted(back);

    p.createButton('Next →')
      .position(p.displayWidth - 110, 8)
      .addClass('btn-nav')
      .attribute('aria-label', 'Next page of levels')
      .touchStarted(next);
  }

  function createLevels() {
    var cols = 3;
    var btnSize = 90;
    var gap = 10;
    var gridW = cols * btnSize + (cols - 1) * gap;
    var startX = (p.displayWidth - gridW) / 2;
    var startY = 100;

    for (var i = 0; i < PAGE_SIZE; i++) {
      var lvl = PAGE_START + i;
      var col = i % cols;
      var row = Math.floor(i / cols);
      var x = startX + col * (btnSize + gap);
      var y = startY + row * (btnSize + gap);
      (function(lvlNum) {
        var btn = p.createButton(lvlNum)
          .position(x, y)
          .addClass('level-btn')
          .attribute('aria-label', 'Level ' + lvlNum)
          .touchStarted(function() { launchLevel(lvlNum); });
        if (localStorage['level' + lvlNum] === 'true') {
          btn.addClass('level-btn-completed');
        }
        grid.push(btn);
      })(lvl);
    }
  }

  function launchLevel(n) {
    document.getElementById('levelsScreen').style.display = 'none';
    document.getElementById('calculatorScreen').style.display = 'block';
    var fns = [null,level1,level2,level3,level4,level5,level6,level7,level8,level9,level10,level11,level12];
    if (fns[n]) fns[n]();
  }

  function back() {
    document.getElementById('homeScreen').style.display = 'block';
    document.getElementById('levelsScreen').style.display = 'none';
  }

  function next() {
    document.getElementById('levelsScreen1').style.display = 'block';
    document.getElementById('levelsScreen').style.display = 'none';
  }
};

