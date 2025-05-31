# Changelog

## [Unreleased]
- Removed author labels from output; couplets are now printed as a single two-line verse to appear as one complete poem.
- Optimized couplet generation by:
  - Always starting with Kanye lines to reduce search space
  - Tracking used rhyming words to prevent repetition
  - Removing redundant Shakespeare-first attempts
- Increased variability in rhyming pairs by:
  - Expanding syllable count range (4-16 syllables)
  - Adding randomization to rhyming word selection
  - Implementing a more flexible matching system that allows for slight syllable count differences
  - Shuffling input lines to increase variety in selection
  - Starting Shakespeare line search from random positions to ensure different matches for the same Kanye lyrics
- Performance optimizations:
  - Added caching for syllable counts and rhyming words
  - Implemented syllable-based grouping for faster line matching
  - Added early exit for high-quality matches
  - Optimized data structures and reduced redundant computations
- Web interface:
  - Created Flask backend with RESTful API
  - Implemented modern, responsive frontend
  - Added interactive controls for number of couplets
  - Included loading states and error handling
  - Styled with clean, modern design using CSS variables
- Frontend updates:
  - Display all 5 couplets at once, each as a block with Kanye avatar and blue source link
  - Removed the "Built by Zuck" footer
  - Loading spinner now only appears while couplets are being generated
  - Updated layout to match reference screenshot more closely 