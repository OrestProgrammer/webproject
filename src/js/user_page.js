const currentUser = JSON.parse(window.localStorage.getItem('loggeduser'));

if (!currentUser) {
    window.location.href = '../templates/login.html';
}

const headers = new Headers();
headers.set('Authorization', `Basic ${btoa(`${currentUser.username}:${currentUser.password}`)}`);
headers.set('content-type', 'application/json');
fetch(`http://0.0.0.0:8089/api/v1/user/${currentUser.username}`, {
    method: 'GET',
    headers,
}).then((response) => {
    if (response.status === 200) {
        return response.json();
    }
    return false;
}).then((data) => {
    const { user } = data;
    const firstname = document.getElementById('firstname');
    firstname.append(
        document.createTextNode(user.firstname),
    );
    const lastname = document.getElementById('lastname');
    lastname.append(
        document.createTextNode(user.lastname),
    );
    const username = document.getElementById('username');
    username.append(
        document.createTextNode(user.username),
    );
    const email = document.getElementById('email');
    email.append(
        document.createTextNode(user.email),
    );
    const phone = document.getElementById('phone');
    phone.append(
        document.createTextNode(user.phone),
    );
});

const logoutButton = document.querySelector('.logoutbtn');

logoutButton.onclick = (e) => {
    e.preventDefault();
    window.localStorage.removeItem('loggeduser');
    window.location.href = '../templates/login.html';
};
