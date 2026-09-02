var sceneChallengeHub = function(p) {
  var cards = [];

  p.preload = function() {
    myFont = p.loadFont("assets/GlacialIndifference-Regular.otf");
  };

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background('#f5f7fa');

    createNavButtons();
    createCards();

    p.noStroke();
    p.fill('#ffffff');
    p.rect(0, 0, p.windowWidth, 56);
    p.fill('#4361ee');
    p.textFont(myFont);
    p.textSize(22);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Challenge Packs', p.windowWidth / 2, 28);
    p.textAlign(p.LEFT, p.BASELINE);
  };

  p.draw = function() {
    updateProgress();
  };

  function tierCompleted(tierKey) {
    var tier = challengeLevels[tierKey];
    var count = 0;
    for (var i = 1; i <= tier.levels.length; i++) {
      if (localStorage['challenge_' + tierKey + '_' + i] === 'true') count++;
    }
    return count;
  }

  function updateProgress() {
    cards.forEach(function(card) {
      var completed = tierCompleted(card.tierKey);
      var total = challengeLevels[card.tierKey].levels.length;
      card.progressDiv.html(completed + ' / ' + total + ' completed');
    });
  }

  function createNavButtons() {
    p.createButton('← Back')
      .position(20, 8)
      .addClass('btn-nav')
      .attribute('aria-label', 'Back to home')
      .touchStarted(back);
  }

  function createCards() {
    var tierKeys = ['fractions', 'negatives', 'indices'];
    var cardW = Math.min(420, p.windowWidth - 40);
    var startX = (p.windowWidth - cardW) / 2;
    var y = 80;

    tierKeys.forEach(function(tierKey) {
      var tier = challengeLevels[tierKey];

      var card = p.createDiv('')
        .addClass('challenge-card')
        .position(startX, y)
        .style('width', cardW + 'px')
        .attribute('role', 'button')
        .attribute('tabindex', '0')
        .attribute('aria-label', tier.title)
        .touchStarted(function() { openTier(tierKey); });

      p.createDiv(tier.title).addClass('challenge-card-title').parent(card);
      p.createDiv(tier.description).addClass('challenge-card-desc').parent(card);
      var progressDiv = p.createDiv('').addClass('challenge-card-progress').parent(card);

      cards.push({ tierKey: tierKey, progressDiv: progressDiv });

      y += 148;
    });
  }

  function openTier(tierKey) {
    challengeLevelsScreen.showTier(tierKey);
    document.getElementById('challengeHubScreen').style.display = 'none';
    document.getElementById('challengeLevelsScreen').style.display = 'block';
  }

  function back() {
    document.getElementById('homeScreen').style.display = 'block';
    document.getElementById('challengeHubScreen').style.display = 'none';
  }
};
