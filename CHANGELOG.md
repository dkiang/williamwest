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