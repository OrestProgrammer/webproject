import React, {useEffect, useState} from 'react';
import photo from "./photo.png"
import {useNavigate} from "react-router-dom";


const EditUser = () => {

    const loginUser = JSON.parse(localStorage.getItem('loggeduser'));
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        phone: ""
    });


    useEffect(() => {
        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa(`${loginUser.username}:${loginUser.password}`)}`);
        headers.set('content-type', 'application/json');

        fetch(`http://0.0.0.0:8089/api/v1/user/${loginUser.username}`, {
            method: 'GET',
            headers,
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        }).then((data) => {
            setFormData({firstname: data.user.firstname, lastname: data.user.lastname, username: data.user.username,
                email: data.user.email, phone: data.user.phone})
        })
    }, []);

    const handleChange = e => {
        setError(null);
        setFormData({...formData, [e.target.name]: e.target.value}); // заміняє нічого на значення, які я ввів в інпуті
    };


    const handleSubmit = async e => {
        e.preventDefault();

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa(`${loginUser.username}:${loginUser.password}`)}`);
        headers.set('content-type', 'application/json');

        setError(null);

        const data = {
            firstname: formData.firstname,
            lastname: formData.lastname,
            username: formData.username,
            email: formData.email,
            phone: formData.phone
        };

        fetch(`http://0.0.0.0:8089/api/v1/user/finduser/${loginUser.username}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers,
        }).then((response) => {
            if (response.status === 200) {
                loginUser.username = data.username;
                localStorage.setItem('loggeduser', JSON.stringify(loginUser));
                navigate('/userpage')
            } else {
                response.text().then((data) => {
                    setError(data)
                });
            }
        }).catch((e) => {
           console.log(e)
        });

    };


    const handleLogOut = async e => {
        e.preventDefault();

        localStorage.removeItem('loggeduser');
        navigate("/login")
    };

    const handleDelete = async e => {
        e.preventDefault();

        const headers = new Headers();

        headers.set('Authorization', 'Basic ' + btoa(loginUser.username + ":" + loginUser.password));
        headers.set('content-type', 'application/json');


        fetch(`http://localhost:8089/api/v1/user/${loginUser.username}`, {
            method: 'DELETE',
            headers,
        }).then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('loggeduser');
                navigate("/login")
            } else {
                response.text().then((data) => {
                    setError(data)
                });
            }
        }).catch((e) => {
            console.log(e)
        });
    };


    return (
        <div className="maindiv">
            <form className="loginform">
                <h1 className="textbold">Edit account</h1>

                <img src={photo} className="profilephoto"/>

                <div>
                    <input placeholder="Name" type="text" className="field" name="firstname" value={formData.firstname} onChange={handleChange}/>
                </div>
                <div>
                    <input placeholder="Surname" type="text" className="field" name="lastname" value={formData.lastname} onChange={handleChange}/>
                </div>
                <div>
                    <input placeholder="Login" type="text" className="field" name="username" value={formData.username} onChange={handleChange}/>
                </div>
                <div>
                    <input placeholder="Email" type="email" className="field" name="email" value={formData.email} onChange={handleChange}/>
                </div>
                <div>
                    <input placeholder="Phone" type="text" className="field" name="phone" value={formData.phone} onChange={handleChange}/>
                </div>

                <div>
                    <button onClick={handleSubmit} type="submit" className="savebtn">Save</button>
                    <button onClick={handleDelete} type="submit" className="cancelbtn">Delete</button>
                </div>

                <div>
                    <button onClick={handleLogOut} type="submit" className="logoutbtn">Log out</button>

                </div>

            </form>
            <p className="error">{error}</p>

        </div>

    );
}

export default EditUser;