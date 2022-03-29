const currentUser = JSON.parse(window.localStorage.getItem('loggeduser'));

if (!currentUser) {
    window.location.href = '../templates/login.html';
}

const form = document.querySelector('.loginform');

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
    window.location.href = '../login.html';
    return false;
}).then((data) => {
    const thisUser = data.user;
    form.firstname.value = thisUser.firstname;
    form.lastname.value = thisUser.lastname;
    form.username.value = thisUser.username;
    form.email.value = thisUser.email;
    form.phone.value = thisUser.phone;
});

const editBtn = document.querySelector('.savebtn');
const error = document.querySelector('.error');

editBtn.onclick = (e) => {
    e.preventDefault();

    if (form.checkValidity()) {
        const requestBody = {
            username: form.username.value,
            firstname: form.firstname.value,
            lastname: form.lastname.value,
            email: form.email.value,
            phone: form.phone.value,
        };

        fetch(`http://0.0.0.0:8089/api/v1/user/finduser/${currentUser.username}`, {
            method: 'PUT',
            body: JSON.stringify(requestBody),
            headers,
        }).then((response) => {
            if (response.status === 200) {
                currentUser.username = requestBody.username;
                window.localStorage.setItem('loggeduser', JSON.stringify(currentUser));
                window.location.href = '../templates/user_page.html';
            } else {
                response.text().then((data) => {
                    error.innerHTML = data;
                });
            }
        }).catch(() => {
            error.innerHTML = e;
        });
    } else {
        error.innerHTML = 'You need to fill all fields with valid data!';
    }
};

const deleteBtn = document.querySelector('.cancelbtn');

deleteBtn.onclick = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8089/api/v1/user/${currentUser.username}`, {
        method: 'DELETE',
        headers,
    }).then((response) => {
        if (response.status === 200) {
            window.localStorage.removeItem('loggeduser');
            window.location.href = '../templates/login.html';
        } else {
            response.text().then((data) => {
                error.innerHTML = data;
            });
        }
    }).catch(() => {
        error.innerHTML = e;
    });
};

const logoutBtn = document.querySelector('.logoutbtn');

logoutBtn.onclick = (e) => {
    e.preventDefault();
    window.localStorage.removeItem('loggeduser');
    window.location.href = '../templates/login.html';
};
