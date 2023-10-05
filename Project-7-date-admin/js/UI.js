class UI {
    showAlert(message, type){
        const newAlert = document.createElement("p");
        newAlert.textContent = message;
        newAlert.classList.add("text-center", "alert", "d-block", "col-12");

        const clasesByType = {
            "error": ["alert-danger"],
            "success": ["alert-success"]
        };

        newAlert.classList.add(...clasesByType[type]);

        document.querySelector(".agregar-cita").insertBefore(newAlert, form);
        
        setTimeout(() => {
            newAlert.remove();
        }, 3000);
    
    }

    renderDates({ dates }){
        console.log(dates);
        while(datesList.firstChild) {
            datesList.firstChild.remove();
        }

        dates.forEach((date, index) => {
            date.id = index;
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = date       
        
            const htmlDate = document.createElement("div");
            htmlDate.dataset.id = index;


            const h2Element = document.createElement("h2");
            h2Element.textContent = mascota;
            htmlDate.appendChild(h2Element);

            const ulElement = document.createElement("ul");
            const liPropietario = document.createElement("li");
            liPropietario.innerHTML = `<p><strong>Propietario:</strong> <span></span></p>`;
            liPropietario.querySelector("span").textContent = propietario;
            ulElement.appendChild(liPropietario);

            const liTelefono = document.createElement("li");
            liTelefono.innerHTML = `<strong>Télefono: </strong> ${telefono}`;
            ulElement.appendChild(liTelefono);

            const liFecha = document.createElement("li");
            liFecha.innerHTML = `<strong>Fecha: </strong> ${fecha}`;
            ulElement.appendChild(liFecha);

            const liHora = document.createElement("li");
            liHora.innerHTML = `<strong>Hora: </strong> ${hora}`;
            ulElement.appendChild(liHora);

            const liSintomas = document.createElement("li");
            liSintomas.innerHTML = `<strong>Sintomas: </strong> ${sintomas}`;
            ulElement.appendChild(liSintomas);
            
            const btnEdit = document.createElement("button");
            btnEdit.textContent = "Editar";
            btnEdit.classList.add("btn", "btn-success");
            ulElement.appendChild(btnEdit);
            
            const btnDelete = document.createElement("button");
            btnDelete.textContent = "Borrar";
            btnDelete.classList.add("btn", "btn-danger");
            btnDelete.onclick = () => {
                deleteDate(id);
            }
            ulElement.appendChild(btnDelete);
            
            htmlDate.appendChild(ulElement);

            const hr = document.createElement("hr");

            datesList.appendChild(htmlDate, hr);
        });
    }
}

export { UI };