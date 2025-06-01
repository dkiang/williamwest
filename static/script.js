// Utility functions for syllable counting and rhyming
const syllableCount = (word) => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const syllables = word.match(/[aeiouy]{1,2}/g);
    return syllables ? syllables.length : 1;
};

const getRhymingWords = (word) => {
    // Simple rhyming dictionary for common endings
    const rhymeGroups = {
        'ing': ['ing', 'ring', 'sing', 'thing', 'wing'],
        'ay': ['ay', 'day', 'say', 'way', 'play'],
        'ight': ['ight', 'night', 'right', 'sight', 'light'],
        'own': ['own', 'down', 'town', 'crown', 'brown'],
        'ake': ['ake', 'make', 'take', 'bake', 'cake'],
        'all': ['all', 'call', 'fall', 'hall', 'ball'],
        'ame': ['ame', 'came', 'fame', 'game', 'name'],
        'and': ['and', 'band', 'hand', 'land', 'stand'],
        'ate': ['ate', 'date', 'fate', 'gate', 'hate'],
        'ear': ['ear', 'dear', 'fear', 'hear', 'near']
    };

    // Find the longest matching ending
    for (const [ending, rhymes] of Object.entries(rhymeGroups)) {
        if (word.endsWith(ending)) {
            return rhymes;
        }
    }
    return [word]; // Return the word itself if no rhyme group found
};

const countLineSyllables = (line) => {
    return line.split(' ').reduce((count, word) => count + syllableCount(word), 0);
};

const findRhymingLine = (line, otherLines, syllableTolerance = 2) => {
    const targetSyllables = countLineSyllables(line);
    const lastWord = line.split(' ').pop().toLowerCase();
    const rhymingWords = getRhymingWords(lastWord);
    
    // Group lines by syllable count for faster lookup
    const syllableGroups = {};
    otherLines.forEach(otherLine => {
        const syllables = countLineSyllables(otherLine);
        if (!syllableGroups[syllables]) {
            syllableGroups[syllables] = [];
        }
        syllableGroups[syllables].push(otherLine);
    });
    
    // Try each syllable difference
    for (let diff = 0; diff <= syllableTolerance; diff++) {
        for (const target of [targetSyllables + diff, targetSyllables - diff]) {
            if (syllableGroups[target]) {
                const matches = syllableGroups[target].filter(otherLine => {
                    const otherLastWord = otherLine.split(' ').pop().toLowerCase();
                    // Only accept if the rhyming word is different from the original word
                    return rhymingWords.includes(otherLastWord) && otherLastWord !== lastWord;
                });
                if (matches.length > 0) {
                    return matches[Math.floor(Math.random() * matches.length)];
                }
            }
        }
    }
    
    // If no different rhyming words found, try one more time with the original word
    // This ensures we can still generate couplets even if no different rhymes are available
    for (let diff = 0; diff <= syllableTolerance; diff++) {
        for (const target of [targetSyllables + diff, targetSyllables - diff]) {
            if (syllableGroups[target]) {
                const matches = syllableGroups[target].filter(otherLine => {
                    const otherLastWord = otherLine.split(' ').pop().toLowerCase();
                    return rhymingWords.includes(otherLastWord);
                });
                if (matches.length > 0) {
                    return matches[Math.floor(Math.random() * matches.length)];
                }
            }
        }
    }
    return null;
};

// CSV parsing utility
const parseCSV = (csvText) => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const values = line.split(',').map(value => value.trim());
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index];
        });
        return obj;
    });
};

