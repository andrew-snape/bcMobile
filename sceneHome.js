var sceneHome = function(p) {
  p.preload = function() {
    myFont = p.loadFont("assets/GlacialIndifference-Regular.otf");
  }

  var playButton;
  var tutorialButton;

  p.setup = function() {
    p.createCanvas(p.displayWidth, p.displayHeight);
    p.background('#f5f7fa');
    p.noLoop();

    var cx = p.displayWidth / 2;
    var midY = p.displayHeight / 2;

    // Play button — centred, pill-shaped, finger-friendly
    playButton = p.createButton('▶  Play')
      .position(cx - 100, midY - 10)
      .addClass('btn-hero')
      .attribute('aria-label', 'Play the game')
      .touchStarted(switchToLevels);

    // Tutorial button
    tutorialButton = p.createButton('? Tutorial')
      .position(cx - 100, midY + 66)
      .addClass('btn-hero')
      .attribute('aria-label', 'How to play')
      .touchStarted(tutorial);
  }

  p.draw = function() {
    p.background('#f5f7fa');

    var cx = p.displayWidth / 2;
    var midY = p.displayHeight / 2;

    // Large bold title
    p.fill('#4361ee');
    p.noStroke();
    p.textFont(myFont);
    p.textStyle(p.BOLD);
    p.textSize(38);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Broken', cx, midY - 200);
    p.text('Calculators', cx, midY - 155);

    // Emoji decoration
    p.textSize(52);
    p.text('🧮', cx, midY - 100);

    // Sub-text
    p.textStyle(p.NORMAL);
    p.fill('#6c757d');
    p.textSize(16);
    p.textWrap(p.WORD);
    p.text('Can you reach the target\nwith a broken calculator?', cx, midY - 52, p.displayWidth - 60);

    p.textAlign(p.LEFT, p.BASELINE);
  }

  function switchToLevels() {
    document.getElementById('homeScreen').style.display = 'none';
    document.getElementById('levelsScreen').style.display = 'block';
  }

  function tutorial() {
    document.getElementById('tutorialScreen').style.display = 'block';
    document.getElementById('homeScreen').style.display = 'none';
  }
}

