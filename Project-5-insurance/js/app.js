const selectYear = document.querySelector("#year");
const selectOrigin = document.querySelector("#marca");
const Inputchecked = document.querySelector("input[type='radio']:checked");

const formContent = document.querySelector("#cotizar-seguro");
const buttonCalculate = document.querySelector("#contenido button[type='submit']");
const spinner = document.querySelector("#cargando");

function Insurance(origin, year, type)  {
    this.origin = origin;
    this.year = year;
    this.type = type;
}

Insurance.prototype.calculate = function () {
    const costBasis = 2000;
    let total = costBasis;

    const increaseByOrigin = {
        "Americano": 1.15,
        "Asiatico": 1.05,
        "Europeo": 1.35,
    }
    const increase = increaseByOrigin[this.origin];

    total *= increase; 

    const maxYear = new Date().getFullYear();
    const discountByYear = (maxYear - this.year) * 3 / 100; 

    total -= total * discountByYear;

    if (this.type === "basico") {
        total *= 1.25;
    } else {
        total *= 1.5;
    }

   return total;
}

function Ui () {}

Ui.prototype.fillYears = function () {
    const date = new Date();
    const maxYear = date.getFullYear();
    const minYear = maxYear - 10;
    
    
    for (let i = maxYear; i >= minYear; i--) {
        const newYear = document.createElement("option");
        newYear.value = i;
        newYear.textContent = i;
        selectYear.appendChild(newYear);
    }
}

Ui.prototype.showAlert = function (type, message) {
    
    const alert = document.createElement("div");
    alert.classList.add("mensaje", "mt-10");
    alert.textContent = message;

    if ( type === "success" ) {
        alert.classList.add("correcto");
    } else {
        alert.classList.add("error");
    }

    formContent.insertBefore(alert, spinner);
    
    setTimeout( () => {
        alert.remove();
    }, 2500);
}

Ui.prototype.showTotal = function (insurance, total) {
    const resume = document.createElement("div");
    const { origin, year, type } = insurance; 

    resume.classList.add("mt-10", "total");
    resume.innerHTML = `
        <p class="header">Resumen</p>
        <p class="font-bold">Tipo de seguro:  ${ type }</p>
        <p class="font-bold">Origen auto:  ${ origin }</p>
        <p class="font-bold">Año:  ${ year }</p>
        <p class="font-bold">total:  $${ total }</p>
    `;

    spinner.classList.remove("hidden");

    setTimeout( () => {
        spinner.classList.add("hidden");
        document.querySelector("#resultado").appendChild(resume);
    }, 2500);
}

document.addEventListener("DOMContentLoaded", () =>{
    const ui = new Ui();
    
    ui.fillYears();
    
    buttonCalculate.addEventListener("click", event => {
        event.preventDefault();
        
        if (selectYear.value && selectOrigin.value && Inputchecked.value) {
            const insurance = new Insurance(selectOrigin.value, 
                Number(selectYear.value), 
                Inputchecked.value);

            const total = insurance.calculate();
            ui.showAlert("success", "Cotizando...");

            if (document.querySelector("#resultado .total")) {
                document.querySelector("#resultado .total").remove();
            }

            ui.showTotal(insurance, total);    
        } else {
            ui.showAlert("error", "Faltan campos por llenar...");
        }


    });

});
