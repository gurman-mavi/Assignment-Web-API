const githubForm = document.getElementById('githubForm');
const usernameInput = document.getElementById('usernameInput');
const repoList = document.getElementById('repo-list');

githubForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = usernameInput.value.trim();

    if (!username) {
        alert('Please enter a GitHub username.');
        return;
    }

    repoList.innerHTML = '<li>Loading...</li>';

    const apiUrl = `https://api.github.com/users/${username}/repos`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`User not found or API error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            repoList.innerHTML = '';

            if (data.length === 0) {
                repoList.innerHTML = '<li>This user has no public repositories.</li>';
                return;
            }

            data.forEach(repo => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                
                link.href = repo.html_url;
                link.textContent = repo.name;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';

                listItem.appendChild(link);
                repoList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            repoList.innerHTML = `<li>Error: ${error.message}</li>`;
        });
});