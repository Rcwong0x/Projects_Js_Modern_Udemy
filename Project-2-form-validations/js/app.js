window.addEventListener("DOMContentLoaded", () => {
    const inputEmail = document.querySelector("#email");
    const inputCopy = document.querySelector("#copyc");
    const inputSubject = document.querySelector("#asunto");
    const inputMsg = document.querySelector("#mensaje");
    const form = document.querySelector("#formulario");
    const submitButton = document.querySelector("#botones button[type='submit']");
    const resetButton = document.querySelector("#botones button[type='reset']");
    const spinner = document.querySelector("#spinner");

    const formSubmit = {
        email: "",
        subject: "",
        copy: "",
        msg: "",
    };

    function setListeneres() {
        inputEmail.addEventListener("input", (event) => {
            const inputContainer = event.target.parentElement;
            const inputIsValid = isValid(event.target, true, true);

            formSubmit.email = event.target.value;
            manageAlert(inputIsValid, inputContainer, "El email no es valido");
            enableButton();
        });

        inputSubject.addEventListener("input", (event) => {
            const inputContainer = event.target.parentElement;
            const inputIsValid = isValid(event.target, true);

            formSubmit.subject = event.target.value;
            manageAlert(inputIsValid, inputContainer);
            enableButton();
        });

        inputMsg.addEventListener("input", (event) => {
            const inputContainer = event.target.parentElement;
            const inputIsValid = isValid(event.target, true);

            formSubmit.msg = event.target.value;
            manageAlert(inputIsValid, inputContainer);
            enableButton();
        });

        inputCopy.addEventListener("input", event =>{
            const inputContainer = event.target.parentElement;
            let inputIsValid;

            if (event.target.value === "") {
                inputIsValid = true; // Debido a que es opcional
            } else {
                inputIsValid = isValid(event.target, false, true);
            }

            formSubmit.copy = event.target.value;
            manageAlert(inputIsValid, inputContainer, "El email no es valido");
            enableButton();
        });

        resetButton.addEventListener("click", event => {
            event.preventDefault();

            let confirm = window.confirm("¿Esta seguro que desear limpiar el formulario?");

            if (confirm) {
                formReset();
            }
        });

        form.addEventListener("submit", event => {
            event.preventDefault();

            spinner.classList.remove("hidden");
            spinner.classList.add("flex");


            const alertSuccessful = document.createElement("p");
            alertSuccessful.classList.add("bg-green-500", "text-white", "p-2", "text-center", "rounded-lg", "mt-10", "font-bold","text-sm", "uppercase", "alert-successful");
            alertSuccessful.textContent = "El formulario se ha enviado exitosamente";

            setTimeout(() => {
                spinner.classList.remove("flex");
                spinner.classList.add("hidden");
                formReset();
                form.appendChild(alertSuccessful);
            }, 3000);

        });


    }

    setListeneres();

    function isValid(input, validateLength = false, validateRExEmail = false) {
        let isValid = true;

        if (validateLength) {
            isValid = input.value.trim() !== "";
        }

        if (validateRExEmail) {
            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
            isValid = emailRegex.test(input.value);
        }

        return isValid;
    }

    function manageAlert(inputIsValid, inputContainer, message = "El campo esta vacío") {
        if (inputIsValid && inputContainer.querySelector(".alert")) {
            inputContainer.removeChild(inputContainer.lastElementChild);
            return;
        }

        if (!inputIsValid && !inputContainer.querySelector(".alert")) {
            const alert = document.createElement("p");
            alert.textContent = message;
            alert.classList.add(
                "bg-red-600",
                "text-white",
                "p-2",
                "text-center",
                "alert"
            );

            inputContainer.appendChild(alert);
        }

        if( form.lastElementChild.classList.contains("alert-successful")) {
            console.log("Hay successfull");
            form.lastElementChild.remove();
        }
    }

    function enableButton() {
        const emptyFields = Object.values(formSubmit).includes("");

        if (emptyFields || !isValid(inputEmail, true, true)) {
            submitButton.disabled = true;
            submitButton.classList.add("opacity-50");
        } else {
            submitButton.disabled = false;
            submitButton.classList.remove("opacity-50");

        }

    }
    function formReset () {
        form.reset();

        formSubmit.email = "";
        formSubmit.subject = "";
        formSubmit.msg = "";

        enableButton();
        manageAlert(true, inputEmail.parentElement);
    }
});
