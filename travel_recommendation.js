// Fetch API Data
async function fetchRecommendations() {
    try {
        const response = await fetch('travel_recommendation.json');
        const data = await response.json();
        console.log(data); // Debugging log to verify fetched data
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Handle Search Button Click
async function handleSearch() {
    const searchInput = document.querySelector('.search-bar input').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    const data = await fetchRecommendations();
    let recommendations = [];

    if (['beach', 'beaches'].includes(searchInput)) {
        recommendations = data.beaches;
    } else if (['temple', 'temples'].includes(searchInput)) {
        recommendations = data.temples;
    } else {
        recommendations = data.countries.filter(country =>
            country.name.toLowerCase().includes(searchInput)
        ).flatMap(country => country.cities);
    }

    if (recommendations.length > 0) {
        recommendations.forEach(item => {
            const recommendationCard = document.createElement('div');
            recommendationCard.className = 'recommendation-card';
            recommendationCard.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" />
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            `;
            resultsContainer.appendChild(recommendationCard);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found. Try a different keyword.</p>';
    }
}

// Handle Clear Button Click
function handleClear() {
    document.querySelector('.search-bar input').value = '';
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
}

// Event Listeners
document.querySelector('.search-bar button:first-of-type').addEventListener('click', handleSearch);
document.querySelector('.search-bar button:last-of-type').addEventListener('click', handleClear);
