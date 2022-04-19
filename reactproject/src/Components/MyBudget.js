import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

const MyBudget = () => {

    const {id} = useParams();
    const loginUser = JSON.parse(localStorage.getItem('loggeduser'));
    const navigate = useNavigate();
    const [budget, setBudget] = useState(loginUser);

    useEffect(() => {
        const headers = new Headers();

        headers.set('Authorization', 'Basic ' + btoa(loginUser.username + ":" + loginUser.password));
        headers.set('content-type', 'application/json');

        fetch(`http://0.0.0.0:8089/api/v1/budget/${id}`, {
            method: 'GET',
            headers,
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        }).then((data) => {
            setBudget(data.budget)
        });

    }, []);


    const handleReplenishBudget = async e => {
        e.preventDefault()

        navigate('/replenishbudget/' + id)

    };

    const handleTakeMoneyFromFamilyBudget = async e => {
        e.preventDefault()

        navigate('/takemoneyfromfamilybudget')

    };

    const handleSeeHistory = async e => {
        e.preventDefault()

        navigate('/budgethistory/' + id)

    };

    const handleGoBack = async e => {
        e.preventDefault()

        navigate("/selectbudget")

    };


    if (!loginUser){
        navigate("/login")
    } else {
        return (
            <div className="maindiv">
                <form className="loginform">
                    <h1 className="textbold">Your budget</h1>
                    
                    <div>
                        <h2 className="textbold">Information about your budget: </h2>

                        <p className="money" id="cash">Available money: {budget && budget.cash}</p>

                    </div>

                    {/*update_user_budget*/}
                    <button onClick={handleTakeMoneyFromFamilyBudget} type="submit" className="signinbtn">Take money from family budget</button>

                    {/*update_budget_cash*/}
                    <button onClick={handleReplenishBudget} type="submit" className="signinbtn">Replenish your budget</button>

                    {/*get_accountHistory*/}
                    <button onClick={handleSeeHistory} type="submit" className="signinbtn">See history of budget</button>

                    <div>
                        <p></p>
                    </div>
                    <div>
                        <button onClick={handleGoBack} type="submit" className="logoutbtn">Return to menu</button>
                    </div>

                </form>
            </div>
        );
    }

}

export default MyBudget;