// document.getElementById('investigate-btn').addEventListener('click', () => {
//     const username = document.getElementById('github-username').value;
//     if (username) {
//         fetchGitHubData(username);
//     } else {
//         alert('Please enter a GitHub username.');
//     }
// });

// async function fetchGitHubData(username) {
//     try {
//         // Fetch user data
//         const userResponse = await fetch(`https://api.github.com/users/${username}`);
//         if (!userResponse.ok) throw new Error('User not found');
//         const userData = await userResponse.json();

//         // Fetch user events
//         const eventsResponse = await fetch(`https://api.github.com/users/${username}/events`);
//         const eventsData = await eventsResponse.json();

//         // Fetch user repositories
//         const reposResponse = await fetch(userData.repos_url);
//         const reposData = await reposResponse.json();

//         // Fetch repository details to check for core contributors
//         const repoDetails = await Promise.all(reposData.map(repo => fetch(repo.url).then(r => r.json())));
        
//         // Display results
//         displayResults(username, userData, eventsData, repoDetails);
//     } catch (error) {
//         console.error(error);
//         document.getElementById('results').innerHTML = `<p>Error: ${error.message}</p>`;
//     }
// }

// function displayResults(username, userData, eventsData, repoDetails) {
//     if (!document.getElementById('external-contributions') || 
//         !document.getElementById('pull-requests') || 
//         !document.getElementById('issues') || 
//         !document.getElementById('top-repositories')) {
//         console.error('One or more result elements are missing in the HTML.');
//         return;
//     }

//     let externalContributions = [];
//     let pullRequests = [];
//     let issues = [];
//     let topRepositories = [];

//     // Get repo names of the user's repositories
//     const userRepoNames = repoDetails.map(repo => repo.full_name);

//     // Process eventsData to get external contributions
//     eventsData.forEach(event => {
//         const repoName = event.repo.name;
//         const isExternal = !repoDetails.find(repo => repo.full_name === repoName && repo.owner.login === username);

//         switch (event.type) {
//             case 'PushEvent':
//                 if (isExternal) {
//                     event.payload.commits.forEach(commit => {
//                         externalContributions.push({
//                             repo: repoName,
//                             stars: event.repo.stargazers_count,
//                             message: commit.message
//                         });
//                     });
//                 }
//                 break;
//             case 'PullRequestEvent':
//                 if (isExternal) {
//                     pullRequests.push({
//                         status: event.payload.pull_request.state.toUpperCase(),
//                         title: event.payload.pull_request.title,
//                         repo: repoName,
//                         stars: event.repo.stargazers_count
//                     });
//                 }
//                 break;
//             case 'IssuesEvent':
//                 if (isExternal) {
//                     issues.push({
//                         status: event.payload.issue.state.toUpperCase(),
//                         title: event.payload.issue.title,
//                         repo: repoName
//                     });
//                 }
//                 break;
//         }
//     });

//     // Process repositories for top repositories section
//     repoDetails.forEach(repo => {
//         topRepositories.push({
//             name: repo.name,
//             stars: repo.stargazers_count,
//             forks: repo.forks_count,
//             commits: repo.size
//         });
//     });

//     topRepositories.sort((a, b) => b.stars - a.stars);
//     topRepositories = topRepositories.slice(0, 5);

//     // Format results
//     let externalContributionsHTML = `<h2>External Contributions (${externalContributions.length} repos):</h2>`;
//     externalContributions.forEach(contribution => {
//         externalContributionsHTML += `
//             <div class="result-item">
//                 <a href="https://github.com/${username}/${contribution.repo}" target="_blank">${username}/${contribution.repo}</a> - ⭐ ${contribution.stars} - ${contribution.message}
//             </div>
//         `;
//     });
//     if (externalContributions.length > 5) {
//         externalContributionsHTML += `<div class="result-item"><a href="#" onclick="alert('Show more details here')">See ${externalContributions.length - 5} More</a></div>`;
//     }

//     let pullRequestsHTML = `<h2>Pull Requests (${pullRequests.length}):</h2>`;
//     pullRequests.forEach(pr => {
//         pullRequestsHTML += `
//             <div class="result-item">
//                 [${pr.status}] ${pr.title} (${username}/${pr.repo}) - ⭐ ${pr.stars}
//             </div>
//         `;
//     });
//     if (pullRequests.length > 5) {
//         pullRequestsHTML += `<div class="result-item"><a href="#" onclick="alert('Show more details here')">See ${pullRequests.length - 5} More</a></div>`;
//     }

