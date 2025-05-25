// Preloader logic
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const mainContent = document.querySelector('.container');

  setTimeout(() => {
    preloader.style.display = 'none';
    mainContent.style.opacity = 1;
  }, 2200);
});

const cityList = [
  "Alaminos", "Angeles", "Antipolo", "Aurora", "Balanga", "Baler", "Baguio",
  "Batangas City", "Bayombong", "Binangonan", "Cabanatuan", "Calapan",
  "Calamba", "Calasiao", "Caloocan", "Candelaria", "Cavite City", "Cavite",
  "Cauayan", "Dagupan", "Dasmariñas", "Gapan", "Imus", "Iriga", "La Trinidad",
  "Laoag", "Lipa", "Lucena", "Mabalacat", "Malabon", "Mandaluyong", "Manggahan",
  "Manila", "Marikina", "Meycauayan", "Muñoz", "Navotas", "Olongapo", "Palayan",
  "Pasay", "Pasig", "Pulilan", "Quezon City", "Rizal", "San Carlos", 
  "San Fernando (La Union)", "San Fernando (Pampanga)", "San Jose",
  "San Pablo", "San Pedro", "Santa Rosa", "Santo Tomas", "Sariaya",
  "Santiago", "San Juan", "Sorsogon", "Taal", "Tabaco", "Tayabas",
  "Taytay", "Trece Martires", "Urdaneta", "Valenzuela", "Victorias",
  "Victoria", "Vigan", "Zambales", "Inerangan"
];

const input = document.getElementById('locationInput');
const suggestions = document.getElementById('suggestions');

input.addEventListener('input', () => {
  const search = input.value.toLowerCase();
  suggestions.innerHTML = '';

  if (!search) return;

  const matched = cityList.filter(city =>
    city.toLowerCase().startsWith(search)
  );

  matched.forEach(city => {
    const li = document.createElement('li');
    li.textContent = city;
    li.addEventListener('click', () => {
      input.value = city;
      suggestions.innerHTML = '';
    });
    suggestions.appendChild(li);
  });
});

document.getElementById('searchBtn').addEventListener('click', () => {
  const location = input.value.trim();
  if (!location) {
    alert('Please enter a location');
    return;
  }
  getWeather(location);
});

function getWeather(location) {
  const apiKey = '0dbe36f2c3a21887117832be7adff714';
  const query = `${location},Philippines`;
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(query)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.success === false || !data.current) {
        document.getElementById('weatherResult').innerHTML = `<p style="color:red;">${data.error?.info || 'City not found in the Philippines'}</p>`;
        return;
      }
      displayWeather(data);
    })
    .catch(() => {
      document.getElementById('weatherResult').innerHTML = `<p style="color:red;">Error fetching weather data</p>`;
    });
}

function displayWeather(data) {
  const iconUrl = data.current.weather_icons[0];

  const weatherHTML = `
    <div class="weather-card">
      <h2>${data.location.name}, ${data.location.country}</h2>
      <div class="weather-main">
        <img src="${iconUrl}" alt="Weather icon" class="weather-icon" />
        <div class="weather-info">
          <p class="temp">${data.current.temperature} °C</p>
          <p class="condition">${data.current.weather_descriptions[0]}</p>
        </div>
      </div>
      <div class="weather-details">
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind Speed: ${data.current.wind_speed} km/h</p>
      </div>
    </div>
  `;
  document.getElementById('weatherResult').innerHTML = weatherHTML;
}