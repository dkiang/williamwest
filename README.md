# William West - Kanye & Shakespeare Couplets Generator

A web application that generates unique rhyming couplets by combining Kanye West lyrics with Shakespeare lines. The application runs entirely in the browser, using JavaScript to create interesting and often humorous combinations of modern rap lyrics with classic Shakespearean verse.

## 🌟 Features

### Core Functionality
- Generates unique rhyming couplets combining Kanye West and Shakespeare
- Maintains proper syllable count and rhyme schemes
- Provides source attribution and links to original lyrics
- Generates multiple couplets at once for variety

### Modern Web Interface
- Clean, minimalist design with elegant typography
- Smooth animations and transitions
- Responsive layout that works on all devices
- Dark mode support
- Loading indicators for better UX

### Accessibility Features
- Semantic HTML structure
- ARIA labels and roles
- Screen reader friendly
- Keyboard navigable
- High contrast text
- Responsive text sizing

## 🚀 Quick Start

Simply host the static files on any web server. The application requires no server-side processing and runs entirely in the browser.

### File Structure
```
williamwest/
├── index.html          # Main HTML file
├── static/
│   ├── style.css      # Styles
│   ├── script.js      # Application logic
│   ├── data/
│   │   └── lyrics.json # Pre-processed lyrics data
│   ├── kanye.png      # Kanye West portrait
│   └── shakespeare.png # Shakespeare portrait
└── README.md          # This file
```

## 💻 Technical Stack

- **Frontend**
  - HTML5
  - CSS3 (with modern features like CSS Grid and Flexbox)
  - Vanilla JavaScript (ES6+)
  - Web Fonts (Playfair Display, Inter)

- **Data Processing**
  - Pre-processed JSON data
  - Client-side syllable counting
  - Client-side rhyme detection
  - Efficient couplet generation algorithm

- **Accessibility**
  - WCAG 2.1 compliant
  - Semantic HTML
  - ARIA attributes
  - Responsive design

## 🎯 Features

The web interface allows users to:
- Generate new couplets with a single click
- View multiple couplets at once
- See the source of each line
- Access original lyrics on Genius
- Use the application on any device
- Navigate using keyboard or screen reader
- Enjoy dark mode for comfortable reading

## 🔧 How It Works

1. **Data Processing**
   - Lyrics are pre-processed and stored in JSON format
   - Each line is analyzed for syllables and rhyme patterns
   - Data is optimized for quick client-side processing

2. **Couplet Generation**
   - Randomly selects a Kanye West line
   - Analyzes the line for syllables and rhyme
   - Finds a matching Shakespeare line
   - Ensures proper syllable count and rhyme scheme
   - Generates multiple unique combinations

3. **Web Interface**
   - Loads lyrics data on startup
   - Handles user interactions
   - Manages loading states
   - Displays results with proper formatting
   - Provides error handling
   - Maintains accessibility

## 📝 Notes

- The couplet generation process filters out lines that:
  - Are too short or too long
  - Contain inappropriate content
  - Don't have suitable rhyming partners
- Due to the random nature of generation, some couplets may be more coherent than others
- The application works offline after initial load

## 🙏 Credits

Inspired by the William/West student CS50 project. This version has been reimagined as a modern, accessible web application that runs entirely in the browser.

## 📄 License

This project is open source and available under the MIT License. 