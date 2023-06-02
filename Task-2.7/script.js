const country_search = document.querySelector(".country_search");
const body_country = document.querySelector(".body_country");
const region_search = document.querySelector(".region_search");
const countryContainer = document.querySelector(".countryContainer");
const button_country = document.querySelector(".button_country");
const button_region = document.querySelector(".button_region");
const themeButton = document.querySelector(".theme-button");
const loader = document.querySelector("#loader");
let countries = [];
let currentCountries = [];

const displayLoading = () => {
  loader.style.display = "block";
};

const hideLoading = () => {
  loader.style.display = "none";
};

const renderCountries = (item) => {
  const icons = document.createElement("div");
  icons.className = "icons";
  icons.innerHTML = `<span class="flag"><img src="${item.flag || "-"}"></span>
  <div class="div_capital"><p>Capital:</p><span class="capital">${item.capital || "-"
    }</span></div>
  <div class="div_country"><p>Country name:</p><span class="name_country">${item.name || "-"
    }</span></div>
  <div class="div_region"><p>Region:</p><span class="region">${item.subregion
    }</span></div>
  <div class="div_population"><p>Population:</p><span class="population">${numberWithCommas(
      item.population
    )}</span><p id="people">people</p></div>`;
  countryContainer.appendChild(icons);
};

const changeStyles = (currentCountries) => {
  currentCountries.length >= 3
    ? (countryContainer.style.justifyContent = "space-evenly")
    : (countryContainer.style.justifyContent = "flex-start");
};

const getCountry = () => {
  displayLoading();
  fetch(
    `https://restcountries.com/v2/all?fields=name,capital,subregion,flag,population`
  )
    .then((response) => response.json())
    .then((data) => {
      countries = data;
      currentCountries = data;
      countries.map((item) => {
        hideLoading();
        renderCountries(item);
      });
    })
    .catch((err) => alert("Something broke, try again later!!!"));
};
getCountry();

const filterByValue = (value, type) => {
  if (!value) {
    alert(`Please type country of ${type} !?`);
  } else {
    currentCountries = currentCountries.filter((item) => {
      if (item[type].toLowerCase().includes(value.toLowerCase())) {
        return value;
      }
    });
    if (currentCountries.length === 0) {
      countryContainer.classList.add("no_found");
      countryContainer.innerHTML = "No matches found";
    } else {
      countryContainer.innerHTML = "";
      currentCountries.map((item) => {
        displayLoading();
        renderCountries(item);
        hideLoading();
        changeStyles(currentCountries);
      });
    }
  }
};

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

themeButton.onclick = () => {
  body_country.classList.toggle("dark-theme");
};

button_country.addEventListener("click", (e) => {
  e.preventDefault();
  filterByValue(country_search.value, "name");
});

button_region.addEventListener("click", (e) => {
  e.preventDefault();
  filterByValue(region_search.value, "subregion");
});