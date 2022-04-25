import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

const FamilyBudget = () => {

    const {id} = useParams();
    const loginUser = JSON.parse(localStorage.getItem('loggeduser'));
    const navigate = useNavigate();
    const [budget, setBudget] = useState(loginUser);
    const [error, setError] = useState(null);


    useEffect(() => {
        const headers = new Headers();
        //
        // headers.set('Authorization', 'Basic ' + btoa(loginUser.username + ":" + loginUser.password));
        // headers.set('content-type', 'application/json');

        headers.set('Authorization', `Basic ${btoa(`oliver:12345678`)}`);
        headers.set('content-type', 'application/json');

        fetch(`http://0.0.0.0:8089/api/v1/budget/2`, {
            method: 'GET',
            headers,
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        });

    }, []);

    const handleReplenishBudget = async e => {
        e.preventDefault()

        navigate('/replenishfamilybudget/' + id)

    };

    const handleSeeHistory = async e => {
        e.preventDefault()

        navigate('/familybudgethistory/' + id)

    };

    const handleDeleteBudget = async e => {
        e.preventDefault()

        const headers = new Headers();

        // headers.set('Authorization', 'Basic ' + btoa(loginUser.username + ":" + loginUser.password));
        // headers.set('content-type', 'application/json');

        headers.set('Authorization', `Basic ${btoa(`oliver:12345678`)}`);
        headers.set('content-type', 'application/json');

        fetch(`http://0.0.0.0:8089/api/v1/budget/2`, {
            method: 'DELETE',
            headers,
        }).then((response) => {
            if (response.status === 200) {
                navigate('/selectbudget')
                return response.json();
            }else {
                // response.text().then((data) => {
                //     setError(data)
                // });
            }
        })
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
                    <h1 className="textbold">Your family budget</h1>

                    <div>
                        <h2 className="textbold">Information about your family budget: </h2>

                        <p className="money" id="cash">Available money: {budget && budget.cash}</p>

                    </div>

                    {/*update_budget_cash*/}
                    <button onClick={handleReplenishBudget} type="submit" className="signinbtn">Replenish family budget</button>

                    {/*get_accountHistory*/}
                    <button onClick={handleSeeHistory} type="submit" className="signinbtn">See history of family budget</button>

                    {/*delete_family_budget*/}
                    <button data-testid="family_budget_btn" onClick={handleDeleteBudget} type="submit" className="signinbtn">Delete family budget</button>

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

export default FamilyBudget;