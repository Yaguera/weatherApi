// VARIAVEIS E ELEMENTOS
const obfuscatedKey = String.fromCharCode(
    102, 51, 99, 56, 100, 52, 98, 98, 48, 48,
    98, 99, 97, 53, 56, 51, 56, 56, 48, 56,
    57, 99, 52, 53, 55, 53, 50, 98, 56, 99,
    54, 56
);


const api = obfuscatedKey;
const apiCountry = "https://flagsapi.com/";

const cityInput = document.querySelector("#city-name");
const searchButton = document.querySelector("#search");

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country-flag")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")
const dataContainer = document.querySelector(".hide")

// FUNÇÕES
const capitalizeFirstLetter = (str) => {
    const words = str.split(" ")
    for (let i = 0; i < words.length; i++){
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ")
    
}


const getWeatherData = async(city) => {
    
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}&lang=pt_br`
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    console.log(data)
    return data;
}
const showWeatherData = async(city) => {
    dataContainer.classList.remove('hide')
    const data = await getWeatherData(city)
    cityElement.innerText = data.name;
    tempElement.innerText = data.main.temp;
    descElement.innerText = capitalizeFirstLetter(data.weather[0].description);
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src",apiCountry + data.sys.country + "/flat/64.png");
    humidityElement.innerText = data.main.humidity + "%";
    windElement.innerText = data.wind.speed + "km/h"
}

// EVENTOS
searchButton.addEventListener("click", (e) => {
    e.preventDefault()

    const city = cityInput.value;
   showWeatherData(city)
})