let issueContainerEl = document.querySelector("#issues-container");
let limitWarningEl = document.querySelector("#limit-warning");
let repoNameEl = document.querySelector("#repo-name");

function getRepoIssues(repo) {

    let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then((response) => {
        if(response.ok) {
            response.json().then((data) => {
                displayIssues(data);

                // check if api has paginated issues 
                if(response.headers.get("Link"))
                    displayWarning(repo);
            });
        }else {
            alert("ERROR There was a problem with your request. Redirecting you to the homepage.");
            document.location.replace("./index.html");
        } 
    });
}

function getRepoName() {
    let queryString = document.location.search;
    let repoName = queryString.split("=")[1];
    if(repoName) {
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);
    }else
        document.location.replace("./index.html");
}

function displayIssues(issues) {
    if(issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues";
        return;
    }

    for(let i = 0; i < issues.length; i++) {
        let issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target",  "_blank");

        let titleEl = document.createElement("span");
        titleEl.textContent =issues[i].title;

        issueEl.appendChild(titleEl);

        let typeEl = document.createElement("span");

        if(issues[i].pull_resquest)
            typeEl.textContent = "(Pull request)";
        else 
            typeEl.textContent = "(issue)";

        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }
}

function displayWarning(repo) {
    limitWarningEl.textContent = "To see more than 30 issues. "

    let linkEl = document.createElement("a");
    linkEl.textContent = "See more issues on Github.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target",  "_blank");

    limitWarningEl.appendChild(linkEl);
}

getRepoName();