// Variables
const form =  document.querySelector("#agregar-gasto");
const expenses =  document.querySelector("#gastos .list-group");
const rest =  document.querySelector("div.restante");

// EventListeners
function setEvents() {
    window.addEventListener("DOMContentLoaded", () => {
        const amount = prompt("¿Cuál es el presupuesto de esta semana?");
        
        if (amount === "" || Number(amount) <= 0 || isNaN(amount) ) {
            alert("Debe ingresar un numero mayor a cero");
            window.location.reload();
        }

        initBudget(amount);
    
    });

    form.addEventListener("submit", event => {
        event.preventDefault();

        const spentTitle = document.querySelector("#gasto").value;
        const spentAmount = document.querySelector("#cantidad").value;

        if (spentTitle === "" || spentAmount === "") {
            ui.showAlert("Los dos campos son necesarios", "error");
            return;
        }
        
        if ( ( Number(spentAmount) <= 0 ) || isNaN(spentAmount) ) {
            ui.showAlert("La cantidad debe ser un numero mayor a 0", "error");
            return;
        }
        
        const spent = {
            spentTitle: spentTitle,
            spentAmount: Number(spentAmount),
        }

        weeklyBudget.addSpent(spent);
        ui.showAlert("El gasto ha sido añadido", "success");
        form.reset();
        ui.updateRest();
        ui.renderHTMLSpents();
    });
}

setEvents();

// Clasess

class Budget {
    #budget 
    #rest 
    constructor (amount) {
        this.#budget = amount;
        this.#rest = amount;
        this.spents = [];
    }

    get budget() {
        return this.#budget;
    }

    get rest() {
        if (this.spents.length > 0) {
            const totalSpent = this.spents.reduce((total, spent) =>  total + spent.spentAmount, 0 );
            return this.#rest - totalSpent;
        } 
        
        return this.#rest;
    }
    
    get percentage () {
        return ( this.rest / this.#budget ) * 100 ;
    } 

    addSpent (spent) {
        this.spents= [...this.spents, spent]
    }

    deleteSpent (index) {
        this.spents.splice(index, 1);
    }


}

class Ui {
    constructor() {}

    updateBudget () {
        document.querySelector("#total").textContent = weeklyBudget.budget;
    }

    updateRest () {        
        form.querySelector("button[type='submit']").disabled = false;

        if (weeklyBudget.percentage >= 50) {
            rest.className = "restante alert alert-success";
        }

        if (weeklyBudget.percentage < 50 && weeklyBudget.percentage > 25) {
            rest.className = "restante alert alert-warning";
            ui.showAlert("Queda menos del 50% del presupuesto");
        }
        
        if (weeklyBudget.percentage < 25 && weeklyBudget.percentage > 0 ) {
            rest.className = "restante alert alert-danger";
            ui.showAlert("Queda menos del 25% del presupuesto", "error");
        }

        if (weeklyBudget.percentage <= 0) {
            rest.className = "restante alert alert-danger";
            ui.showAlert("El presupuesto se ha agotado", "error");
            form.querySelector("button[type='submit']").disabled = true;
        }
        

        console.log(rest);
        document.querySelector("#restante").textContent = weeklyBudget.rest;
    }

    showAlert (message, type) {
        const alert = document.createElement("div");
        alert.className = "text-center alert";

        if (type === "error") {
            alert.classList.add("alert-danger");
        } if (type === "success" ) {
            alert.classList.add("alert-success");
        } else {
            alert.classList.add("alert-warning");
        }

        alert.textContent = message;

        form.parentElement.insertBefore(alert, form);

        setTimeout (() => {
            alert.remove();
        }, 3000);

    }

    renderHTMLSpents () {
        while (expenses.firstElementChild) {
            expenses.firstElementChild.remove();
        }

        weeklyBudget.spents.forEach( (spent, index) => {
            const { spentAmount, spentTitle } = spent;

            const newSpent = document.createElement("li");
            newSpent.className = "list-group-item d-flex justify-content-between align-items-center";
            newSpent.dataset.id = index;

            newSpent.innerHTML = `${ spentTitle } <span class='badge badge-primary badge-pill'> $${spentAmount}</span>`;
        
            const btnDeleteSpent = document.createElement("button");
            btnDeleteSpent.classList.add("btn", "btn-danger", "borrar-gasto");
            btnDeleteSpent.textContent = "Borrar";
            btnDeleteSpent.onclick = (index) => {
                weeklyBudget.deleteSpent(index);
                ui.updateRest();
                ui.renderHTMLSpents();
            }

            newSpent.appendChild(btnDeleteSpent);
            expenses.appendChild(newSpent);
        });
        
    }
}

let weeklyBudget = {}; // Type Budget
const ui = new Ui();

// Funciones

function initBudget (amount) {
    weeklyBudget = new Budget(amount);
    ui.updateBudget();
    ui.updateRest();
}