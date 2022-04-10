import React, {useState} from 'react';
import "./login.css"
import {Link, useNavigate, Navigate} from "react-router-dom";


const Login = () => {
    const currentUser = localStorage.getItem('loggeduser');


    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        email: "",
        phone: ""
    });

    const [error, setError] = useState(null);

    if(currentUser){
        return <Navigate to={'/userpage'}>  </Navigate>
    }

    const handleChange = e => {
        setError(null);
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async e => {
        e.preventDefault();

        setError(null);
        const data = {
            username: formData.username,
            password: formData.password
        };

        fetch('http://0.0.0.0:8089/api/v1/user/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => {
            if (response.status === 200) {
                window.localStorage.setItem('loggeduser', JSON.stringify(data));
                navigate("/userpage")
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
                <h1 className="textbold">Sign In</h1>

                <div>
                    <button type="submit" className="loginbtnin">Login</button>
                    <Link to={"/register"}><button type="button" className="signupbtnin">Sign Up</button></Link>
                </div>

                <div>
                    <input placeholder="Login" type="text" className="field" name="username" required minLength="3" value={formData.username}
                           onChange={handleChange}/>
                </div>

                <div>
                    <input placeholder="Password" type="password" className="field" name="password" required
                           minLength="6" value={formData.password} onChange={handleChange}/>
                </div>

                <button type="submit" className="signinbtn">Sign In</button>

                <p className="textitalics">Haven't got an account? - <Link to={"/register"}>Sign up</Link></p>

            </form>
            <p className="error">{error}</p>
        </div>
    );
}

export default Login;