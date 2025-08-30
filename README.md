# 🃏 Teen Patti - Fake Money, Real Fun!

A web-based Teen Patti (Indian Poker) game admin panel that lets you manage real-world card games with friends and family. Perfect for house parties, gatherings, or casual gaming sessions where you want to keep track of bets, players, and game flow digitally while playing with physical cards.

## 🎯 Features

### Game Management
- **Player Management**: Support for 3-6 players with customizable starting balances
- **Real-time Pot Tracking**: Keep track of total pot, current stakes, and remaining players
- **Comprehensive Game Log**: Track all game actions and betting history

### Betting System
- **Flexible Boot Amount**: Set custom boot amounts for each game
- **Blind and Seen Betting**: Full support for traditional Teen Patti betting rules
- **Sideshow Feature**: Compare cards between players
- **Show Mechanism**: Final card reveal when only 2 players remain
- **Fold Management**: Easy player folding with automatic stake calculations

### User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Intuitive Controls**: Easy-to-use interface for non-technical users
- **Hand Rankings Reference**: Built-in reference guide for card combinations
- **Modal Dialogs**: Clean popup interfaces for player actions

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of Teen Patti rules

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/siddharth-09/Teenpatti-fake_money-real_fun.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd Teenpatti-fake_money-real_fun
   ```

3. **Open in browser:**
   - Simply open `index.html` in your preferred web browser
   - Or use a local server for better performance:
     ```bash
     # Using Python (if installed)
     python -m http.server 8000
     
     # Using Node.js (if installed)
     npx serve .
     ```

4. **Start playing:**
   - Set up your game parameters
   - Add players with their starting balances
   - Begin your Teen Patti session!

## 🎮 How to Use

### Setting Up a Game

1. **Configure Game Settings:**
   - Choose number of players (3-6)
   - Set boot amount (minimum bet)
   - Select game variation

2. **Add Players:**
   - Click "Add Player" button
   - Enter player name and starting balance
   - Repeat for all players

3. **Start the Game:**
   - Click "Start New Game"
   - Deal physical cards to players
   - Use the admin panel to track digital bets

### During Gameplay

1. **Select Current Player:** Choose who's taking their turn
2. **Place Bets:** Use blind bet, seen bet (chaal), or fold options
3. **Handle Special Actions:**
   - **Sideshow:** Compare cards between two players
   - **Show:** Final card reveal (only with 2 players remaining)
4. **Track Progress:** Monitor pot size, stakes, and remaining players

### Game Variations

- **Classic Teen Patti:** Traditional rules, highest hand wins
- **Muflis:** Lowest hand wins, reverse ranking system
- **AK47:** Ace, King, 4, and 7 act as jokers
- **999:** Players aim to get cards totaling closest to 9 or multiples of 9

## 🏆 Hand Rankings

### Standard Teen Patti (Highest to Lowest):
1. **Trail (Three of a Kind):** A-A-A > K-K-K > ... > 2-2-2
2. **Pure Sequence (Straight Flush):** A-K-Q of same suit
3. **Sequence (Straight):** A-K-Q of mixed suits
4. **Color (Flush):** Same suit, not in sequence
5. **Pair:** A-A-K > K-K-A > ... > 2-2-3
6. **High Card:** A-K-J > A-K-10 > ...

## 📁 Project Structure

```
Teenpatti-fake_money-real_fun/
├── index.html          # Main HTML file with game interface
├── style.css           # CSS styling for the application
├── script.js           # JavaScript game logic and interactions
└── README.md           # This file
```

## 🛠️ Technical Details

- **Frontend:** Pure HTML5, CSS3, and JavaScript (ES6+)
- **No Backend Required:** Runs entirely in the browser
- **Responsive Design:** CSS Grid and Flexbox for mobile compatibility
- **Local Storage:** Game state can be preserved locally
- **Cross-Platform:** Works on any device with a modern web browser

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create your feature branch:** `git checkout -b feature/AmazingFeature`
3. **Commit your changes:** `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch:** `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### Ideas for Contributions:
- Additional game variations
- Sound effects and animations
- Tournament mode
- Player statistics tracking
- Betting history export
- Mobile app version

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Fun Features

- **Party Mode:** Perfect for social gatherings
- **No Real Money:** Play with fake currency for pure entertainment
- **Easy Reset:** Start new games instantly
- **Track Everything:** Never lose track of who owes what
- **House Rules:** Easily customizable for your group's preferences

## 🐛 Known Issues

- Game state is not persistent across browser sessions
- Manual card dealing required (physical cards)
- No automated winner detection (requires manual input)

## 🔮 Future Enhancements

- [ ] Automatic hand ranking detection
- [ ] Sound effects and animations
- [ ] Tournament bracket system
- [ ] Player avatar system
- [ ] Export game results
- [ ] Multi-language support

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on [GitHub](https://github.com/siddharth-09/Teenpatti-fake_money-real_fun/issues)
- Check existing issues for solutions
- Contribute to discussions

---

**Remember:** This is for entertainment purposes only. Always gamble responsibly and follow local laws regarding card games and gambling.

**Have Fun! 🎊**
