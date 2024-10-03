import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Payment from './pages/Payment';
function App() {
  return (
    <>
      <Router>
        <div className="container">
        <Header/>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/payment" element={<Payment/>}/>
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
