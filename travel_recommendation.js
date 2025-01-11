 //Ensure the DOM is loaded before accessing JSON data
  document.addEventListener('DOMContentLoaded', () => { 
    document.getElementById('search-button').addEventListener('click', () => { 
        const query = document.getElementById('search-bar').value.toLowerCase(); 
        fetch('travel_recommendation.json') 
        .then(response => response.json()) 
        .then(data => { const results = []; 
            
            // Search in countries and their cities
            
            data.countries.forEach(country => { 
                country.cities.forEach(city => { 
                if (city.name.toLowerCase().includes(query)) { 
                    results.push({ 
                        type: 'City', 
                        name: city.name, 
                        imageUrl: city.imageUrl, 
                        description: city.description 
                    }); 
                } 
            }); 
        }); 
        
        // Search in temples
        
        data.temples.forEach(temple => { 
            if (temple.name.toLowerCase().includes(query)) { 
                results.push({ 
                    type: 'Temple', 
                    name: temple.name, 
                    imageUrl: temple.imageUrl, 
                    description: temple.description 
                }); 
            } 
        }); 
        
        // Search in beaches
         
        data.beaches.forEach(beach => { 
            if (beach.name.toLowerCase().includes(query)) { 
                results.push({ 
                    type: 'Beach', name: 
                    beach.name, 
                    imageUrl: beach.imageUrl, 
                    description: beach.description }); 
                } 
            }); 
            displayResults(results); 
        }) 
            .catch(error => console.error('Error fetching JSON data:', error)); 
        }); 
    }); 
    
    function displayResults(results) { 
        const resultsDiv = document.getElementById('display-element'); 
        resultsDiv.innerHTML = ''; 
        if (results.length > 0) { 
            results.forEach(result => { 
                const div = document.createElement('div'); 
                div.classList.add('result'); 
                div.innerHTML = ` 
                <h2>${result.name} (${result.type})</h2> 
                <img class="resized-image" src="${result.imageUrl}" alt="${result.name}"> 
                <p>${result.description}</p> `; 
                resultsDiv.appendChild(div); 
            }); 
            } else { 
                resultsDiv.textContent = 'No results found.'; 
            } }

// Handle Clear Button Click
function handleClear() {
    document.querySelector('.search-bar input').value = '';
    const resultsContainer = document.getElementById('resultsDiv');
    resultsContainer.textContent = '';
}

// Event Listeners
//document.querySelector('.search-bar button:first-of-type').addEventListener('click', handleSearch);
document.querySelector('.search-bar button:last-of-type').addEventListener('click', handleClear);
