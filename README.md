# William West - Kanye & Shakespeare Couplets Generator

A web application that generates unique rhyming couplets by combining Kanye West lyrics with Shakespeare lines. The application runs entirely in the browser, using JavaScript to create interesting and often humorous combinations of modern rap lyrics with classic Shakespearean verse.

## 🌟 Features

### Core Functionality
- Generates unique rhyming couplets combining Kanye West and Shakespeare
- Maintains proper syllable count and rhyme schemes
- Uses an extensive rhyming dictionary to ensure varied and interesting rhymes
- Prioritizes different rhyming words in each couplet
- Generates multiple couplets at once for variety
- Supports saving favorite couplets locally
- Allows drag-and-drop reordering of favorites
- Enables copying favorites as a complete poem

### Modern Web Interface
- Clean, minimalist design with elegant typography
- Smooth animations and transitions
- Responsive layout that works on all devices
- Dark mode support
- Loading indicators for better UX
- Favorites management system with drag-and-drop
- Copy to clipboard functionality
- Visual feedback for all user actions

### Accessibility Features
- Semantic HTML structure
- ARIA labels and roles
- Screen reader friendly
- Keyboard navigable
- High contrast text
- Responsive text sizing
- Reduced motion support

## 🚀 Quick Start

Simply host the static files on any web server. The application requires no server-side processing and runs entirely in the browser.

### File Structure
```
williamwest/
├── index.html          # Main HTML file
├── static/
│   ├── style.css      # Styles
│   ├── script.js      # Application logic
│   ├── lyrics/
│   │   ├── kanye_west.csv        # Kanye West lyrics
│   │   └── shakespeare_sonnets.csv # Shakespeare sonnets
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
  - Local Storage for favorites

- **Data Processing**
  - CSV-formatted lyrics data
  - Client-side syllable counting
  - Client-side rhyme detection
  - Efficient couplet generation algorithm
  - Local storage for user preferences

- **Accessibility**
  - WCAG 2.1 compliant
  - Semantic HTML
  - ARIA attributes
  - Responsive design
  - Reduced motion support
  - High contrast mode

## 🎯 Features

The web interface allows users to:
- Generate new couplets with a single click
- View multiple couplets at once
- Save favorite couplets locally
- Reorder favorites via drag-and-drop
- Copy all favorites as a complete poem
- Switch between generation and favorites views
- Use the application on any device
- Navigate using keyboard or screen reader
- Enjoy dark mode for comfortable reading
- Experience reduced motion if preferred

## 🔧 How It Works

1. **Data Processing**
   - Lyrics are stored in CSV format
   - Each line is analyzed for syllables and rhyme patterns
   - Data is loaded and processed entirely in the browser
   - Lines are filtered for length and formatting

2. **Couplet Generation**
   - Randomly selects a Kanye West line
   - Analyzes the line for syllables and rhyme using an extensive rhyming dictionary
   - Finds a matching Shakespeare line with a different rhyming word
   - Ensures proper syllable count and rhyme scheme
   - Skips lines that can't find a good rhyming partner
   - Generates multiple unique combinations

3. **Rhyming System**
   - Uses a comprehensive rhyming dictionary with multiple word groups
   - Implements longest matching ending algorithm for better rhyme detection
   - Prioritizes different rhyming words in each couplet
   - Maintains strict syllable matching for natural flow
   - Filters out lines that can't find suitable rhyming partners

4. **Web Interface**
   - Loads lyrics data on startup
   - Handles user interactions
   - Manages loading states
   - Displays results with proper formatting
   - Provides error handling
   - Maintains accessibility
   - Supports favorites management:
     - Local storage for persistence
     - Drag-and-drop reordering
     - Copy to clipboard with attribution
     - Visual feedback for all actions

## 📝 Notes

- The couplet generation process filters out lines that:
  - Are too short (less than 3 words) or too long (more than 15 words)
  - Contain brackets (usually stage directions or chorus markers)
  - Contain parenthetical content
  - Are empty or contain only whitespace
  - Don't have suitable rhyming partners with different words
  - Can't maintain proper syllable count
- Due to the strict rhyming requirements, some generation attempts may take longer
- The application works offline after initial load
- Note: The application does not filter for inappropriate content. The lyrics are used as-is from the source material.
- Favorites are stored in the browser's local storage
- Copied poems include attribution to the project
- Drag-and-drop reordering is supported on both desktop and mobile devices

## 🙏 Credits

Inspired by the William/West student CS50 project. This version has been reimagined as a modern, accessible web application that runs entirely in the browser.

## 📄 License

This project is open source and available under the MIT License. 