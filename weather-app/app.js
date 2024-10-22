// Your OpenWeatherMap API key
const apiKey = 'b2acf8b9d0fc4c12c24b5b937607d407';

// Function to fetch weather data from the API
async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Check if city is found
    if (data.cod === '404') {
      displayError(`City not found: ${city}`);
    } else {
      displayWeather(data);
    }
  } catch (error) {
    console.error('Error fetching the weather data:', error);
  }
}

// Function to display weather information
function displayWeather(data) {
  const weatherInfo = document.getElementById('weatherInfo');
  const { name, main, weather } = data;

  weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <p>Temperature: ${main.temp} °C</p>
    <p>Humidity: ${main.humidity} %</p>
    <p>Condition: ${weather[0].description}</p>
    <p>Feels Like: ${main.feels_like}</p>
  `;
}

// Function to display an error message
function displayError(message) {
  const weatherInfo = document.getElementById('weatherInfo');
  weatherInfo.innerHTML = `<p style="color: red;">${message}</p>`;
}

// Event listener for the "Get Weather" button
document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
  if (city) {
    getWeather(city);
  } else {
    displayError('Please enter a city name.');
  }
});
