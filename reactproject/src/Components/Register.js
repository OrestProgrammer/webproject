import React, {useState} from 'react';
import "./login.css"
import {Link, useNavigate} from "react-router-dom";


const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        email: "",
        phone: ""
    });

    const [error, setError] = useState(null); // стан компонента

    const handleChange = e => { // дозволить ввести текст в поля форми
        setError(null);
        setFormData({...formData, [e.target.name]: e.target.value}); // заміняє нічого на значення, які я ввів в інпуті
    };

    const handleSubmit = async e => {
        e.preventDefault();

        setError(null);
        const data = {
            firstname: formData.firstname,
            lastname: formData.lastname,
            username: formData.username,
            password: formData.password,
            email: formData.email,
            phone: formData.phone
        };
        fetch('http://0.0.0.0:8089/api/v1/user', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => {
            if (response.status === 200) {
                window.localStorage.setItem('loggeduser', JSON.stringify(data));
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

    return (
        <div className="maindiv">
            <form onSubmit={handleSubmit} className="loginform">
                <h1 className="textbold">Sign Up</h1>

                <div>
                    <Link to={"/login"}><button type="button" className="signupbtnup">Login</button></Link>
                    <button type="button" className="loginbtnup">Sign Up</button>
                </div>
                <div>
                    <input placeholder="Name" type="text" className="field" name="firstname" required minLength="3" value={formData.firstname}
                           onChange={handleChange}/>
                </div>
                <div>
                    <input placeholder="Surname" type="text" className="field" name="lastname" required minLength="3" value={formData.lastname}
                           onChange={handleChange}/>
                </div>
                <div>
                    <input placeholder="Login" type="text" className="field" name="username" required minLength="3" value={formData.username}
                           onChange={handleChange}/>
                </div>
                <div>
                    <input placeholder="Password" type="password" className="field" name="password" required
                           minLength="6" value={formData.password} onChange={handleChange}/>
                </div>
                <div>
                    <input placeholder="Email" type="email" className="field" name="email" required minLength="3" value={formData.email} onChange={handleChange}/>
                </div>
                <div>
                    <input placeholder="Phone" type="text" className="field" name="phone" required minLength="3" value={formData.phone} onChange={handleChange}/>
                </div>

                <button type="submit" className="registerbtn">Register</button>

                <p className="textitalics">Do you have an account? - <Link to={"/login"}>Sign In</Link></p>

            </form>
            <p className="error">{error}</p>

        </div>
    );
}

export default Register;