import pandas as pd
import pronouncing
import random
import nltk
from typing import List, Tuple, Dict, Set
from collections import defaultdict

# Download required NLTK data
nltk.download('punkt', quiet=True)

class LineProcessor:
    def __init__(self):
        self.syllable_cache: Dict[str, int] = {}
        self.rhyme_cache: Dict[str, List[str]] = {}
        self.word_tokenizer = nltk.word_tokenize

    def count_syllables(self, line: str) -> int:
        """Count syllables with caching."""
        if line in self.syllable_cache:
            return self.syllable_cache[line]
        
        words = self.word_tokenizer(line.lower())
        count = 0
        for word in words:
            if word in self.syllable_cache:
                count += self.syllable_cache[word]
            else:
                pronunciations = pronouncing.phones_for_word(word)
                if pronunciations:
                    word_syllables = pronouncing.syllable_count(pronouncing.phones_for_word(word)[0])
                    self.syllable_cache[word] = word_syllables
                    count += word_syllables
        self.syllable_cache[line] = count
        return count

    def get_rhyming_words(self, line: str) -> List[str]:
        """Get rhyming words with caching."""
        if line in self.rhyme_cache:
            return self.rhyme_cache[line]
        
        words = self.word_tokenizer(line.lower())
        if not words:
            return []
        last_word = words[-1]
        
        if last_word in self.rhyme_cache:
            rhymes = self.rhyme_cache[last_word]
        else:
            rhymes = pronouncing.rhymes(last_word)
            self.rhyme_cache[last_word] = rhymes
            
        self.rhyme_cache[line] = rhymes
        return rhymes

def clean_line(line: str) -> str:
    """Clean a line of text by removing parenthetical content and extra whitespace."""
    while '(' in line and ')' in line:
        start = line.find('(')
        end = line.find(')', start)
        if end == -1:
            break
        line = line[:start] + line[end+1:]
    return line.strip()

def find_rhyming_line(line: str, 
                     other_lines: List[str], 
                     processor: LineProcessor,
                     syllable_tolerance: int = 2) -> Tuple[str, float]:
    """Find a line that rhymes with the given line and has a similar syllable count."""
    target_syllables = processor.count_syllables(line)
    rhyming_words = processor.get_rhyming_words(line)
    random.shuffle(rhyming_words)
    
    # Group other lines by syllable count for faster lookup
    syllable_groups = defaultdict(list)
    for other_line in other_lines:
        syllables = processor.count_syllables(other_line)
        syllable_groups[syllables].append(other_line)
    
    best_match = None
    best_score = 0
    start_idx = random.randint(0, len(other_lines) - 1)
    
    # Try each syllable difference
    for syllable_diff in range(syllable_tolerance + 1):
        # Check both above and below target syllable count
        for target in [target_syllables + syllable_diff, target_syllables - syllable_diff]:
            if target in syllable_groups:
                # Create rotated list for this syllable group
                group_lines = syllable_groups[target]
                rotated_lines = group_lines[start_idx % len(group_lines):] + group_lines[:start_idx % len(group_lines)]
                
                for other_line in rotated_lines:
                    other_words = processor.word_tokenizer(other_line.lower())
                    if other_words and other_words[-1] in rhyming_words:
                        score = (1.0 / (1 + syllable_diff)) * (1 + 0.1 * random.random())
                        if score > best_score:
                            best_score = score
                            best_match = other_line
                            if score > 0.8:  # Early exit if we find a very good match
                                return best_match, best_score
    
    return best_match, best_score

def generate_couplets(kanye_lines: List[str], shakespeare_lines: List[str], num_couplets: int = 5) -> List[Tuple[str, str]]:
    """Generate rhyming couplets alternating between Kanye and Shakespeare lines."""
    processor = LineProcessor()
    couplets = []
    used_rhymes: Set[str] = set()
    
    # Pre-process and filter lines
    kanye_lines = [clean_line(line) for line in kanye_lines if len(line.split()) > 3]
    shakespeare_lines = [clean_line(line) for line in shakespeare_lines if len(line.split()) > 3]
    
    # Filter by syllable count and cache results
    kanye_lines = [line for line in kanye_lines 
                  if 4 <= processor.count_syllables(line) <= 16]
    shakespeare_lines = [line for line in shakespeare_lines 
                        if 4 <= processor.count_syllables(line) <= 16]
    
    # Shuffle lines
    random.shuffle(kanye_lines)
    random.shuffle(shakespeare_lines)
    
    attempts = 0
    max_attempts = 150
    
    while len(couplets) < num_couplets and attempts < max_attempts:
        attempts += 1
        kanye_line = random.choice(kanye_lines)
        kanye_words = processor.word_tokenizer(kanye_line.lower())
        
        if not kanye_words:
            continue
            
        last_word = kanye_words[-1]
        if last_word in used_rhymes:
            continue
            
        shakespeare_match, score = find_rhyming_line(
            kanye_line, shakespeare_lines, processor)
        
        if shakespeare_match and score > 0.4:
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
    for line1, line2 in couplets:
        print(f"{line1}")
        print(f"{line2}\n")

if __name__ == "__main__":
    main() 