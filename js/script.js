// VARIAVEIS E ELEMENTOS
const obfuscatedKey = String.fromCharCode(
    102, 51, 99, 56, 100, 52, 98, 98, 48, 48,
    98, 99, 97, 53, 56, 51, 56, 56, 48, 56,
    57, 99, 52, 53, 55, 53, 50, 98, 56, 99,
    54, 56
);


const api = obfuscatedKey;
const apiCountry = "https://flagsapi.com/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

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

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

// FUNÇÕES
      // Geolocation
if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition( async (position) => {
    const{ longitude, latitude } = position.coords;

    const response = await fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=${longitude},${latitude}`)

    const data = await response.json()
    console.log(data.address.City)

    cityInput.value = data.address.City;
    showWeatherData(cityInput.value);
  });
}



const toggleLoader = () => {
    loader.classList.toggle("hide");
  };

const capitalizeFirstLetter = (str) => {
    const words = str.split(" ")
    for (let i = 0; i < words.length; i++){
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ")
    
}


const getWeatherData = async (city) => {
    toggleLoader();

    // Pré-carregar a imagem antes de definir como imagem de fundo
    const backgroundImage = new Image();
    backgroundImage.onload = () => {
        document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;
        toggleLoader();
        dataContainer.classList.remove("hide");
    };
    backgroundImage.src = `${apiUnsplash + city}`;

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data;
}


// Tratamento de erro
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
  };
  
  const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    dataContainer.classList.add("hide");
  };

const showWeatherData = async(city) => {
    hideInformation(); 
    const data = await getWeatherData(city)
    if (data.cod === "404" || data.cod === "400") {
        showErrorMessage();
        return;
      }
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