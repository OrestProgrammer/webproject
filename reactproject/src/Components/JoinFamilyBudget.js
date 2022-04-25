import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const JoinFamilyBudget = () => {

    const loginUser = JSON.parse(localStorage.getItem('loggeduser'));
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        familibudgetId: ""
    });

    const handleChange = e => {
        setError(null);
        setFormData({...formData, [e.target.name]: e.target.value}); // заміняє нічого на значення, які я ввів в інпуті
    };

    const handleJoinFamilyBudget = async e => {
        e.preventDefault()

        const headers = new Headers();
        // headers.set('Authorization', `Basic ${btoa(`${loginUser.username}:${loginUser.password}`)}`);
        // headers.set('content-type', 'application/json');

        headers.set('Authorization', `Basic ${btoa(`oliver:12345678`)}`);
        headers.set('content-type', 'application/json');

        setError(null);

        const data = {
            familibudgetId: formData.familibudgetId
        };

        fetch(`http://0.0.0.0:8089/api/v1/user/finduser/oliver`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers,
        }).then((response) => {
            if (response.status === 200) {
                navigate('/selectbudget')
            } else {
                response.text().then((data) => {
                    setError(data)
                });
            }
        }).catch((e) => {
            console.log(e)
        });

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
                <form data-testid="join_budget_form" className="loginform">
                    <h1 className="textbold">Enter budget ID you want to join</h1>

                    <div>
                        <input placeholder="" type="text" className="field" name="familibudgetId" required
                               minLength="1" value={formData.familibudgetId} onChange={handleChange}/>
                    </div>

                    <div>
                        <button data-testid="join_budget_btn" onClick={handleJoinFamilyBudget} type="submit" className="logoutbtn">Join budget</button>
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

export default JoinFamilyBudget;