//     let issuesHTML = `<h2>Issues (${issues.length}):</h2>`;
//     if (issues.length === 0) {
//         issuesHTML += `<div class="result-item">No issues found</div>`;
//     } else {
//         issues.forEach(issue => {
//             issuesHTML += `
//                 <div class="result-item">
//                     [${issue.status}] ${issue.title} (${username}/${issue.repo})
//                 </div>
//             `;
//         });
//         if (issues.length > 5) {
//             issuesHTML += `<div class="result-item"><a href="#" onclick="alert('Show more details here')">See ${issues.length - 5} More</a></div>`;
//         }
//     }

//     let topRepositoriesHTML = '<h2>Top Repositories:</h2>';
//     topRepositories.forEach(repo => {
//         topRepositoriesHTML += `
//             <div class="result-item">
//                 <a href="https://github.com/${username}/${repo.name}" target="_blank">${repo.name}</a> - ⭐ ${repo.stars}, 🍴 ${repo.forks}, 💻 ${repo.commits} commits
//             </div>
//         `;
//     });
//     if (topRepositories.length > 5) {
//         topRepositoriesHTML += `<div class="result-item"><a href="#" onclick="alert('Show more details here')">See ${topRepositories.length - 5} More</a></div>`;
//     }

//     document.getElementById('external-contributions').innerHTML = externalContributionsHTML;
//     document.getElementById('pull-requests').innerHTML = pullRequestsHTML;
//     document.getElementById('issues').innerHTML = issuesHTML;
//     document.getElementById('top-repositories').innerHTML = topRepositoriesHTML;

//     document.getElementById('print-report-btn').style.display = 'inline-block';
// }

// document.getElementById('print-report-btn').addEventListener('click', () => {
//     window.print();
// });


document.getElementById('investigate-btn').addEventListener('click', () => {
    const username = document.getElementById('github-username').value;
    if (username) {
        fetchGitHubData(username);
    } else {
        alert('Please enter a GitHub username.');
    }
});

