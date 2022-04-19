import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

const ReplenishFamilyBudget = () => {

    const {id} = useParams();
    const loginUser = JSON.parse(localStorage.getItem('loggeduser'));
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        cash: ""
    });

    const handleChange = e => {
        setError(null);
        setFormData({...formData, [e.target.name]: e.target.value}); // заміняє нічого на значення, які я ввів в інпуті
    };

    const handleReplenish = async e => {
        e.preventDefault()

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa(`${loginUser.username}:${loginUser.password}`)}`);
        headers.set('content-type', 'application/json');

        setError(null);

        const data = {
            cash: formData.cash
        };

        if (formData.cash > 0){
            fetch(`http://0.0.0.0:8089/api/v1/budget/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers,
            }).then((response) => {
                if (response.status === 200) {
                    navigate('/familybudget/' + id)
                } else {
                    response.text().then((data) => {
                        setError(data)
                    });
                }
            }).catch((e) => {
                console.log(e)
            });
        } else {
            setError("Amount must be greater than 0!")
        }

    };

    const handleGoBack = async e => {
        e.preventDefault()

        navigate("/familybudget/" + id)

    };

    if (!loginUser){
        navigate("/login")
    } else {
        return (
            <div className="maindiv">
                <form className="loginform">
                    <h1 className="textbold">Enter amount of money you want to replenish</h1>

                    <div>
                        <input placeholder="" type="text" className="field" name="cash" required
                               minLength="1" value={formData.cash} onChange={handleChange}/>
                    </div>

                    <div>
                        <button onClick={handleReplenish} type="submit" className="logoutbtn">Replenish</button>
                    </div>

                    <div>
                        <p></p>
                    </div>
                    <div>
                        <button onClick={handleGoBack} type="submit" className="logoutbtn">Return to menu</button>
                    </div>

                </form>
                <p className="error">{error}</p>

            </div>
        );
    }
}

export default ReplenishFamilyBudget;