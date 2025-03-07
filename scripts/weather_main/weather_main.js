const apiKey = 'a7c1148e1447e04cbee93b861207f1e5';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
			temperatureElement.textContent = `${Math.round((data.main.temp * 9/5) + 32)}°F`;
            descriptionElement.textContent = data.weather[0].description;
			const weatherCondition = data.weather[0].main.toLowerCase();
			
			// Map weather condition to image URL
			let imageUrl;
			switch (weatherCondition) {
			  case 'clear':
				imageUrl = 'url(../../Images/clear.webp)';
				break;
			  case 'clouds':
				imageUrl = 'url(../../Images/cloudy.webp)';
				break;
			  case 'rain':
				imageUrl = 'url(../../Images/rainy.webp)';
				break;
			  // Add more cases for other weather conditions as needed
			  default:
				imageUrl = 'url(../../Images/weatherCard.jpg)';
			}

			// Set background image dynamically
			document.body.style.backgroundImage = imageUrl;
						
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}