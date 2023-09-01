const tweetsContainer = document.querySelector("#lista-tweets");
const textTweet = document.querySelector("#tweet");
const buttonSubmit = document.querySelector("#formulario input[type='submit']");

let listOfTweets = [];

function setEvents () {
    buttonSubmit.addEventListener("click", event => {
        event.preventDefault();
        const teewtContent = textTweet.value.trim();
    
        if (teewtContent === "") {
            showError("El Tweet no tiene contenido");
            return; 
        }

        listOfTweets.push(teewtContent);
        localStorage.setItem( "listOfTweets", JSON.stringify(listOfTweets) );
    
        renderTweets();
        textTweet.value = "";
    });

    tweetsContainer.addEventListener("click", event => {        
        if ( event.target.classList.contains("borrar-tweet") ) {
            const indexToDelete = event.target.getAttribute("data-id");
            
            listOfTweets.splice(indexToDelete, 1);
            localStorage.setItem( "listOfTweets", JSON.stringify(listOfTweets) );
        
            renderTweets();
        }
    })
}

function loadTweets () {
    if ( localStorage.getItem("listOfTweets") ){
        listOfTweets = [...JSON.parse( localStorage.getItem("listOfTweets") )];
        
        renderTweets();
    }
}

function renderTweets () {
    while (tweetsContainer.firstElementChild) {
        tweetsContainer.firstChild.remove();
    }

    listOfTweets.forEach( (tweet, index) => {
        const newTweet = document.createElement("li");
        newTweet.innerHTML = `${tweet} <span class="borrar-tweet" data-id="${index}"> X </span>`;
        tweetsContainer.appendChild(newTweet);
    });
}

function deleteTweet (event) {
    window.alert(event.target.getAttribute("data-id"));
}
function showError (message) {
    const error = document.createElement("p");
    error.textContent = message;
    error.classList.add("error");

    document.querySelector("#contenido")
        .appendChild(error);
    
    setTimeout(() =>{
        error.remove();
    }, 1200);

}

document.addEventListener("DOMContentLoaded", () => {
    loadTweets();
    setEvents();
});