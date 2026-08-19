# Contributing to Broken Calculators

Thank you for your interest in contributing to Broken Calculators! We welcome contributions from the community. Here's how you can help:

## 🐛 Reporting Bugs

Found a bug? Please open an issue with:
- A clear, descriptive title
- Detailed description of the problem
- Steps to reproduce the issue
- Expected vs. actual behavior
- Screenshots or videos if applicable
- Browser and device information

## 💡 Suggesting Features

Have an idea to improve the game? Open an issue describing:
- The feature or enhancement
- Why it would be valuable
- How it should work
- Any potential challenges

## 🚀 Submitting Pull Requests

### Before you start
1. Fork the repository
2. Create a new branch for your feature: `git checkout -b feature/your-feature-name`
3. Make sure your code follows the project's style

### Code Guidelines
- Use consistent indentation (2 spaces)
- Follow existing code patterns
- Keep functions focused and well-documented
- Add comments for complex logic
- Test your changes thoroughly

### Commit Messages
- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, etc.)
- Reference issues when relevant: `Fix #123`

### Pull Request Process
1. Push to your fork
2. Open a Pull Request with a clear title and description
3. Link any related issues
4. Wait for review and feedback
5. Make any requested changes
6. Your PR will be merged once approved!

## 📝 Documentation

Improvements to documentation are always welcome:
- Update the README with clarifications
- Improve inline code comments
- Create tutorials or guides
- Fix typos and grammar

## 🎮 Level Design

Want to create new levels? Check `game.js` to see how levels are structured:
- Each level defines: `brokenKeys`, `target`, and optionally `displayEndMessage`
- Levels progress from single digit breaks to complex multi-key challenges
- Ensure levels have at least 3 valid solutions

## Code Style

### JavaScript
```javascript
// Use clear variable names
var calculatorScreen = new p5(sceneCalculator, "calculatorScreen");

// Comment complex logic
function setupLevel() {
  // Initialize calculator state
  calcScreen.calcButtons = [];
  calcScreen.level = 1;
}
```

### HTML & CSS
- Use semantic HTML elements
- Keep CSS organized and commented
- Maintain accessibility standards

## Questions?

Feel free to open an issue for questions or discussions. We're here to help!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for making Broken Calculators better!** 🎯
