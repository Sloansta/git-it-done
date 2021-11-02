let userFormEl = document.querySelector("#user-form");
let nameInputEl = document.querySelector("#username");

let repoContainerEl = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");

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
        if(response.ok) {
            response.json().then((data) => {
                displayRepos(data, user);
            });
        }else 
            alert("Error: Github user not found");
    }).catch((error) => {
        alert("Unable to connect to Github. ERROR: " + error);
    })
}

function displayRepos(repos, searchTerm) {
    // check if api returned any repos
    if(repos.length === 0) {
        repoContainerEl.textContent = "No repositories found."
        return;
    }

    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    for(let i = 0; i < repos.length; i++) {
        let repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        let repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // create span element to hold repository name
        let titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container 
        repoEl.appendChild(titleEl);

        // create a status element
        let statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not 
        if(repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);

        // append container to the dom 
        repoContainerEl.appendChild(repoEl);
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);