var sceneHome = function(p) {
  p.preload = function() {
    myFont = p.loadFont("assets/GlacialIndifference-Regular.otf");
  }

  var playButton;
  var tutorialButton;

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background('#f5f7fa');
    p.noLoop();

    var cx = p.windowWidth / 2;
    var midY = p.windowHeight / 2;

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

    // Scientific calculator button
    p.createButton('🔬 Scientific')
      .position(cx - 100, midY + 142)
      .addClass('btn-hero')
      .attribute('aria-label', 'Open scientific calculator')
      .touchStarted(openScientific);

    // Challenge Packs button
    p.createButton('🧠 Challenge Packs')
      .position(cx - 100, midY + 218)
      .addClass('btn-hero')
      .attribute('aria-label', 'Open harder challenge packs')
      .touchStarted(openChallengeHub);

    // Teacher warm-up button
    p.createButton('📺 Warm-Up')
      .position(cx - 100, midY + 294)
      .addClass('btn-hero')
      .attribute('aria-label', 'Open teacher warm-up screen')
      .touchStarted(openWarmup);
  }

  p.draw = function() {
    p.background('#f5f7fa');

    var cx = p.windowWidth / 2;
    var midY = p.windowHeight / 2;

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
    p.text('Can you reach the target\nwith a broken calculator?', cx, midY - 52, p.windowWidth - 60);

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

  function openScientific() {
    document.getElementById('homeScreen').style.display = 'none';
    document.getElementById('scientificScreen').style.display = 'block';
  }

  function openChallengeHub() {
    document.getElementById('homeScreen').style.display = 'none';
    document.getElementById('challengeHubScreen').style.display = 'block';
  }

  function openWarmup() {
    document.getElementById('homeScreen').style.display = 'none';
    document.getElementById('warmupScreen').style.display = 'block';
  }
}

