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
    // Expanded rhyming dictionary with more word groups
    const rhymeGroups = {
        'ing': ['ring', 'sing', 'thing', 'wing', 'bring', 'cling', 'fling', 'king', 'ming', 'ping', 'spring', 'sting', 'swing', 'wing'],
        'ay': ['day', 'say', 'way', 'play', 'bay', 'clay', 'gray', 'hay', 'lay', 'may', 'pay', 'ray', 'stay', 'tray'],
        'ight': ['night', 'right', 'sight', 'light', 'bright', 'fight', 'flight', 'height', 'knight', 'might', 'tight', 'white'],
        'own': ['down', 'town', 'crown', 'brown', 'clown', 'drown', 'frown', 'gown', 'renown', 'thrown'],
        'ake': ['make', 'take', 'bake', 'cake', 'fake', 'lake', 'rake', 'shake', 'snake', 'stake', 'wake'],
        'all': ['call', 'fall', 'hall', 'ball', 'small', 'tall', 'wall', 'stall', 'thrall'],
        'ame': ['came', 'fame', 'game', 'name', 'blame', 'flame', 'frame', 'same', 'shame', 'tame'],
        'and': ['band', 'hand', 'land', 'stand', 'brand', 'grand', 'sand', 'strand'],
        'ate': ['date', 'fate', 'gate', 'hate', 'late', 'mate', 'rate', 'state', 'wait'],
        'ear': ['dear', 'fear', 'hear', 'near', 'clear', 'gear', 'peer', 'sear', 'tear', 'year'],
        'end': ['bend', 'friend', 'lend', 'send', 'spend', 'trend', 'wend'],
        'est': ['best', 'chest', 'guest', 'nest', 'rest', 'test', 'west', 'zest'],
        'ice': ['dice', 'nice', 'price', 'rice', 'slice', 'spice', 'twice', 'vice'],
        'ine': ['fine', 'line', 'mine', 'nine', 'pine', 'shine', 'sign', 'wine'],
        'ing': ['bring', 'cling', 'fling', 'king', 'ring', 'sing', 'spring', 'sting', 'swing', 'thing', 'wing'],
        'ink': ['blink', 'drink', 'link', 'pink', 'sink', 'think', 'wink'],
        'ire': ['desire', 'fire', 'hire', 'tire', 'wire'],
        'ite': ['bite', 'kite', 'light', 'might', 'night', 'right', 'sight', 'tight', 'white'],
        'ive': ['alive', 'drive', 'five', 'give', 'live', 'strive', 'thrive'],
        'old': ['bold', 'cold', 'fold', 'gold', 'hold', 'sold', 'told'],
        'one': ['alone', 'bone', 'cone', 'done', 'gone', 'known', 'stone', 'tone'],
        'ong': ['long', 'song', 'strong', 'wrong'],
        'ood': ['food', 'good', 'hood', 'mood', 'stood', 'wood'],
        'ook': ['book', 'cook', 'look', 'took'],
        'ool': ['cool', 'fool', 'pool', 'school', 'tool'],
        'oon': ['moon', 'noon', 'soon', 'spoon'],
        'ore': ['more', 'score', 'shore', 'store', 'tore'],
        'orn': ['born', 'corn', 'horn', 'morn', 'thorn', 'worn'],
        'ose': ['close', 'nose', 'pose', 'rose', 'those'],
        'ost': ['cost', 'lost', 'most', 'post'],
        'ove': ['above', 'dove', 'glove', 'love', 'move', 'prove'],
        'own': ['brown', 'clown', 'crown', 'down', 'drown', 'frown', 'gown', 'town'],
        'uck': ['buck', 'duck', 'luck', 'stuck', 'truck'],
        'ull': ['bull', 'full', 'pull'],
        'ump': ['bump', 'dump', 'jump', 'lump', 'pump'],
        'ung': ['hung', 'lung', 'rung', 'sung', 'tongue'],
        'ure': ['cure', 'pure', 'sure'],
        'ush': ['bush', 'push', 'rush'],
        'ust': ['dust', 'just', 'must', 'trust'],
        'ute': ['cute', 'mute', 'route'],
        'y': ['by', 'cry', 'dry', 'fly', 'high', 'my', 'sky', 'try', 'why']
    };

    // Find the longest matching ending
    let bestMatch = '';
    let bestRhymes = [];
    
    for (const [ending, rhymes] of Object.entries(rhymeGroups)) {
        if (word.endsWith(ending) && ending.length > bestMatch.length) {
            bestMatch = ending;
            bestRhymes = rhymes;
        }
    }
    
    // If we found a rhyme group, filter out the original word
    if (bestRhymes.length > 0) {
        return bestRhymes.filter(rhyme => rhyme !== word);
    }
    
    // If no rhyme group found, return empty array to force finding a different word
    return [];
};

const countLineSyllables = (line) => {
    return line.split(' ').reduce((count, word) => count + syllableCount(word), 0);
};

