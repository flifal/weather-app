const apiKey = "c0e563d8c078578977667fb44f598374";
let city = "Tetouan";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
let cityName = document.getElementById("city");
let search = document.getElementById("search");
let temp = document.getElementById("temp");

search.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && this.value != "") {
        console.log("City name:", this.value);
        city = this.value;
        cityName.innerText = this.value;
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        getWeatherData();
        search.value = "";
    }
});

function getWeatherData() {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.cod === "404") {
                throw new Error("City not found");
            } else {
                const temperature = data.main.temp - 273.15;
                temp.innerText = temperature.toFixed(1) + "°C";
                let iconCode = data.weather[0].icon;
                let icon = `http://openweathermap.org/img/wn/${iconCode}.png`;
                document.getElementById("icon").setAttribute("src", icon);
                document.getElementById("wind").innerText = Number(
                    data.wind.speed * 3.6
                ).toFixed(1);
                document.getElementById("humidity").innerText =
                    data.main.humidity + "%";
            }
        })
        .catch((error) => {
            console.error(error);
            cityName.innerText = "City not found";
            cityName.style.color = "#B00020";
            cityName.style.fontSize = "1rem";
        });
}

getWeatherData();
