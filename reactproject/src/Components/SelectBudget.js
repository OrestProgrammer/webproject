import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

const SelectBudget = () => {

    const loginUser = JSON.parse(localStorage.getItem('loggeduser'));
    const navigate = useNavigate();
    const [user, setUser] = useState(loginUser);
    const [budget, setBudget] = useState(loginUser);
    const [error, setError] = useState(null);
    const [create, setCreate] = useState(null);


    useEffect(() => {
        const headers = new Headers();

        headers.set('Authorization', 'Basic ' + btoa(loginUser.username + ":" + loginUser.password));
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
        });

    }, []);

    const handleMyBudget = async e => {
        e.preventDefault()

        const headers = new Headers();

        headers.set('Authorization', 'Basic ' + btoa(loginUser.username + ":" + loginUser.password));
        headers.set('content-type', 'application/json');

        fetch(`http://0.0.0.0:8089/api/v1/budget/${user.budgetId}`, {
            method: 'GET',
            headers,
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        }).then((data) => {
            setBudget(data.budget)
            console.log(budget)
            navigate("/mybudget/" +  user.budgetId)
        });
    };

    const handleMyFamilyBudget = async e => {
        e.preventDefault()

        if(user.familibudgetId === null){
            setCreate(null)
            setError("You haven't got your family budget. Creat it or join.")
        } else{
            const headers = new Headers();

            headers.set('Authorization', 'Basic ' + btoa(loginUser.username + ":" + loginUser.password));
            headers.set('content-type', 'application/json');

            console.log(user.familibudgetId)
            fetch(`http://0.0.0.0:8089/api/v1/budget/${user.familibudgetId}`, {
                method: 'GET',
                headers,
            }).then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            }).then((data) => {
                setBudget(data.budget)
                navigate("/familybudget/" + user.familibudgetId)
            });
        }
    };

    const handleCreateFamilyBudget = async e => {
        e.preventDefault()

        const headers = new Headers();

        headers.set('Authorization', 'Basic ' + btoa(loginUser.username + ":" + loginUser.password));
        headers.set('content-type', 'application/json');

        fetch(`http://0.0.0.0:8089/api/v1/budget`, {
            method: 'POST',
            headers,
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        }).then((data) => {
            setError(null)
            setCreate("You created your family budget with id: " + data.id + ".\nNow you can join to it.")
        });
    };

    const handleJoinFamilyBudget = async e => {
        e.preventDefault()

        navigate('/joinfamilybudget')

    };

    if (!loginUser){
        navigate("/login")
    } else {
        return (
            <div className="maindiv">
                <form className="loginform">
                    <h1 className="textbold">Select what budget info you want to know</h1>

                    <div>
                        <button onClick={handleMyBudget} type="submit" className="logoutbtn">My budget</button>
                    </div>

                    <div>
                        <button onClick={handleMyFamilyBudget} type="submit" className="logoutbtn">Family budget</button>
                    </div>

                    <p className="createbudget">If you have not got your family budget you can create new one or join to another:</p>
                    <div>
                        <button onClick={handleCreateFamilyBudget} type="submit" className="logoutbtn">Create family budget</button>
                        <button onClick={handleJoinFamilyBudget} type="submit" className="logoutbtn">Join Family budget</button>
                    </div>

                </form>
                <p className="error">{error}</p>
                <p className="create">{create}</p>

            </div>
        );
    }
}

export default SelectBudget;