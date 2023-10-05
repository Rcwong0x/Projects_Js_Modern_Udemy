import { AdminOfDates }  from "./Date.js";
import { UI } from "./UI.js";
 
document.addEventListener("DOMContentLoaded", () => {
    // Get all inputs and a text area.
    const inputsData = document.querySelectorAll("#nueva-cita input");
    const textArea = document.querySelector("#sintomas");
    const inputTel = document.querySelector("#telefono");
    const form = document.querySelector("#nueva-cita");
    const datesList = document.querySelector("#citas");

    let dateData = {
        mascota: "",
        propietario: "",
        telefono: "",
        fecha: "",
        hora: "",
        sintomas: "",
    };

    const adminDates = new AdminOfDates();
    const ui = new UI();

    function updateDataDate(property, data) {
        dateData[property] = data;
        console.log(dateData);
    }
    function setEventListers() {
        inputsData.forEach((input) => {
            input.addEventListener("change", event => {
                updateDataDate(event.target.name, event.target.value);
            } );
        }); 
        
        textArea.addEventListener("change", event => {
            updateDataDate(event.target.name, event.target.value);
        });

        inputTel.addEventListener("keydown", event => {
            // KeyAllowed: backspace, left and right arrows and Numbers
            const keyAllowed = [8, 9, 37, 39, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
            
            if(inputTel.value.length >= 10 && !([8, 37, 39, 9].includes(event.keyCode)) ){
                event.preventDefault();
            }

            if( !(keyAllowed.includes(event.keyCode)) ){
                event.preventDefault();
            }
            
        });

        form.addEventListener("submit", event => {
            event.preventDefault();

            const someEmpty = Object.values(dateData).includes("");
            if(someEmpty){
                ui.showAlert("Todos los campos son obligatorios", "error");
                return;
            }

            adminDates.addDate({...dateData});
            ui.renderDates(adminDates);
            ui.showAlert("Cita añadida", "success");
            form.reset();
            dateData = [];
        });
    }
    setEventListers();
    
    function deleteDate(id) {
        // Delete date
        adminDates.deleteDate(id);
        //Show Alert
        ui.showAlert("Cita borrada", "success");
        // Volver a renderizar citas
        ui.renderDates(adminDates);
    }

});