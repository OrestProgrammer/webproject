import logo from './logo.svg';
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



function App() {
  return (
      <Router>
          <Routes>
              <Route exact path ='/' element={<Login />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/Register' element={<Register />} />
              <Route exact path='/userpage' element={<UserPage />} />
              <Route exact path='/edituser' element={<EditUser />} />
          </Routes>
      </Router>
  );
}

export default App;
