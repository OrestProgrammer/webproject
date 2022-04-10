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


              {/*<Route exact path='/register' element={<Register loggedIn={loggedIn} handleLogin={setLogin} />} />*/}
              {/*<Route exact path='/account' element={<PrivateRoute />}>*/}
              {/*    <Route exact path='/account' element={<Account loggedIn={loggedIn} />}/>*/}
              {/*</Route>*/}
              {/*<Route exact path='/edit-account' element={<PrivateRoute />}>*/}
              {/*    <Route exact path='/edit-account' element={<EditAccount loggedIn={loggedIn} setLogin={setLogin} setLogout={setLogout} />}/>*/}
              {/*</Route>*/}
          </Routes>
      </Router>
  );
}

export default App;
