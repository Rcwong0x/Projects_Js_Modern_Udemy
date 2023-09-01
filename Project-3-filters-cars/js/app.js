const selectBrand = document.querySelector("#marca");
const selectYear = document.querySelector("#year");
const selectMin = document.querySelector("#minimo");
const selectMax = document.querySelector("#maximo");
const selectDoors = document.querySelector("#puertas");
const selectTransmition = document.querySelector("#transmision");
const selectColor = document.querySelector("#color");
const carsContainer = document.querySelector("#resultado");

const selectFilter = {
    brand: "",
    year: "",
    min: "",
    max: "",
    doors: "",
    trans: "",
    color: "",
};

selectBrand.addEventListener("change", event =>{
    selectFilter.brand = event.target.value;
    applyFilters();
});
selectYear.addEventListener("change", event =>{
    selectFilter.year = event.target.value;
    applyFilters();
});
selectMin.addEventListener("change", event =>{
    selectFilter.min = event.target.value;
    applyFilters();
});
selectMax.addEventListener("change", event =>{
    selectFilter.max = event.target.value;
    applyFilters();
});
selectDoors.addEventListener("change", event =>{
    selectFilter.doors = event.target.value;
    applyFilters();
});
selectTransmition.addEventListener("change", event =>{
    selectFilter.trans = event.target.value;
    applyFilters();
});
selectColor.addEventListener("change", event =>{
    selectFilter.color = event.target.value;
    applyFilters();
});


document.addEventListener("DOMContentLoaded", () => {
    fillSelectYear();

    showCars(autos);
});

function showCars(arrayofCars) {
    while (carsContainer.firstChild) {
        carsContainer.firstChild.remove();
    }

    let messagaResult = document.createElement("p");
    if (arrayofCars.length === 0) {
        messagaResult.textContent = "Sin resultados"
    } else {
        messagaResult.textContent = `Autos encontrados: ${arrayofCars.length}`;
    }
    carsContainer.appendChild(messagaResult);

    arrayofCars.forEach(auto => {
        const { marca, modelo, year, precio, puertas, transmision, color } = auto;

        const newAuto = document.createElement("p");
        const hr = document.createElement("h2");

        newAuto.textContent = `Marca: ${marca} - 
            Modelo: ${modelo} - 
            Año: ${year} - 
            Precio: ${precio} - 
            Puertas: ${puertas} - 
            Trasmision: ${transmision} | 
            Color: ${color}`;

        carsContainer.appendChild(newAuto, hr);
    });
}

function fillSelectYear() {
    let dataArr = new Set();

    autos.forEach(car => {
        dataArr.add(car.year);
    });

    dataArr = [...dataArr].sort().reverse();

    dataArr.forEach(year => {
        const option = document.createElement("option");
        option.textContent = year;
        option.value = year;

        selectYear.appendChild(option);
    });
}

function applyFilters() {
    const filteredCars = autos.filter( filterByBrand )
        .filter( filterByYear )
        .filter( filterByMin )
        .filter( filterByMax )
        .filter( filterByDoors )
        .filter( filterByTrans )
        .filter( filterByColors ); 

    showCars(filteredCars);
}

function filterByBrand (car) {
    if (selectFilter.brand) {
        return car.marca === selectFilter.brand; 
    }
    return car;
}

function filterByYear (car) {
    if (selectFilter.year) {
        return car.year === parseInt(selectFilter.year); 
    }
    return car;
}

function filterByMin (car) {
    if (selectFilter.min) {
        return car.precio >= parseInt(selectFilter.min); 
    }
    return car;
}

function filterByMax (car) {
    if (selectFilter.max) {
        return car.precio <= parseInt(selectFilter.max); 
    }
    return car;
}

function filterByDoors(car) {
    if (selectFilter.doors) {
        return car.puertas === parseInt(selectFilter.doors); 
    }
    return car;
}
function filterByTrans(car) {
    if (selectFilter.trans) {
        return car.transmision === selectFilter.trans; 
    }
    return car;
}
function filterByColors(car) {
    if (selectFilter.color) {
        return car.color === selectFilter.color; 
    }
    return car;
}

