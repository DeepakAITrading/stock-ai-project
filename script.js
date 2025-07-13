// script.js
document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchButton');
    const symbolInput = document.getElementById('symbolInput');
    const resultsContainer = document.getElementById('resultsContainer');

    // IMPORTANT: Replace this with your actual Render API URL
    const API_BASE_URL = 'https://stock-ai-backend-q9qw.onrender.com/';

    fetchButton.addEventListener('click', () => {
        const symbol = symbolInput.value.toUpperCase();
        if (!symbol) {
            alert('Please enter a stock symbol.');
            return;
        }

        resultsContainer.innerHTML = '<p>Loading...</p>';

        // Fetch data from your backend API on Render
        fetch(`${API_BASE_URL}/api/company-details?symbol=${symbol}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                // Display the data
                resultsContainer.innerHTML = `
                    <h2>${data.name} (${data.ticker})</h2>
                    <p><strong>Exchange:</strong> ${data.exchange}</p>
                    <p><strong>Industry:</strong> ${data.finnhubIndustry}</p>
                    <p><strong>Market Cap:</strong> ${data.marketCapitalization} Million</p>
                    <img src="${data.logo}" alt="${data.name} Logo" class="logo">
                `;
            })
            .catch(error => {
                resultsContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
                console.error('Error fetching data:', error);
            });
    });
});