const findRhymingLine = (line, otherLines, syllableTolerance = 2) => {
    const targetSyllables = countLineSyllables(line);
    const lastWord = line.split(' ').pop().toLowerCase();
    const rhymingWords = getRhymingWords(lastWord);
    
    // If no rhyming words found, try a different line
    if (rhymingWords.length === 0) {
        return null;
    }
    
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
                    return rhymingWords.includes(otherLastWord);
                });
                if (matches.length > 0) {
                    return matches[Math.floor(Math.random() * matches.length)];
                }
            }
        }
    }
    
    // If no match found with different rhyming words, return null
    // This will cause the generator to try a different line
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
    const copyButton = document.getElementById('copy-favorites');
    const favorites = getFavorites();

    favoritesList.innerHTML = '';
    
    if (favorites.length === 0) {
        noFavorites.classList.remove('hidden');
        copyButton.disabled = true;
        return;
    }

    noFavorites.classList.add('hidden');
    copyButton.disabled = false;

    favorites.forEach((couplet, index) => {
        const block = document.createElement('div');
        block.className = 'couplet-block';
        block.draggable = true;
        block.dataset.index = index;
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

        // Add drag and drop event listeners
        block.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', index);
            block.classList.add('dragging');
        });

        block.addEventListener('dragend', () => {
            block.classList.remove('dragging');
        });

        block.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingBlock = document.querySelector('.dragging');
            if (draggingBlock !== block) {
                block.classList.add('drag-over');
            }
        });

        block.addEventListener('dragleave', () => {
            block.classList.remove('drag-over');
        });

        block.addEventListener('drop', (e) => {
            e.preventDefault();
            block.classList.remove('drag-over');
            const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
            const toIndex = parseInt(block.dataset.index);
            
            if (fromIndex !== toIndex) {
                const newFavorites = [...favorites];
                const [movedItem] = newFavorites.splice(fromIndex, 1);
                newFavorites.splice(toIndex, 0, movedItem);
                saveFavorites(newFavorites);
                renderFavorites();
            }
        });

        // Add delete handler
        const deleteIcon = block.querySelector('.delete-favorite');
        deleteIcon.addEventListener('click', () => {
            removeFavorite(couplet);
            renderFavorites();
        });

        // Add keyboard support for delete
        deleteIcon.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                deleteIcon.click();
            }
        });

        favoritesList.appendChild(block);
    });
};

// Add copy to clipboard functionality
document.getElementById('copy-favorites').addEventListener('click', () => {
    const favorites = getFavorites();
    if (favorites.length === 0) return;

    const poem = favorites.map(couplet => 
        `${couplet.line1}\n${couplet.line2}`
    ).join('\n\n') + '\n\nGenerated by the William/West project at kiang.net/west';

    // Create a temporary textarea element
    const textArea = document.createElement('textarea');
    textArea.value = poem;
    
    // Make the textarea out of viewport
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    
    // Select and copy
    textArea.select();
    textArea.setSelectionRange(0, 99999); // For mobile devices
    
    let success = false;
    try {
        success = document.execCommand('copy');
    } catch (err) {
        // Silent fail - we'll show feedback via the button state
    }
    
    // Clean up
    document.body.removeChild(textArea);
    
    // Update button state
    const button = document.getElementById('copy-favorites');
    if (success) {
        button.classList.add('copied');
        setTimeout(() => {
            button.classList.remove('copied');
        }, 2000);
    } else {
        button.textContent = 'Copy Failed';
        setTimeout(() => {
            button.textContent = 'Copy to Clipboard';
        }, 2000);
    }
});

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
    const mainControls = document.getElementById('main-controls');
    
    // View switching
    viewFavoritesBtn.addEventListener('click', () => {
        if (favoritesBlock.classList.contains('hidden')) {
            // Switch to favorites view
            viewFavoritesBtn.textContent = 'Create Another';
            viewFavoritesBtn.setAttribute('aria-pressed', 'true');
            verseBlock.classList.add('hidden');
            mainControls.classList.add('hidden');
            favoritesBlock.classList.remove('hidden');
            renderFavorites();
        } else {
            // Switch to generate view
            viewFavoritesBtn.textContent = 'View Favorites';
            viewFavoritesBtn.setAttribute('aria-pressed', 'false');
            favoritesBlock.classList.add('hidden');
            mainControls.classList.remove('hidden');
            verseBlock.classList.remove('hidden');
            generateVerses();
        }
    });

    // Create Another button handler
    createAnotherBtn.addEventListener('click', () => {
        viewFavoritesBtn.textContent = 'View Favorites';
        viewFavoritesBtn.setAttribute('aria-pressed', 'false');
        favoritesBlock.classList.add('hidden');
        mainControls.classList.remove('hidden');
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
                        line1: shakespeareMatch,  // Shakespeare line first
                        line2: kanyeLine         // Kanye line second
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