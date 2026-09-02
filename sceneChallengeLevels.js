var sceneChallengeLevels = function(p) {
  var grid = [];
  var currentTierKey = null;
  var progressDiv;
  var progressBarDiv;

  p.preload = function() {
    myFont = p.loadFont("assets/GlacialIndifference-Regular.otf");
  };

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background('#f5f7fa');

    createNavButtons();

    progressDiv = p.createDiv('')
      .position(20, 62)
      .style('font-family', "'GlacialIndifference',sans-serif")
      .style('font-size', '0.9em')
      .style('color', '#6c757d')
      .style('width', (p.windowWidth - 40) + 'px');

    progressBarDiv = p.createDiv('')
      .position(20, 80)
      .addClass('progress-bar-wrap')
      .style('width', (p.windowWidth - 40) + 'px');

    p.noStroke();
    p.fill('#ffffff');
    p.rect(0, 0, p.windowWidth, 56);
  };

  p.draw = function() {
    p.noStroke();
    p.fill('#ffffff');
    p.rect(0, 0, p.windowWidth, 56);
    p.fill('#4361ee');
    p.textFont(myFont);
    p.textSize(22);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(currentTierKey ? challengeLevels[currentTierKey].title : 'Challenge Levels', p.windowWidth / 2, 28);
    p.textAlign(p.LEFT, p.BASELINE);

    if (!currentTierKey) return;

    var tier = challengeLevels[currentTierKey];
    for (var i = 0; i < grid.length; i++) {
      var lvl = i + 1;
      if (localStorage['challenge_' + currentTierKey + '_' + lvl] === 'true') {
        grid[i].addClass('level-btn-completed');
      }
    }
    updateProgress(tier);
  };

  function countCompleted(tierKey, total) {
    var count = 0;
    for (var i = 1; i <= total; i++) {
      if (localStorage['challenge_' + tierKey + '_' + i] === 'true') count++;
    }
    return count;
  }

  function updateProgress(tier) {
    var completed = countCompleted(currentTierKey, tier.levels.length);
    var pct = Math.round((completed / tier.levels.length) * 100);
    progressDiv.html('Levels completed: <strong>' + completed + ' / ' + tier.levels.length + '</strong>');
    progressBarDiv.html('<div class="progress-bar-fill" style="width:' + pct + '%"></div>');
  }

  function createNavButtons() {
    p.createButton('← Back')
      .position(20, 8)
      .addClass('btn-nav')
      .attribute('aria-label', 'Back to challenge packs')
      .touchStarted(back);
  }

  // Rebuilds the level grid for the given tier. Called by sceneChallengeHub
  // before this screen is shown — this scene is reused across all 3 tiers.
  p.showTier = function(tierKey) {
    currentTierKey = tierKey;
    var tier = challengeLevels[tierKey];

    grid.forEach(function(btn) { btn.remove(); });
    grid = [];

    var cols = 3;
    var btnSize = 90;
    var gap = 10;
    var gridW = cols * btnSize + (cols - 1) * gap;
    var startX = (p.windowWidth - gridW) / 2;
    var startY = 100;

    for (var i = 0; i < tier.levels.length; i++) {
      var lvlNum = i + 1;
      var col = i % cols;
      var row = Math.floor(i / cols);
      var x = startX + col * (btnSize + gap);
      var y = startY + row * (btnSize + gap);
      (function(n) {
        var btn = p.createButton(n)
          .position(x, y)
          .addClass('level-btn')
          .attribute('aria-label', tier.title + ' level ' + n)
          .touchStarted(function() { launchLevel(tierKey, n); });
        if (localStorage['challenge_' + tierKey + '_' + n] === 'true') {
          btn.addClass('level-btn-completed');
        }
        grid.push(btn);
      })(lvlNum);
    }
  };

  function launchLevel(tierKey, n) {
    document.getElementById('challengeLevelsScreen').style.display = 'none';
    document.getElementById('calculatorScreen').style.display = 'block';
    startChallengeLevel(tierKey, n);
  }

  function back() {
    document.getElementById('challengeHubScreen').style.display = 'block';
    document.getElementById('challengeLevelsScreen').style.display = 'none';
  }
};
