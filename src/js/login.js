const signInButton = document.querySelector('.signinbtn');
const error = document.querySelector('.error');

const currentUser = window.localStorage.getItem('loggeduser');
if (currentUser) {
    window.location.href = '../templates/user_page.html';
}

signInButton.onclick = (e) => {
    e.preventDefault();

    const form = document.querySelector('.loginform');

    if (form.checkValidity()) {
        const requestBody = {
            username: form.username.value,
            password: form.password.value,
        };

        fetch('http://0.0.0.0:8089/api/v1/user/login', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => {
            if (response.status === 200) {
                window.localStorage.setItem('loggeduser', JSON.stringify(requestBody));
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
