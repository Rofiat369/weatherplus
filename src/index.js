function dateAndTime(timestamp) {
    let today = new Date(timestamp);
    let date = today.getDate();
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    let month = months[today.getMonth()];
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];
    let day = days[today.getDay()];
    let year = today.getFullYear();
    let todaysDate = document.querySelector("#today-date");
    todaysDate.innerHTML = `${day}, ${month} ${date}, ${year}.`;


    let time = today.getHours();
    if (time < 10) {
        time = `0${time}`
    };
    let minutes = today.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    };
    return `${time}:${minutes}`;

}

function weatherHours(timestamp) {
    let today = new Date(timestamp);
    let time = today.getHours();
    if (time < 10) {
        time = `0${time}`
    };
    let minutes = today.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    };
    return `${time}:${minutes}`;
}


function showWeather(response) {
    document.querySelector("#the-city").innerHTML = response.data.name;
    let weather = Math.round(response.data.main.temp);
    let celsiusTemperature = document.querySelector(".celsius");
    celsiusTemperature.innerHTML = `${weather}°C`;
    let fweather = Math.round((weather * 9) / 5 + 32);
    let farenheitWeather = document.querySelector(".farenheit");
    farenheitWeather.innerHTML = `${fweather}°F`;
    let dateElement = document.querySelector("#time-of-day");
    dateElement.innerHTML = dateAndTime(response.data.dt * 1000);

}

function displayTemperature(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 6; index++) {
        forecast = response.data.list[index];
        forecastElement.innerHTML +=
            `<div class="col-2">
    ${weatherHours(forecast.dt * 1000)}
    <img
    src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
    <div class="weather-forecast"><strong>${Math.round(forecast.main.temp_max)}°
    </strong>${Math.round(forecast.main.temp_min)}°</div>
    </div>`

    }

}

function changeCity(event) {
    event.preventDefault();
    let apiKey = "a61759b6c49305b3341bd63820265f73";
    let city = document.querySelector("#city-weather").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

let element = document.querySelector("form");
element.addEventListener("submit", changeCity);



function locating(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "a61759b6c49305b3341bd63820265f73";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);

}

function currentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(locating);
}

let current = document.querySelector("#current-location");
current.addEventListener("click", currentLocation);
