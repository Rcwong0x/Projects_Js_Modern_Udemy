class UI {

    static showAlert(msg, type){
        const form = document.querySelector("#formulario");
        const existAlert = document.querySelector(".alert");

        if(existAlert) return;
        
        const alertClasses = {
            "initial": ["px-4", "py-3", "rounded", "max-w-lg", "mx-auto", "mt-6", "text-center", "border", "alert"],
            "error": ["bg-red-100", "border-red-100", "text-red-700"],
            "success": ["bg-green-100", "border-green-100", "text-green-700"],
        };
        
        const alert = document.createElement("div");
        alert.classList.add(...alertClasses["initial"]);
        alert.classList.add(...alertClasses[type]);
        alert.textContent = msg;
        
        form.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 2500);
    }
 
}

export default UI;