// Filter and clean lyrics
const cleanLyrics = (lyrics, columnName) => {
    return lyrics
        .map(line => line[columnName])
        .filter(line => {
            // Filter out lines that are:
            // - Empty or just whitespace
            // - Too short (less than 3 words)
            // - Too long (more than 15 words)
            // - Contain brackets (usually stage directions or chorus markers)
            // - Contain parenthetical content
            if (!line) return false;
            const words = line.split(' ');
            if (words.length < 3 || words.length > 15) return false;
            if (line.includes('[') || line.includes(']')) return false;
            if (line.includes('(') || line.includes(')')) return false;
            return true;
        })
        .map(line => line.replace(/"/g, '')); // Remove all double quotes
};

// Favorites management
const FAVORITES_KEY = 'williamwest_favorites';

const getFavorites = () => {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
};

const saveFavorites = (favorites) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

const addFavorite = (couplet) => {
    const favorites = getFavorites();
    // Check if couplet already exists
    const exists = favorites.some(fav => 
        fav.line1 === couplet.line1 && fav.line2 === couplet.line2
    );
    if (!exists) {
        favorites.push(couplet);
        saveFavorites(favorites);
    }
    return !exists;
};

const removeFavorite = (couplet) => {
    const favorites = getFavorites();
    const newFavorites = favorites.filter(fav => 
        !(fav.line1 === couplet.line1 && fav.line2 === couplet.line2)
    );
    saveFavorites(newFavorites);
    return newFavorites;
};

const renderFavorites = () => {
    const favoritesList = document.getElementById('favorites-list');
    const noFavorites = document.getElementById('no-favorites');
    const favorites = getFavorites();

    favoritesList.innerHTML = '';
    
    if (favorites.length === 0) {
        noFavorites.classList.remove('hidden');
        return;
    }

    noFavorites.classList.add('hidden');
    favorites.forEach(couplet => {
        const block = document.createElement('div');
        block.className = 'couplet-block';
        block.innerHTML = `
            <div class="verse-text">${couplet.line1}<br>${couplet.line2}</div>
            <div class="couplet-actions">
                <i class="fas fa-trash delete-favorite" 
                   aria-label="Remove from favorites"
                   title="Remove from favorites"
                   role="button"
                   tabindex="0"></i>
            </div>
        `;

        // Add delete handler
        const deleteIcon = block.querySelector('.delete-favorite');
        deleteIcon.addEventListener('click', () => {
            removeFavorite(couplet);
            renderFavorites();
        });

        // Add keyboard support
        deleteIcon.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                deleteIcon.click();
            }
        });

        favoritesList.appendChild(block);
    });
};

