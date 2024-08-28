const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Get the user data and generate the roast
async function getUser(username) {
    try {
        // Fetch user data from GitHub
        const resp = await fetch(APIURL + username);
        const respData = await resp.json();

        if (resp.ok) {
            createUserCard(respData);
            getRepos(username);
            getRoast(username); // Fetch the roast
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        main.innerHTML = `<p class="error">User not found. Please try again.</p>`;
    }
}

// Fetch repositories
async function getRepos(username) {
    try {
        const resp = await fetch(APIURL + username + "/repos");
        const respData = await resp.json();

        addReposToCard(respData);
    } catch (error) {
        console.error('Error fetching repositories:', error);
    }
}

// Fetch roast from the backend
async function getRoast(username) {
    try {
        const resp = await fetch(`/roast/${username}`);
        const respData = await resp.json();

        if (resp.ok) {
            document.getElementById("roastOutput").textContent =
                respData.roast || "No roast available.";
        } else {
            document.getElementById("roastOutput").textContent =
                "Failed to fetch roast. Please try again.";
        }
    } catch (error) {
        console.error('Failed to fetch roast:', error);
        document.getElementById("roastOutput").textContent =
            "Failed to fetch roast. Please try again.";
    }
}

// Create user card
function createUserCard(user) {
    const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos"></div>
                <div id="roastOutput" class="roast"></div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML;
}

// Add repositories to the card
function addReposToCard(repos) {
    const reposEl = document.getElementById("repos");

    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");

            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
}

// Handle form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value.trim();
    if (user) {
        getUser(user);
        search.value = "";
    }
});

// Handle search button click
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
    const user = search.value.trim();
    if (user) {
        getUser(user);
        search.value = "";
    }
});
