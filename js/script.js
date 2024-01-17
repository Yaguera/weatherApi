// VARIAVEIS E ELEMENTOS
const obfuscatedKey = String.fromCharCode(
    102, 51, 99, 56, 100, 52, 98, 98, 48, 48,
    98, 99, 97, 53, 56, 51, 56, 56, 48, 56,
    57, 99, 52, 53, 55, 53, 50, 98, 56, 99,
    54, 56
);


const api = obfuscatedKey;
const apiCountry = "https://flagsapi.com/BR/flat/64.png";

const cityInput = document.querySelector("#city-name");
const searchButton = document.querySelector("#search");

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const umidityElement = document.querySelector("#umidity span")
const windElement = document.querySelector("#wind span")

// FUNÇÕES
const getWeatherData = async(city) => {
    
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}&lang=pt_br`
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    console.log(data)
    return data;
}

const showWeatherData = async(city) => {
    const data = await getWeatherData(city)
    cityElement.innerText = data.name;
    tempElement.innerText = data.main.temp;
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
}

// EVENTOS
searchButton.addEventListener("click", (e) => {
    e.preventDefault()

    const city = cityInput.value;
   showWeatherData(city)
})