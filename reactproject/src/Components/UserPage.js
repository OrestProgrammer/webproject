import React, {useEffect, useState} from 'react';
import photo from "./photo.png"
import {Link, useNavigate} from "react-router-dom";


const UserPage = () => {

    const loginUser = JSON.parse(localStorage.getItem('loggeduser'));
    const [user, setUser] = useState(loginUser);
    const navigate = useNavigate();


    useEffect(() => {
        const headers = new Headers();

        // headers.set('Authorization', 'Basic ' + btoa(loginUser.username + ":" + loginUser.password));
        // headers.set('content-type', 'application/json');

        headers.set('Authorization', `Basic ${btoa(`oliver:12345678`)}`);
        headers.set('content-type', 'application/json');

        fetch(`http://0.0.0.0:8089/api/v1/user/oliver`, {
            method: 'GET',
            headers,
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
    }, []);


    const handleLogOut = async e => {
        e.preventDefault();


        localStorage.removeItem('loggeduser');
        navigate("/login")
    };


    if (!loginUser){
        navigate("/login")
    } else {
        return (
            <div className="maindiv">
                <form data-testid="user_page_form" className="loginform">
                    <h1 className="textbold">Account</h1>

                    <img src={photo} className="profilephoto"/>

                    <div>
                        <h2 className="textbold">Your information: </h2>

                        <p className="pteg" id="firstname">First Name: {user && user.firstname}</p>
                        <p id="lastname">Last Name: {user && user.lastname}</p>
                        <p id="username">Login: {user && user.username}</p>
                        <p id="email">Email: {user && user.email}</p>
                        <p id="phone">Phone: {user && user.phone}</p>
                    </div>

                    <Link to={"/edituser"}>
                        <button type="submit" className="signinbtn">Edit account</button>
                    </Link>

                    <div>
                        <button onClick={handleLogOut} type="submit" className="logoutbtn">Log out</button>
                    </div>

                </form>
            </div>
        );
    }
}
export default UserPage;