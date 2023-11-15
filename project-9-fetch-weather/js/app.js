import { apiKey } from "./config.js";

function app() {
    const $selectCountry = document.querySelector("#pais");
    const $inputCity = document.querySelector("#ciudad");
    const $form = document.querySelector("#formulario");

    $form.addEventListener("submit", event => {
        event.preventDefault();

        if($inputCity.value === "" || $selectCountry.value === "") {
            showAlert($form.parentElement, "Complete todos los campos");
            return;
        }

        showSpinner()
        getCordinates($inputCity.value, $selectCountry.value)
            .then(cordinates => getWeather(cordinates[0].lat, cordinates[0].lon))
            .then(clima => showWeather(clima))
            .catch(error => showAlert($form, error))
            .finally(() => hideSpinner())
            
        
    });

    function getCordinates(city, country) {
        return new Promise((resolve, reject) => {
            const urlCordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${apiKey}`;
            
            fetch(urlCordinates)
                .then(response => response.json())
                .then(data => {
                    if (data.length === 0){
                        reject("no se encontraron resultados");
                    }

                    if(data.cod === 401) {
                        reject(data.message);
                    }

                    resolve(data)
                })
                .catch(error => reject(error))
        });
    }

    function getWeather(lat, lon) {
        return new Promise((resolve, reject) => {
            const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            fetch(urlWeather)
                .then(response => response.json())
                .then(data => {
                    if (data.length === 0){
                        reject("no se encontraron resultados");
                    }

                    if(data.cod === 401) {
                        reject(data.message);
                    }

                    resolve(data)
                })
                .catch(error => reject(error))
        });
    }
    

}
function showSpinner() {
    const $resultContainer = document.querySelector("#resultado");
    const spinner = document.createElement("DIV");
    spinner.classList.add("sk-fading-circle");
    spinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;
    cleanContainer($resultContainer);
    $resultContainer.appendChild(spinner);
}

function hideSpinner() {
    if(document.querySelector(".sk-fading-circle")) {
        document.querySelector(".sk-fading-circle").remove();
    }
}

function cleanContainer(container) {
    while(container.firstElementChild){
        container.removeChild(container.firstElementChild)
    }
}

function showAlert(container, message) {
    if (!document.querySelector("#alertError")) {
        const alert = document.createElement("DIV");
        alert.id = "alertError";
        alert.classList.add("p-4", "mt-2", "bg-white", "rounded", "text-red-500", "text-center", "text-2xl");
        alert.innerHTML = `<p>${message}</p>`;
    
        container.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
}

function showWeather(data) {
    const $resultContainer = document.querySelector("#resultado");
    const { name, main: {temp, temp_max: tempMax, temp_min: tempMin} } = data;

    cleanContainer($resultContainer);
    const weatherData = document.createElement("DIV");
    weatherData.innerHTML = `<h2 class="text-center font-bold text-white text-3xl">Clima en ${name}</h2>
    <p class="text-center font-bold text-white text-3xl">${kelvinToCelcius(temp)}°</p>
    <div class="flex w-full nowrap gap-4 justify-center">
        <p class="text-center font-bold text-white text-3xl basis-1/2">Min: ${kelvinToCelcius(tempMin)}°</p>
        <p class="text-center font-bold text-white text-3xl basis-1/2">Max: ${kelvinToCelcius(tempMax)}°</p>
    </div>
    `;
    hideSpinner();
    $resultContainer.appendChild(weatherData);
}

function kelvinToCelcius(kelvin) {
    return parseInt( kelvin - 273.15 );
}

document.addEventListener("DOMContentLoaded", app);