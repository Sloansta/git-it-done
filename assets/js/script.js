let userFormEl = document.querySelector("#user-form");
let nameInputEl = document.querySelector("#username");

function formSubmitHandler(event) {
    event.preventDefault();
    console.log(event);
    let username = nameInputEl.value.trim();

    if(username) {
        getUserRepos(username);
        nameInputEl.value = "";
    }else 
        alert("Please enter a Github username");
}

function getUserRepos(user) {
    let apiUrl = "https://api.github.com/users/"+ user +"/repos";
    fetch(apiUrl).then((response) => {
        response.json().then((data) => {
            console.log(data);
        });
    });
}

userFormEl.addEventListener("submit", formSubmitHandler);