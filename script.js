const apiKey = '23000022d4517b8f212200ed129bb1ee'; 
const searchButton = document.getElementById('search-button');
const locationInput = document.getElementById('location-input');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');
const modeToggle = document.getElementById('mode-toggle');
let darkMode = false;

searchButton.addEventListener('click', fetchWeather);
modeToggle.addEventListener('click', toggleMode);

function fetchWeather() {
  const location = locationInput.value;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) throw new Error('Invalid location');
      return response.json();
    })
    .then(data => {
      displayWeather(data);
      errorMessage.textContent = '';
    })
    .catch(err => {
      errorMessage.textContent = err.message;
      weatherInfo.style.display = 'none';
    });
}

function displayWeather(data) {
  weatherInfo.innerHTML = `
    <h2>${data.name}</h2>
    <p>Temperature: ${data.main.temp} °C</p>
    <p>Humidity: ${data.main.humidity} %</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
    <p>Weather: ${data.weather[0].description}</p>
    <p>Date & Time: ${new Date().toLocaleString()}</p>
  `;
  weatherInfo.style.display = 'block';
}

function toggleMode() {
  darkMode = !darkMode;
  document.body.classList.toggle('dark-mode', darkMode);
  modeToggle.textContent = darkMode ? 'Light Mode' : 'Dark Mode';
}
