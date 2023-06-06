const avatar = document.getElementById('img-avatar');
const banner = document.getElementById('img-banner');
const userData = document.getElementById('userData');

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('@');

// const username = JSON.parse(sessionStorage.getItem('authenticatedUser')).username;

window.addEventListener('DOMContentLoaded', function() {
    let user;
    console.log(username);
    fetch(`/api/users/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(result) {
        result.json().then(json => {
            user = json[0];

            loadProfile(user);
        })
    })
});

function loadProfile(user) {
    avatar.src = user.avatarUrl;
    banner.src = user.bannerUrl;

    userData.innerHTML = `
        <span>${user.name}</span>
        <span>@${user.username}</span>
        <span>${user.status}</span>
        <span>Bio: ${user.bio}</span>
        <span>Local: ${user.location}</span>
        <span>Desde de: ${user.createdAt}</span>
    `;
}