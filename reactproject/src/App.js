import React from 'react';
import './App.css';
import Register from "./Components/Register";
import Login from "./Components/Login";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import UserPage from "./Components/UserPage";
import EditUser from "./Components/EditUser";
import Navbar from "./Components/Navbar";
import SelectBudget from "./Components/SelectBudget";
import FamilyBudget from "./Components/FamilyBudget"
import MyBudget from "./Components/MyBudget";
import JoinFamilyBudget from "./Components/JoinFamilyBudget";
import ReplenishFamilyBudget from "./Components/ReplenishFamilyBudget";
import ReplenishBudget from "./Components/ReplenishBudget";
import TakeMoneyFromFamilyBudget from "./Components/TakeMoneyFromFamilyBudget";
import BudgetHistory from "./Components/BudgetHistory";
import FamilyBudgetHistory from "./Components/FamilyBudgetHistory";


function App() {
  return (
      <Router>
          <Navbar></Navbar>
          <Routes data-testid="test">
              <Route exact path ='/' element={<Login />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/Register' element={<Register />} />
              <Route exact path='/userpage' element={<UserPage />} />
              <Route exact path='/edituser' element={<EditUser />} />
              <Route exact path='/selectbudget' element={<SelectBudget />} />
              <Route exact path='/familybudget/:id' element={<FamilyBudget />} />
              <Route exact path='/mybudget/:id' element={<MyBudget />} />
              <Route exact path='/joinfamilybudget' element={<JoinFamilyBudget />} />
              <Route exact path='/replenishfamilybudget/:id' element={<ReplenishFamilyBudget />} />
              <Route exact path='/replenishbudget/:id' element={<ReplenishBudget />} />
              <Route exact path='/takemoneyfromfamilybudget' element={<TakeMoneyFromFamilyBudget />} />
              <Route exact path='/budgethistory/:id' element={<BudgetHistory />} />
              <Route exact path='/familybudgethistory/:id' element={<FamilyBudgetHistory />} />
          </Routes>
      </Router>
);
}

export default App;
