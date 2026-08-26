var sceneTutorial = function(p) {

  p.preload = function() {
    myFont = p.loadFont("assets/GlacialIndifference-Regular.otf");
  };

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background('#f5f7fa');
    p.noLoop();

    // Header bar
    p.noStroke();
    p.fill('#ffffff');
    p.rect(0, 0, p.windowWidth, 56);
    p.fill('#4361ee');
    p.textFont(myFont);
    p.textSize(22);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('How to Play', p.windowWidth / 2, 28);
    p.textAlign(p.LEFT, p.BASELINE);

    // Back button
    p.createButton('← Back')
      .position(20, 8)
      .addClass('btn-nav')
      .attribute('aria-label', 'Back to home')
      .touchStarted(back);

    // Step cards rendered as HTML inside the p5 container div
    var wrapper = p.createDiv('')
      .addClass('tutorial-screen-inner')
      .position(0, 56)
      .style('width', p.windowWidth + 'px');

    wrapper.html(
      '<div class="tutorial-step">' +
        '<div class="tutorial-step-icon" aria-hidden="true">🔴</div>' +
        '<div class="tutorial-step-text">' +
          '<h3>Broken Keys</h3>' +
          '<p>Some keys are highlighted in red and crossed out — those are broken! You cannot use them.</p>' +
        '</div>' +
      '</div>' +
      '<div class="tutorial-step">' +
        '<div class="tutorial-step-icon" aria-hidden="true">🎯</div>' +
        '<div class="tutorial-step-text">' +
          '<h3>Reach the Target</h3>' +
          '<p>Type a maths expression using the working keys so that it equals the target number shown at the top.</p>' +
        '</div>' +
      '</div>' +
      '<div class="tutorial-step">' +
        '<div class="tutorial-step-icon" aria-hidden="true">⭐</div>' +
        '<div class="tutorial-step-text">' +
          '<h3>Find 3 Solutions</h3>' +
          '<p>Find 3 different expressions that all equal the target. Each new correct answer earns a star. Get all 3 to complete the level!</p>' +
        '</div>' +
      '</div>' +
      '<div class="tutorial-step">' +
        '<div class="tutorial-step-icon" aria-hidden="true">💡</div>' +
        '<div class="tutorial-step-text">' +
          '<h3>Example</h3>' +
          '<p>Target: <strong>8</strong>, broken key: 8.<br>Try: <strong>4+4</strong>, <strong>2*4</strong>, <strong>16/2</strong></p>' +
        '</div>' +
      '</div>'
    );
  };

  p.draw = function() {};

  function back() {
    document.getElementById('homeScreen').style.display = 'block';
    document.getElementById('tutorialScreen').style.display = 'none';
  }
};

