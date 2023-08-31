const cartButton = document.querySelector("#carrito");
const cartContainer = document.querySelector("#lista-carrito tbody");
const listOfCourses = document.querySelector("#lista-cursos");
const cleanCart = document.querySelector("#vaciar-carrito");

let cart = [];

function setEventListeners() {
    listOfCourses.addEventListener("click", addToCart);

    cartContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("borrar-curso")) {
            const idToDelete = event.target.getAttribute("data-id");
            deleteCourse(idToDelete);
        }
    });

    cleanCart.addEventListener("click", event => {
        event.preventDefault();
        cart = [];
        cleanHtmlCart();
    });
}

function addToCart(event) {
    event.preventDefault();

    if (event.target.classList.contains("agregar-carrito")) {
        //Send the card of course
        const courseSelected = event.target.parentElement.parentElement;
        readHtmlData(courseSelected);
    }
}

function deleteCourse(idToDelete) {
    let index = -1;
    cart.forEach((course, i) => {
        if (course.id === idToDelete && course.quantity === 1) {
            index = i;
            return;
        }
        if (course.id === idToDelete && course.quantity > 1) {
            course.quantity--;
        }
    });
    
    if (index !== -1){
        console.log("Eliminado: ", cart.splice(index, 1), "Nuevo cart: ", cart);
    }
    renderHtml();
}

function readHtmlData(courseSelected) {
    const idNewCourse = courseSelected
        .querySelector(".agregar-carrito")
        .getAttribute("data-id");
    let index = -1;

    cart.forEach((course, i) => {
        if (course.id === idNewCourse) {
            index = i;
            return;
        }
    });

    const courseInCart = index !== -1;

    if (courseInCart) {
        cart[index].quantity++;
    } else {
        const infoCourseSelected = {
            id: courseSelected
                .querySelector(".agregar-carrito")
                .getAttribute("data-id"),
            title: courseSelected.querySelector("h4").textContent,
            price: courseSelected.querySelector(".precio span").textContent,
            img: courseSelected.querySelector("img").src,
            quantity: 1,
        };

        cart = [...cart, infoCourseSelected];
    }

    renderHtml();
}

function cleanHtmlCart() {
    while (cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.children[0]);
    }
}

function renderHtml() {
    cleanHtmlCart();

    cart.forEach((course) => {
        const courseHTML = document.createElement("tr");
        const { id, title, price, img, quantity } = course;
        courseHTML.innerHTML = `
                <td><img src="${img}" style="width: 100px"></td>
                <td><p>${title}</p></td>
                <td><p>${price}</p></td>
                <td><p>${quantity}</p></td>
                <td>
                    <a href="#" class="borrar-curso" data-id="${id}"> X </a>    
                </td>
        `;
        cartContainer.appendChild(courseHTML);
    });

}

setEventListeners();
