import DatabaseIDB from "./DatabaseIDB.js";
import UI from "./UI.js";

(function(){
    const form = document.querySelector("#formulario");
    const IDB = new DatabaseIDB("crm", 1);

    document.addEventListener("DOMContentLoaded", () => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.querySelector("#nombre").value;
            const email = document.querySelector("#email").value;
            const phone = document.querySelector("#telefono").value;
            const company = document.querySelector("#empresa").value;
        
            if (name === "" || email === "" || phone === "" || company === ""){
                UI.showAlert("Todos los campos son obligatorios", "error");
                return;
            }
        
            const customer = {
                name,
                email,
                phone,
                company,
                id: Date.now(),
            }
            
            const requestResult = IDB.createRecord(customer);
            UI.showAlert(...requestResult);

            if(!requestResult === "success") {
                window.location.href = './index.html'
            }

        });
        

    });
})();