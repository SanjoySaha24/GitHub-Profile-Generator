// const APIURL = "https://api.github.com/users/";
// const main = document.getElementById("main");
// const form = document.getElementById("form");
// const search = document.getElementById("search");

// // Fetch the roast from the backend
// async function getRoast(username) {
//     try {
//         const resp = await fetch(`/roast/${username}`);
//         const respData = await resp.json();

//         if (resp.ok) {
//             document.getElementById("roastOutput").textContent =
//                 respData.roast || "No roast available.";
//         } else {
//             document.getElementById("roastOutput").textContent =
//                 "Failed to fetch roast. Please try again.";
//         }
//     } catch (error) {
//         console.error('Failed to fetch roast:', error);
//         document.getElementById("roastOutput").textContent =
//             "Failed to fetch roast. Please try again.";
//     }
// }

// // Handle form submission
// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const user = search.value.trim();
//     if (user) {
//         getRoast(user);
//         search.value = "";
//     }
// });

// // Handle search button click
// const searchBtn = document.getElementById("searchBtn");

// searchBtn.addEventListener("click", () => {
//     const user = search.value.trim();
//     if (user) {
//         getRoast(user);
//         search.value = "";
//     }
// });


const APIURL = "https://api.github.com/users/";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Fetch user data and roast from the backend
async function getUserAndRoast(username) {
    try {
        // Fetch user data from GitHub
        const userResp = await fetch(APIURL + username);
        const userData = await userResp.json();

        if (!userResp.ok) {
            throw new Error("User not found");
        }

        // Fetch roast from the backend
        const roastResp = await fetch(`/roast/${username}`);
        const roastData = await roastResp.json();

        if (!roastResp.ok) {
            throw new Error("Failed to fetch roast");
        }

        createUserCard(userData, roastData.roast);
    } catch (error) {
        console.error('Error:', error);
        main.innerHTML = `<p class="error">User not found or failed to fetch roast. Please try again.</p>`;
    }
}

// Create user card with roast
function createUserCard(user, roast) {
    const cardHTML = `
        <div class="card">
            <div class="user-info">
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
                <h2>${user.name}</h2>
            </div>
            <div id="roastOutput" class="roast">${roast || "No roast available."}</div>
        </div>
    `;

    main.innerHTML = cardHTML;
}

// Handle form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value.trim();
    if (user) {
        getUserAndRoast(user);
        search.value = "";
    }
});

// Handle search button click
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
    const user = search.value.trim();
    if (user) {
        getUserAndRoast(user);
        search.value = "";
    }
});