async function fetchGitHubData(username) {
    try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) throw new Error('User not found');
        const userData = await userResponse.json();

        // Fetch user events
        const eventsResponse = await fetch(`https://api.github.com/users/${username}/events`);
        const eventsData = await eventsResponse.json();

        // Fetch user repositories
        const reposResponse = await fetch(userData.repos_url);
        const reposData = await reposResponse.json();

        // Fetch repository details to check for core contributors
        const repoDetails = await Promise.all(reposData.map(repo => fetch(repo.url).then(r => r.json())));
        
        // Display results
        displayResults(username, userData, eventsData, repoDetails);
    } catch (error) {
        console.error(error);
        document.getElementById('results').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displayResults(username, userData, eventsData, repoDetails) {
    if (!document.getElementById('external-contributions') || 
        !document.getElementById('pull-requests') || 
        !document.getElementById('issues') || 
        !document.getElementById('top-repositories')) {
        console.error('One or more result elements are missing in the HTML.');
        return;
    }

    let externalContributions = [];
    let pullRequests = [];
    let issues = [];
    let topRepositories = [];

    // Get repo names of the user's repositories
    const userRepoNames = repoDetails.map(repo => repo.full_name);

    // Process eventsData to get external contributions
    eventsData.forEach(event => {
        const repoName = event.repo.name;
        const isExternal = !repoDetails.find(repo => repo.full_name === repoName && repo.owner.login === username);

        switch (event.type) {
            case 'PushEvent':
                if (isExternal) {
                    event.payload.commits.forEach(commit => {
                        externalContributions.push({
                            repo: repoName,
                            stars: event.repo.stargazers_count,
                            message: commit.message
                        });
                    });
                }
                break;
            case 'PullRequestEvent':
                if (isExternal) {
                    pullRequests.push({
                        status: event.payload.pull_request.state.toUpperCase(),
                        title: event.payload.pull_request.title,
                        repo: repoName,
                        stars: event.repo.stargazers_count
                    });
                }
                break;
            case 'IssuesEvent':
                if (isExternal) {
                    issues.push({
                        status: event.payload.issue.state.toUpperCase(),
                        title: event.payload.issue.title,
                        repo: repoName
                    });
                }
                break;
        }
    });

    // Process repositories for top repositories section
    repoDetails.forEach(repo => {
        topRepositories.push({
            name: repo.name,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            commits: repo.size
        });
    });

    topRepositories.sort((a, b) => b.stars - a.stars);
    topRepositories = topRepositories.slice(0, 5);

    // Display External Contributions (limit to 10 initially)
    let externalContributionsHTML = `<h2>External Contributions (${externalContributions.length} repos):</h2>`;
    externalContributions.slice(0, 10).forEach(contribution => {
        externalContributionsHTML += `
            <div class="result-item">
                <a href="https://github.com/${contribution.repo}" target="_blank">${contribution.repo}</a> - ⭐ ${contribution.stars} - ${contribution.message}
            </div>
        `;
    });
    if (externalContributions.length > 10) {
        externalContributionsHTML += `<div class="result-item"><a href="#" id="show-more-external">See ${externalContributions.length - 10} More</a></div>`;
    }

    // Display Pull Requests (limit to 5 initially)
    let pullRequestsHTML = `<h2>Pull Requests (${pullRequests.length}):</h2>`;
    pullRequests.slice(0, 5).forEach(pr => {
        pullRequestsHTML += `
            <div class="result-item">
                [${pr.status}] ${pr.title} (${pr.repo}) - ⭐ ${pr.stars}
            </div>
        `;
    });
    if (pullRequests.length > 5) {
        pullRequestsHTML += `<div class="result-item"><a href="#" id="show-more-pull-requests">See ${pullRequests.length - 5} More</a></div>`;
    }

    // Display Issues (limit to 5 initially)
    let issuesHTML = `<h2>Issues (${issues.length}):</h2>`;
    if (issues.length === 0) {
        issuesHTML += `<div class="result-item">No issues found</div>`;
    } else {
        issues.slice(0, 5).forEach(issue => {
            issuesHTML += `
                <div class="result-item">
                    [${issue.status}] ${issue.title} (${issue.repo})
                </div>
            `;
        });
        if (issues.length > 5) {
            issuesHTML += `<div class="result-item"><a href="#" id="show-more-issues">See ${issues.length - 5} More</a></div>`;
        }
    }

    let topRepositoriesHTML = '<h2>Top Repositories:</h2>';
    topRepositories.forEach(repo => {
        topRepositoriesHTML += `
            <div class="result-item">
                <a href="https://github.com/${username}/${repo.name}" target="_blank">${repo.name}</a> - ⭐ ${repo.stars}, 🍴 ${repo.forks}, 💻 ${repo.commits} commits
            </div>
        `;
    });

    document.getElementById('external-contributions').innerHTML = externalContributionsHTML;
    document.getElementById('pull-requests').innerHTML = pullRequestsHTML;
    document.getElementById('issues').innerHTML = issuesHTML;
    document.getElementById('top-repositories').innerHTML = topRepositoriesHTML;

    // Add event listeners for "See More" links
    if (externalContributions.length > 10) {
        document.getElementById('show-more-external').addEventListener('click', (e) => {
            e.preventDefault();
            externalContributions.slice(10).forEach(contribution => {
                document.getElementById('external-contributions').innerHTML += `
                    <div class="result-item">
                        <a href="https://github.com/${contribution.repo}" target="_blank">${contribution.repo}</a> - ⭐ ${contribution.stars} - ${contribution.message}
                    </div>
                `;
            });
            document.getElementById('show-more-external').remove();
        });
    }

    if (pullRequests.length > 5) {
        document.getElementById('show-more-pull-requests').addEventListener('click', (e) => {
            e.preventDefault();
            pullRequests.slice(5).forEach(pr => {
                document.getElementById('pull-requests').innerHTML += `
                    <div class="result-item">
                        [${pr.status}] ${pr.title} (${pr.repo}) - ⭐ ${pr.stars}
                    </div>
                `;
            });
            document.getElementById('show-more-pull-requests').remove();
        });
    }

    if (issues.length > 5) {
        document.getElementById('show-more-issues').addEventListener('click', (e) => {
            e.preventDefault();
            issues.slice(5).forEach(issue => {
                document.getElementById('issues').innerHTML += `
                    <div class="result-item">
                        [${issue.status}] ${issue.title} (${issue.repo})
                    </div>
                `;
            });
            document.getElementById('show-more-issues').remove();
        });
    }

    document.getElementById('print-report-btn').style.display = 'inline-block';
}

document.getElementById('print-report-btn').addEventListener('click', () => {
    window.print();
});
