# Kanye-Shakespeare Rhyming Couplets Generator

This project generates rhyming couplets by alternating lines from Kanye West lyrics with lines from Shakespeare's works. Each couplet is created by finding lines that rhyme and have a similar number of syllables.

## Features

- Combines Kanye West lyrics with Shakespeare lines to create unique rhyming couplets
- Ensures lines have similar syllable counts for better rhythm
- Cleans and processes lyrics to remove parenthetical content and extra whitespace
- Uses natural language processing to identify rhymes and count syllables

## Requirements

- Python 3.7+
- Required packages (install using `pip install -r requirements.txt`):
  - pandas
  - pronouncing
  - nltk

## Installation

1. Clone this repository
2. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

Simply run the script:
```bash
python generate_couplets.py
```

The script will:
1. Read the lyrics from `lyrics/kanye_west.csv` and `lyrics/shakespeare.csv`
2. Generate 5 rhyming couplets
3. Print the results to the console

## How it Works

1. The script reads both CSV files containing the lyrics
2. It cleans the lines by removing parenthetical content and extra whitespace
3. For each line, it:
   - Counts the number of syllables
   - Identifies rhyming words
   - Matches lines with similar syllable counts and rhyming endings
4. Generates couplets by alternating between Kanye and Shakespeare lines
5. Ensures each couplet has a good rhyme and similar syllable count

## Output Example

```
Generated Rhyming Couplets:

Couplet 1:
Kanye:    Sing 'til the power of the Lord comes down
Shakespeare: And dig deep trenches in thy beauty's field

Couplet 2:
Kanye:    We need you sing 'til the power
Shakespeare: That use is not forbidden usury
```

## Notes

- The script filters out very short lines (less than 4 words) and very long lines (more than 15 syllables)
- It uses a syllable tolerance of 1 to allow for some variation in line length
- The quality of rhymes may vary depending on the available lines in the source files 