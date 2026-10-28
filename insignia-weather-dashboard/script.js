document.addEventListener('DOMContentLoaded', () => {
  const temperatureEl = document.getElementById('temperature');
  const descriptionEl = document.getElementById('description');
  const detailsEl = document.getElementById('details');
  const alertEl = document.getElementById('alert');

  // Configuration
  const API_KEY = "your_openweather_api_key_here";
  const CITY_NAME = "Amsterdam";

  // Fetch weather data
  async function fetchWeather() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric&lang=en`
      );
      const data = await response.json();

      if (data.cod === 200) {
        const { main, weather, sys } = data;
        const temp = main.temp;
        const desc = weather[0].description;
        const humidity = main.humidity;
        const windSpeed = main.wind_speed;
        const country = sys.country;

        temperatureEl.textContent = `${temp}°C`;
        descriptionEl.textContent = desc;
        detailsEl.innerHTML = `Humidity: ${humidity}% | Wind: ${windSpeed} m/s | Country: ${country}`;

        // Check for alerts (example logic)
        if (desc.includes('thunder') || desc.includes('storm')) {
          alertEl.style.display = 'block';
        } else {
          alertEl.style.display = 'none';
        }
      } else {
        temperatureEl.textContent = 'Error loading data';
        descriptionEl.textContent = 'Try again later or check your API key.';
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      temperatureEl.textContent = 'Network error';
      descriptionEl.textContent = 'Check your internet connection or API key.';
    }
  }

  fetchWeather();
});

// Optional: Auto-refresh every 5 minutes
// setInterval(fetchWeather, 300000); // 5 minutes