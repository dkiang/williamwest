import pandas as pd
import pronouncing
import random
import nltk
from typing import List, Tuple

# Download required NLTK data
nltk.download('punkt', quiet=True)

def clean_line(line: str) -> str:
    """Clean a line of text by removing parenthetical content and extra whitespace."""
    # Remove content in parentheses
    while '(' in line and ')' in line:
        start = line.find('(')
        end = line.find(')', start)
        if end == -1:  # Handle unmatched parentheses
            break
        line = line[:start] + line[end+1:]
    return line.strip()

def count_syllables(line: str) -> int:
    """Count the number of syllables in a line."""
    words = nltk.word_tokenize(line.lower())
    count = 0
    for word in words:
        pronunciations = pronouncing.phones_for_word(word)
        if pronunciations:
            count += pronouncing.syllable_count(pronouncing.phones_for_word(word)[0])
    return count

def get_rhyming_words(line: str) -> List[str]:
    """Get a list of words that rhyme with the last word in the line."""
    words = nltk.word_tokenize(line.lower())
    if not words:
        return []
    last_word = words[-1]
    return pronouncing.rhymes(last_word)

def find_rhyming_line(line: str, other_lines: List[str], syllable_tolerance: int = 2) -> Tuple[str, float]:
    """Find a line that rhymes with the given line and has a similar syllable count."""
    target_syllables = count_syllables(line)
    rhyming_words = get_rhyming_words(line)
    
    # Shuffle rhyming words to increase variability
    random.shuffle(rhyming_words)
    
    best_match = None
    best_score = 0
    
    # Start from a random position in other_lines
    start_idx = random.randint(0, len(other_lines) - 1)
    
    # Try to find matches with slightly different syllable counts
    for syllable_diff in range(syllable_tolerance + 1):
        # Create a rotated list starting from random position
        rotated_lines = other_lines[start_idx:] + other_lines[:start_idx]
        
        for other_line in rotated_lines:
            other_syllables = count_syllables(other_line)
            if abs(target_syllables - other_syllables) == syllable_diff:
                other_words = nltk.word_tokenize(other_line.lower())
                if other_words and other_words[-1] in rhyming_words:
                    # Calculate a score that slightly favors different syllable counts
                    # to increase variability while still maintaining reasonable matches
                    score = (1.0 / (1 + syllable_diff)) * (1 + 0.1 * random.random())
                    if score > best_score:
                        best_score = score
                        best_match = other_line
    
    return best_match, best_score

def generate_couplets(kanye_lines: List[str], shakespeare_lines: List[str], num_couplets: int = 5) -> List[Tuple[str, str]]:
    """Generate rhyming couplets alternating between Kanye and Shakespeare lines."""
    couplets = []
    used_rhymes = set()  # Track used rhyming words to avoid repetition
    
    # Clean and filter lines
    kanye_lines = [clean_line(line) for line in kanye_lines if len(line.split()) > 3]
    shakespeare_lines = [clean_line(line) for line in shakespeare_lines if len(line.split()) > 3]
    
    # Remove lines that are too short or too long, but with more flexible bounds
    kanye_lines = [line for line in kanye_lines if 4 <= count_syllables(line) <= 16]
    shakespeare_lines = [line for line in shakespeare_lines if 4 <= count_syllables(line) <= 16]
    
    # Shuffle the lines to increase variability in selection
    random.shuffle(kanye_lines)
    random.shuffle(shakespeare_lines)
    
    attempts = 0
    max_attempts = 150  # Increased to allow for more attempts to find varied matches
    
    while len(couplets) < num_couplets and attempts < max_attempts:
        attempts += 1
        
        # Start with a random Kanye line
        kanye_line = random.choice(kanye_lines)
        kanye_words = nltk.word_tokenize(kanye_line.lower())
        if not kanye_words:
            continue
            
        last_word = kanye_words[-1]
        if last_word in used_rhymes:
            continue
            
        shakespeare_match, score = find_rhyming_line(kanye_line, shakespeare_lines)
        
        if shakespeare_match and score > 0.4:  # Slightly lowered threshold to allow more matches
            couplets.append((kanye_line, shakespeare_match))
            used_rhymes.add(last_word)
    
    return couplets

def main():
    # Read the CSV files
    kanye_df = pd.read_csv('lyrics/kanye_west.csv')
    shakespeare_df = pd.read_csv('lyrics/shakespeare_sonnets.csv')
    
    # Extract the lines
    kanye_lines = kanye_df['lyric_line'].tolist()
    shakespeare_lines = shakespeare_df['sonnet_line'].tolist()
    
    # Generate couplets
    couplets = generate_couplets(kanye_lines, shakespeare_lines, num_couplets=5)
    
    # Print the results
    print("\nGenerated Rhyming Couplets:\n")
    for i, (line1, line2) in enumerate(couplets, 1):
        print(f"{line1}")
        print(f"{line2}\n")

if __name__ == "__main__":
    main() 