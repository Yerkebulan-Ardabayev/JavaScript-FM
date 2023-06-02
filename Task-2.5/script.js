const weatherIcon = document.createElement("span");
weatherIcon.className = "weather-icon";
const temperature = document.querySelector(".temperature");
const divElement = document.getElementsByTagName("div")[0].append(weatherIcon);
temperature.before(weatherIcon);
const weatherDescription = document.querySelector(".weather-description");
const country = document.querySelector(".country");
const city = document.querySelector(".city");
const nofound = document.querySelector(".no_found");
const iconsContainer = document.getElementById("iconsContainer");


const getWeather = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&units=metric&appid=9009abae175618e2fa5914ca5d710ee9`
  )
    .then(response => response.json())
    .then(data => {
      country.textContent = data.sys.country;
      weatherIcon.innerHTML = `<img class="main_img" src=${`https://openweathermap.org/img/wn/${data
        .weather[0].icon}.png`}>`;
      temperature.textContent = `${data.main.temp.toFixed()}°C`;
      weatherDescription.textContent = data.weather[0].description;
    })
    .catch(err => alert("No found city"));
};
getWeather();

const getWeather5days = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city.textContent}&units=metric&lang=en&appid=9009abae175618e2fa5914ca5d710ee9`
  )
    .then(response => response.json())
    .then(data => {
      const dataFilter = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
      );

      dataFilter.map((item, index) => {
        const icons = document.createElement("div");
        icons.className = "icons";
        // const allIcons = `
        // <p class="day"></p>
        // <span class="icon"><img src=${`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}></span>
        // <p class="temp"></p>
        // <p class="descr"></p>
        // <p class="wind"></p>
        // `

        icons.innerHTML = `
        <p class="day">${new Date(item.dt_txt).toLocaleDateString("ru-RU") +
          "г."}</p>
         <span class="icon"><img src=${`https://openweathermap.org/img/wn/${item
           .weather[0].icon}.png`}></span>
         <p class="temp">${item.main.temp.toFixed()}°C</p>
         <p class="descr">${item.weather[0].description}</p>
         <p class="wind">${item.wind.speed.toFixed()}m/c</p>
        `;

        // icons.innerHTML = allIcons
        iconsContainer.appendChild(icons);

        // const day = document.querySelectorAll('.day')
        // const temp = document.querySelectorAll('.temp')
        // const descr = document.querySelectorAll('.descr')
        // const wind = document.querySelectorAll('.wind')

        // day[index].textContent = new Date(item.dt_txt).toLocaleDateString('ru-RU') + 'г.'
        // temp[index].textContent = `${item.main.temp.toFixed()}°C`
        // descr[index].textContent = item.weather[0].description
        // wind[index].textContent = `${item.wind.speed.toFixed()}m/c`
      });
    });
};

getWeather5days();

const setCity = event => {
  if (event.code === "Enter") {
    getWeather();
    getWeather5days();
    iconsContainer.innerHTML = "";
    city.blur();
  }
};

document.addEventListener("DOMContentLoaded", getWeather);
city.addEventListener("keypress", setCity);
