# William West - Kanye & Shakespeare Couplets Generator

A modern web application that generates unique rhyming couplets by combining Kanye West lyrics with Shakespeare's works. Each couplet is carefully crafted to ensure proper rhyming and syllable matching, presented in a beautiful, accessible interface.

## 🌟 Features

### Core Functionality
- Generates unique rhyming couplets by combining Kanye West and Shakespeare lines
- Ensures proper syllable matching for natural rhythm
- Cleans and processes lyrics for optimal results
- Uses advanced NLP for rhyme detection and syllable counting
- Prevents repetition of rhyming pairs

### Modern Web Interface
- Real-time couplet generation
- Beautiful, responsive design
- Author portraits in header
- Dark mode support
- High contrast mode
- Reduced motion preferences
- Full keyboard navigation
- Screen reader optimization
- Mobile-first approach

### Accessibility Features
- Semantic HTML structure
- ARIA roles and labels
- Keyboard navigation
- Screen reader support
- Focus management
- High contrast mode
- Reduced motion
- Proper color contrast
- Touch-friendly targets
- Responsive text sizing

## 🚀 Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Configure your web server to serve the Flask application
4. Set up your production environment variables

## 💻 Technical Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **Processing**: NLTK, pronouncing
- **Data**: pandas
- **Accessibility**: WCAG 2.1 compliant
- **Design**: Mobile-first, responsive
- **Hosting**: Compatible with any Python web server

## 🔧 Requirements

- Python 3.7+
- Required packages:
  - pandas
  - pronouncing
  - nltk
  - flask
- Web server with Python support (e.g., Gunicorn, uWSGI)

## 📱 Features

The web interface provides:
- One-click couplet generation
- View all 5 couplets at once
- Source attribution for Kanye lyrics
- Dark mode support
- Keyboard navigation
- Screen reader support
- Touch-friendly interface

## 🎯 How It Works

1. **Data Processing**
   - Reads Kanye and Shakespeare lyrics
   - Cleans and normalizes text
   - Removes parenthetical content
   - Filters by length and quality

2. **Couplet Generation**
   - Counts syllables in each line
   - Identifies rhyming words
   - Matches lines with similar syllable counts
   - Ensures proper alternation
   - Prevents repetition

3. **Web Interface**
   - Real-time generation
   - Responsive layout
   - Accessible design
   - System preference adaptation
   - Error handling

## 📝 Notes

- Filters: 4-16 syllables per line
- Syllable tolerance for natural variation
- Quality varies with available source material
- Adapts to system preferences
- Fully accessible interface

## 🙏 Credits

Inspired by the William/West student CS50 project.

## 📄 License

This project is open source and available under the MIT License. 