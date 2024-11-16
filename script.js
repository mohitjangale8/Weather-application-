const apiKey = '60196520c1e04089b5071103241611'; 

function getWeather() {
    const city = document.getElementById('city').value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    // Show loading and hide other sections
    document.getElementById('loading').style.display = 'block';
    document.getElementById('weather-result').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                showError(data.error.message || "Unable to fetch weather data.");
            } else {
                displayWeather(data);
            }
        })
        .catch(() => showError("Network error or invalid API key."));
}

function showError(message) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error-message').textContent = message;
    document.getElementById('error-message').style.display = 'block';
}

function displayWeather(data) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('weather-result').style.display = 'block';

    document.getElementById('city-name').textContent = data.location.name;
    document.getElementById('temperature').textContent = `Temperature: ${data.current.temp_c}°C`;
    document.getElementById('condition').textContent = `Condition: ${data.current.condition.text}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.current.wind_kph} km/h`;
    document.getElementById('feels-like').textContent = `Feels Like: ${data.current.feelslike_c}°C`;
    document.getElementById('uv-index').textContent = `UV Index: ${data.current.uv}`;
    document.getElementById('weather-icon').src = data.current.condition.icon;
}
