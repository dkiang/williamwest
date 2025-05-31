document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const coupletsListDiv = document.getElementById('couplets-list');

    async function generateVerses() {
        errorDiv.classList.add('hidden');
        coupletsListDiv.innerHTML = '';
        generateBtn.disabled = true;
        loadingDiv.classList.remove('hidden');

        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ num_couplets: 5 })
            });
            const data = await response.json();
            loadingDiv.classList.add('hidden'); // Hide spinner as soon as we get the response
            if (!data.success) {
                throw new Error(data.error || 'Failed to generate couplets');
            }
            // Display all couplets
            data.couplets.forEach(couplet => {
                const block = document.createElement('div');
                block.className = 'couplet-block';
                block.innerHTML = `
                    <div style="flex:1;">
                        <div class="verse-text">${couplet.line1}<br>${couplet.line2}</div>
                        <div class="verse-meta">
                            ${couplet.source && couplet.source_url ? `<a href="${couplet.source_url}" class="kanye-source" target="_blank">${couplet.source}</a>` : ''}
                        </div>
                    </div>
                `;
                coupletsListDiv.appendChild(block);
            });
        } catch (error) {
            errorDiv.textContent = error.message;
            errorDiv.classList.remove('hidden');
            loadingDiv.classList.add('hidden'); // Keep this one for error cases
        } finally {
            generateBtn.disabled = false;
        }
    }

    generateBtn.addEventListener('click', generateVerses);
    // Generate on page load
    generateVerses();
}); 