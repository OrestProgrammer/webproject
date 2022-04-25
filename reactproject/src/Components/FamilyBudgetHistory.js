import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";


const FamilyBudgetHistory = () => {

    const {id} = useParams();
    const loginUser = JSON.parse(localStorage.getItem('loggeduser'));
    const [AccountHistory, setUser] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        const headers = new Headers();

        // headers.set('Authorization', 'Basic ' + btoa(loginUser.username + ":" + loginUser.password));
        // headers.set('content-type', 'application/json');

        headers.set('Authorization', `Basic ${btoa(`oliver:12345678`)}`);
        headers.set('content-type', 'application/json');


        fetch(`http://0.0.0.0:8089/api/v1/accounthistory/2`, {
            method: 'GET',
            headers,
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
    }, []);

    const handleGoBack = async e => {
        e.preventDefault()

        navigate("/familybudget/" + id)

    };

    if (!loginUser){
        navigate("/login")
    } else {
        return (
            <div className="maindivhistory">
                <form className="loginform">
                    <h1 className="textbold">History of your family budget operations:</h1>

                    {AccountHistory.length ===0 && <div>
                        <p className="pnone">The history of your family budget is empty!</p>
                    </div>}

                    {AccountHistory.length !==0 && AccountHistory.map(e => (
                        <div key = {e.id} className="history">
                            <p className="pteg" id="sum">Sum: {e.sum}</p>
                            <p className="pteg" id="transaction_type">Transaction type: {e.transaction_type}</p>
                            <p className="pteg" id="time">Time: {moment(e.date).format("MMMM Do YYYY, h:mm:ss a")}</p>
                        </div>
                    ))}

                    <div>
                        <button onClick={handleGoBack} type="submit" className="logoutbtn">Return to menu</button>
                    </div>

                </form>
            </div>
        );
    }
}
export default FamilyBudgetHistory;