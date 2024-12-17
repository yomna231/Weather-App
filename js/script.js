
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("submit1");
const weatherContainer = document.getElementById("weather-container");
const dataList = document.getElementById("locations");


function fetchWeather(location) {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=177a54d84a9241dc9d091851241012&q=${location}&days=3`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Could not fetch weather data. Please try again.");
        });
}


function fetchAutocomplete(query) {
    const apiUrl = `https://api.weatherapi.com/v1/search.json?key=177a54d84a9241dc9d091851241012&q=${query}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            dataList.innerHTML = ""; 
            data.forEach(location => {
                const option = document.createElement("option");
                option.value = location.name;
                dataList.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error fetching autocomplete data:", error);
        });
}


function displayWeather(data) {
    weatherContainer.innerHTML = ""; 

   
    const locationName = `${data.location.name}`;
    const locationElement = document.createElement("div");
    locationElement.className = "location";
    weatherContainer.appendChild(locationElement);

    
    data.forecast.forecastday.forEach((forecast, index) => {
        const date = new Date(forecast.date);
        const day = date.toLocaleString("en-US", { weekday: 'long' });
        const dayDate =date.toLocaleString("en-Us" ,{day:'numeric',month:'long'});
        const temp = forecast.day.avgtemp_c;
        const iconUrl = `https:${forecast.day.condition.icon}`;
        const condition = forecast.day.condition.text;

        const card = document.createElement("div");
        card.className = "weather-card";

        if (index === 0) {
            card.innerHTML = `
            <div class="head">
              <span class="day">${day}</span>
              <span class="date">${dayDate}</span>
            </div>
             <p class="location">${locationName}</p>
             <div class="contain-temp">
               <div class="temperature">${temp}°C</div>
               <img src="${iconUrl}" alt="weather icon" class="icon">
             </div>
             <div class="description">${condition}</div>
             <div class="details">
               <span><img src="./img/icon-umberella@2x.png" alt=""> ${forecast.day.daily_chance_of_rain}%</span>
               <span><img src="./img/icon-wind@2x.png" alt=""> ${forecast.day.maxwind_kph} Km/h</span>
               <span><img src="./img/icon-compass@2x.png" alt=""> East</span>
             </div>
          `;
        } else {
            card.innerHTML = `
            <h3 class="head2">
                <span class="day">${day}</span>
            </h3>
             <div class="another-cards">
                 <img src="${iconUrl}" alt="weather-icon" class="icon1">
                 <div class="temper">${temp}°C</div>
                 <div class="descrip">${condition}</div>
             </div>
        `;
        }

        weatherContainer.appendChild(card);
    });
}


searchButton.addEventListener("click", () => {
    const location = searchInput.value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        alert("Please enter a city name.");
    }
});

searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    if (query.length >= 3) {
        fetchAutocomplete(query);
    }
   
});


navigator.geolocation.getCurrentPosition(
    position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetchWeather(`${latitude},${longitude}`);
    },
    error => {
        console.error("Geolocation error:", error);
        fetchWeather("Cairo"); 
    }
);


fetchWeather("Cairo");


x