// Main application code
document.addEventListener('DOMContentLoaded', async () => {
    const generateBtn = document.getElementById('generate-btn');
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const coupletsListDiv = document.getElementById('couplets-list');
    const verseBlock = document.getElementById('verse-block');
    const favoritesBlock = document.getElementById('favorites-block');
    const viewFavoritesBtn = document.getElementById('view-favorites');
    const createAnotherBtn = document.getElementById('create-another');
    
    // View switching
    viewFavoritesBtn.addEventListener('click', () => {
        if (favoritesBlock.classList.contains('hidden')) {
            // Switch to favorites view
            viewFavoritesBtn.textContent = 'Create Another';
            viewFavoritesBtn.setAttribute('aria-pressed', 'true');
            verseBlock.classList.add('hidden');
            favoritesBlock.classList.remove('hidden');
            renderFavorites();
        } else {
            // Switch to generate view
            viewFavoritesBtn.textContent = 'View Favorites';
            viewFavoritesBtn.setAttribute('aria-pressed', 'false');
            favoritesBlock.classList.add('hidden');
            verseBlock.classList.remove('hidden');
            generateVerses();
        }
    });

    // Create Another button handler
    createAnotherBtn.addEventListener('click', () => {
        viewFavoritesBtn.textContent = 'View Favorites';
        viewFavoritesBtn.setAttribute('aria-pressed', 'false');
        favoritesBlock.classList.add('hidden');
        verseBlock.classList.remove('hidden');
        generateVerses();
    });

    // Load lyrics data
    let lyricsData;
    try {
        // Load both CSV files in parallel
        const [kanyeResponse, shakespeareResponse] = await Promise.all([
            fetch('static/lyrics/kanye_west.csv'),
            fetch('static/lyrics/shakespeare_sonnets.csv')
        ]);

        if (!kanyeResponse.ok || !shakespeareResponse.ok) {
            throw new Error(`Failed to load lyrics data: ${kanyeResponse.status} ${shakespeareResponse.status}`);
        }

        const kanyeText = await kanyeResponse.text();
        const shakespeareText = await shakespeareResponse.text();

        // Parse and clean the lyrics
        const kanyeLines = parseCSV(kanyeText);
        const shakespeareLines = parseCSV(shakespeareText);

        lyricsData = {
            kanye: cleanLyrics(kanyeLines, 'lyric_line'),
            shakespeare: cleanLyrics(shakespeareLines, 'sonnet_line')
        };

        // Log some stats
        console.log(`Loaded ${lyricsData.kanye.length} Kanye lines and ${lyricsData.shakespeare.length} Shakespeare lines`);
    } catch (error) {
        console.error('Error loading lyrics:', error);
        errorDiv.textContent = `Error loading lyrics data: ${error.message}. Please try again later.`;
        errorDiv.classList.remove('hidden');
        return;
    }

    async function generateVerses() {
        errorDiv.classList.add('hidden');
        coupletsListDiv.innerHTML = '';
        generateBtn.disabled = true;
        loadingDiv.classList.remove('hidden');

        try {
            const couplets = [];
            const usedRhymes = new Set();
            const maxAttempts = 150;
            let attempts = 0;

            while (couplets.length < 5 && attempts < maxAttempts) {
                attempts++;
                const kanyeLine = lyricsData.kanye[Math.floor(Math.random() * lyricsData.kanye.length)];
                const kanyeWords = kanyeLine.split(' ');
                const lastWord = kanyeWords[kanyeWords.length - 1].toLowerCase();

                if (lastWord in usedRhymes) continue;
                
                const shakespeareMatch = findRhymingLine(kanyeLine, lyricsData.shakespeare);
                if (shakespeareMatch) {
                    couplets.push({
                        line1: kanyeLine,
                        line2: shakespeareMatch
                    });
                    usedRhymes.add(lastWord);
                }
            }

            // Display all couplets
            couplets.forEach(couplet => {
                const block = document.createElement('div');
                block.className = 'couplet-block';
                const isFavorited = getFavorites().some(fav => 
                    fav.line1 === couplet.line1 && fav.line2 === couplet.line2
                );
                
                block.innerHTML = `
                    <div class="verse-text">${couplet.line1}<br>${couplet.line2}</div>
                    <div class="couplet-actions">
                        <i class="fa${isFavorited ? 's' : 'r'} fa-heart favorite-heart ${isFavorited ? 'favorited' : ''}" 
                           aria-label="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}"
                           title="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}"
                           role="button"
                           tabindex="0"></i>
                    </div>
                `;

                // Add favorite handler
                const heartIcon = block.querySelector('.favorite-heart');
                heartIcon.addEventListener('click', () => {
                    if (heartIcon.classList.contains('favorited')) {
                        removeFavorite(couplet);
                        heartIcon.classList.remove('favorited');
                        heartIcon.classList.remove('fas');
                        heartIcon.classList.add('far');
                        heartIcon.setAttribute('aria-label', 'Add to favorites');
                        heartIcon.setAttribute('title', 'Add to favorites');
                    } else {
                        const added = addFavorite(couplet);
                        if (added) {
                            heartIcon.classList.add('favorited');
                            heartIcon.classList.remove('far');
                            heartIcon.classList.add('fas');
                            heartIcon.setAttribute('aria-label', 'Remove from favorites');
                            heartIcon.setAttribute('title', 'Remove from favorites');
                        }
                    }
                });

                // Add keyboard support
                heartIcon.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        heartIcon.click();
                    }
                });

                coupletsListDiv.appendChild(block);
            });

            loadingDiv.classList.add('hidden');
        } catch (error) {
            console.error('Error generating couplets:', error);
            errorDiv.textContent = 'Error generating couplets';
            errorDiv.classList.remove('hidden');
            loadingDiv.classList.add('hidden');
        } finally {
            generateBtn.disabled = false;
        }
    }

    generateBtn.addEventListener('click', generateVerses);
    // Generate on page load
    generateVerses();
}); 