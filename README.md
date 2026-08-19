# 🧮 Broken Calculators

A challenging puzzle game where you must reach target numbers using a calculator with broken keys!

## 🎮 Game Overview

**Broken Calculators** is an interactive puzzle game built with p5.js that tests your mathematical creativity and problem-solving skills. Each level presents you with a malfunctioning calculator where certain keys are disabled. Your challenge is to find creative ways to reach the target number using only the working keys.

### Key Features

- **36 Progressive Levels** - Start simple and work your way up to complex puzzles
- **Multiple Solutions** - Most puzzles have 3 different solutions to discover
- **Broken Key Mechanics** - Adapt your strategies as different keys break on each level
- **Tutorial Mode** - Learn the basics before diving into challenges
- **Calculator Modes** - Both standard and scientific calculator options
- **Satisfying Feedback** - Earn stars and receive congratulations when you succeed
- **Mobile-Optimized** - Responsive design works on all device sizes

## 🎯 How to Play

1. **Start the Game** - Choose from the home menu
2. **Read the Tutorial** - Learn how the broken calculator mechanic works
3. **Select a Level** - Progress through the level system
4. **Solve the Puzzle** - Find ways to reach the target number
5. **Discover Solutions** - Find all 3 solutions to master each level

### Example Puzzle

- **Target:** 8
- **Broken Keys:** 8
- **Available Keys:** 0, 1, 2, 3, 4, 5, 6, 7, 9, +, -, *, /
- **Challenge:** Find 3 different ways to make 8 without using the 8 key!

## 🛠️ Built With

- **p5.js** - Creative coding library for interactive visualizations
- **HTML5 / CSS3** - Responsive web interface
- **Vanilla JavaScript** - Pure JS game logic and state management
- **Custom Font** - Glacial Indifference for modern aesthetics

## 📁 Project Structure

```
bcMobile/
├── index.html                      # Main HTML entry point
├── game.js                         # Core game controller & level definitions
├── sceneHome.js                    # Home screen scene
├── sceneTutorial.js                # Tutorial & instructions
├── sceneLevels.js                  # Level selection screen
├── sceneLevel1.js                  # Level 1 specific content
├── sceneLevels2.js                 # Additional levels screen
├── sceneCalculator.js              # Standard calculator gameplay scene
├── sceneScientificCalculator.js    # Scientific calculator scene
├── css/
│   └── style.css                   # Game styling
├── assets/
│   ├── GlacialIndifference-Regular.otf
│   ├── GlacialIndifference-Bold.otf
│   └── [other assets]
└── libraries/
    ├── p5.js                       # p5.js core library
    ├── p5.dom.js                   # p5.js DOM utilities
    └── p5.sound.js                 # p5.js sound library
```

## 🚀 Getting Started

### Play Online
No installation needed! This is a web-based game that runs directly in your browser.

1. Open `index.html` in a modern web browser
2. Click "Play" to start
3. Follow the on-screen tutorial
4. Tackle the challenges!

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/andrew-snape/bcMobile.git
   ```
2. Navigate to the directory:
   ```bash
   cd bcMobile
   ```
3. Open `index.html` in your browser or use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx http-server
   ```

## 📊 Level Progression

The game features **36 challenging levels** organized in difficulty tiers:
- **Levels 1-12:** Broken digit keys (single or multiple digits)
- **Levels 13-32:** Broken operators (mixing digit and operation key breaks)
- **Levels 33-36:** Expert challenges combining multiple broken keys

Each level requires finding 3 different calculation paths to the target number.

## 🎨 Accessibility

- Semantic HTML with ARIA labels for screen readers
- Clear visual feedback and triumph animations
- Responsive design for mobile and desktop
- High-contrast interface

## 💡 Game Design Philosophy

The puzzle design encourages:
- **Mathematical thinking** - Multiple solution paths test different mathematical approaches
- **Problem-solving** - Work around limitations creatively
- **Perseverance** - Progressively harder levels with satisfying difficulty curve
- **Exploration** - The "3 solutions" mechanic encourages thorough thinking

## 📝 License

This is a fork of the original [joshp112358/bcMobile](https://github.com/joshp112358/bcMobile) repository.

## 🙏 Credits

- Built with [p5.js](https://p5js.org/) - a creative coding library
- Original project by [Josh P](https://github.com/joshp112358)
- Maintained and enhanced by [andrew-snape](https://github.com/andrew-snape)

## 🎓 Educational Value

Perfect for:
- Learning creative problem-solving
- Exploring mathematical operations
- Understanding constraint-based design
- JavaScript game development learning

---

**Ready to take on the challenge? Play now and master all 36 levels!** 🎯
