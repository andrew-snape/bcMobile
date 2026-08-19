var homeScreen = new p5(sceneHome,"homeScreen");
var levelsScreen = new p5(sceneLevels,"levelsScreen");
var levelsScreen1 = new p5(sceneLevels1,"levelsScreen1");
var levelsScreen2 = new p5(sceneLevels2,"levelsScreen2");
var tutorialScreen = new p5(sceneTutorial, "tutorialScreen");
var calcScreen = new p5(sceneCalculator, "calculatorScreen");
var sciScreen = new p5(sceneScientificCalculator, "scientificScreen");

function level1(){
  calcScreen.calcButtons = [];
  calcScreen.level = 1;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["8"];
  calcScreen.target = 8;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}

var level2 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 2;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["1"];
  calcScreen.target = 1;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level3 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 3;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["1"];
  calcScreen.target = 15;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level4 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 4;
  calcScreen.clearMoveHistory();
  calcScreen.displayEndMessage = false;
  calcScreen.brokenKeys = ["2"];
  calcScreen.target = 24;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level5 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 5;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["1"];
  calcScreen.target = 11;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level6 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 6;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["3"];
  calcScreen.target = 30;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level7 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 7;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["4", "0"];
  calcScreen.target = 40;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level8 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 8;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["1","2", "0"];
  calcScreen.target = 21;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level9 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 9;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["1","3","0"];
  calcScreen.target = 33;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level10 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 10;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["1","2","5"];
  calcScreen.target = 25;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}

var level11 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 11;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["1","3","4", "6"];
  calcScreen.target = 36;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level12 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 12;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["1","3","4", "7"];
  calcScreen.target = 37;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level13 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 13;
  calcScreen.brokenKeys = ["1","2","5","+"];
  calcScreen.target = 10;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level14 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 14;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["7","5", "*"];
  calcScreen.target = 25;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level15 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 15;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["1","2","5", "-"];
  calcScreen.target = 20;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level16 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 16;
  calcScreen.brokenKeys = ["3","7","*"];
  calcScreen.target = 25;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level17 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 17;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["4","6", "*"];
  calcScreen.target = 34;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level18 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 18;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["7","6","9", "/"];
  calcScreen.target = 43;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level19 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 19;
  calcScreen.brokenKeys = ["3","4","5","*"];
  calcScreen.target = 15;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level20 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 20;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["9","5", "*","+"];
  calcScreen.target = 15;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level21 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 21;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["1","5"];
  calcScreen.target = 15;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level22 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 22;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["3","7","5", "-"];
  calcScreen.target = 21;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level23 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 23;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["9","7","3"];
  calcScreen.target = 63;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level24 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 24;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["3","9", "-"];
  calcScreen.target = 26;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level25 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 25;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["4","9", "*"];
  calcScreen.target = 36;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level26 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 26;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["1","2","8", "-"];
  calcScreen.target = 24;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level27 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 27;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["1","2","9", "-"];
  calcScreen.target = 35;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level28 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 28;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["2","5", "-"];
  calcScreen.target = 40;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level29 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 29;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["1","2","5", "-"];
  calcScreen.target = 38;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level30 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 30;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["3","7","5", "/"];
  calcScreen.target = 35;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level31 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 31;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["1","4","9", "-"];
  calcScreen.target = 94;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level32 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 32;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["8","5","*"];
  calcScreen.target = 58;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level33 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 33;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["3","2","0", "-"];
  calcScreen.target = 61;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level34 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 34;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["1","9","8", "*"];
  calcScreen.target = 72;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level35 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 35;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["2","4", "6"];
  calcScreen.target = 26;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
var level36 = function(){
  calcScreen.calcButtons = [];
  calcScreen.level = 36;
  calcScreen.clearMoveHistory();
  calcScreen.brokenKeys = ["1","3","5", "7"];
  calcScreen.target = 6;
  calcScreen.score = 0;
  calcScreen.makeCalcButtons();
  calcScreen.makeBrokenKeys();
}
