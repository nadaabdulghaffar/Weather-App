/**
 * Searches for the weather and forecast data of a given city.
 *
 *@param {void}
 * @return {void}
 */
function search() {
    const cityName = document.getElementById("city")?.value;
    const apiKey = 'd7ce2260647ea773e4c6f1e8b3057552';

    if (!cityName) {
        alert("Please enter a city");
        return;
    }

    try {
        const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
        fetch(weatherAPI)
            .then(response => response.json())
            .then(data => displayWeather(data));
    } catch (error) {
        alert("City not found");
    }

    try {
        const forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
        fetch(forecastAPI)
            .then(response => response.json())
            .then(data => displayForecast(data));
    } catch (error) {
        alert("City not found");
    }
}

/**
 * Displays the current weather data for a given city.
 *
 * @param {object} data - The weather data object from the OpenWeatherMap API.
 * @return {void}
 */

function displayWeather(data) {
    if (!data) {
        console.error("Error: Missing data");
        return;
    }

    const HTMLicon = document.getElementById("icon");
    const HTMLtemperature = document.getElementById("temperature");
    const HTMLdescription = document.getElementById("description");

    if (!HTMLicon || !HTMLtemperature || !HTMLdescription) {
        console.error("Error: Missing HTML elements");
        return;
    }

    // clear previous data
    HTMLicon.src = "";
    HTMLtemperature.textContent = "";
    HTMLdescription.textContent = "";

    if (data.cod !== 200) {
        alert("City not found");
        return;
    }

    const { weather, main } = data;

    if (!weather || !main) {
        console.error("Error: Missing data in response", data);
        return;
    }

    const { icon, description } = weather[0];

    if (!icon || !description) {
        console.error("Error: Missing icon or description in response", data);
        return;
    }

    const temperature = main.temp - 273.15; // Kelvin to Celsius

    try {
        HTMLicon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        HTMLicon.style.display = "block"; // show the icon

        HTMLtemperature.textContent = temperature.toFixed(0) + " °C"; // round to 0 decimal places
        HTMLdescription.textContent = description;

    } catch (error) {
        console.error("Error: Failed to display weather data", error);
    }
}

/**
 * Displays the hourly forecast data for a given city.
 *
 * @param {object} data - The forecast data object from the OpenWeatherMap API.
 * @return {void}
 */
function displayForecast(data) {
    if (!data) {
        console.error("Error: Missing data");
        return;
    }
    
    const HTMLhourlyForecast = document.getElementById("hourly-forecast");
    if (!HTMLhourlyForecast) {
        console.error("Error: Missing HTML element");
        return;
    }

    // clear previous data
    HTMLhourlyForecast.textContent = "";

    if (data.cod != 200) {
        alert("City not found");
        return;
    }
    else {
        try {
            for (let i = 0; i < 5; i++) {
                const item = data.list[i];
                const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
                const temperature = item.main.temp - 273.15; // Kelvin to Celsius
                const description = item.weather[0].description;

                // display hourly forecast
                HTMLhourlyForecast.innerHTML += `
                    <div class="hourly-item">
                        <img src="${icon}" alt="${description}">
                        <p>${temperature.toFixed(0)} °C</p>
                        <p>${description}</p>
                    </div>
                `;
    }
        } catch (error) {
            console.error("Error: Failed to display forecast data", error);
        }
}
}