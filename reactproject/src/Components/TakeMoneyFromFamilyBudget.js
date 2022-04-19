import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

const TakeMoneyFromFamilyBudget = () => {

    const loginUser = JSON.parse(localStorage.getItem('loggeduser'));
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [user, setUser] = useState(loginUser);


    const [formData, setFormData] = useState({
        transaction_amount: ""
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
           setUser(data.user)
        })
    }, []);

    const handleChange = e => {
        setError(null);
        setFormData({...formData, [e.target.name]: e.target.value}); // заміняє нічого на значення, які я ввів в інпуті
    };

    const handleTakeMoney = async e => {
        e.preventDefault()

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa(`${loginUser.username}:${loginUser.password}`)}`);
        headers.set('content-type', 'application/json');

        setError(null);

        const data = {
            transaction_amount: formData.transaction_amount
        };

        if (formData.transaction_amount > 0) {
            fetch(`http://0.0.0.0:8089/api/v1/user/${loginUser.username}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers,
            }).then((response) => {
                if (response.status === 200) {
                    navigate('/mybudget/' + user.budgetId)
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

        navigate("/mybudget/" + user.budgetId)

    };


    if (!loginUser){
        navigate("/login")
    } else {
        return (
            <div className="maindiv">
                <form className="loginform">
                    <h1 className="textbold">Enter amount of money you want to take from family budget</h1>

                    <div>
                        <input placeholder="" type="text" className="field" name="transaction_amount" required
                               minLength="1" value={formData.transaction_amount} onChange={handleChange}/>
                    </div>

                    <div>
                        <button onClick={handleTakeMoney} type="submit" className="logoutbtn">Replenish</button>
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

export default TakeMoneyFromFamilyBudget;