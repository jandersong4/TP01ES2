import axios from 'axios';
import{
  BrowserRouter as Router,
  Switch,
  Route
 } from 'react-router-dom';

import Home from './compenents/Home/Home';
import Login from './compenents/Login/Login';
import Dashboard from './compenents/Dashboard/Dashboard';
// import './App.css';

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
   axios.defaults.withCredentials = true;
  return (
    <div className="App">
     <Router>
       <Switch>
       <Route path="/dashboard">
            <Dashboard />
         </Route>
       <Route path="/login">
            <Login />
         </Route>
        <Route path="/">
            <Home />
         </Route>
       </Switch>
     </Router>
    </div>
  );
}

export default App;
