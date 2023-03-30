import React from 'react';
import './Navbar.css';
import { BrowserRouter as Router, Routes, PrivateRoute, Route, Link } from 'react-router-dom';
import { App } from '../App';
import { Auth } from '../Restock/Auth';
import { Restock } from '../Restock/Restock';


export class Navbar extends React.Component {
    render(){
        return (
        // Navbar Div with Title
        <Router>
            <div className="navbar-style">
                <h2 className="title"> 
                    <Link to="/" className="app-btn">ColaCo</Link>
                    <Link to="/admin">
                    <button className="restock-btn" type="button">
                        <span className="restock-btn-shadow"></span>
                        <span className="restock-btn-edge"></span>
                        <span className="restock-btn-front text">
                        Re-Stock
                        </span>
                    </button>
                    </Link>
                </h2>  
            </div>
            <Routes>
                <Route exact path="" element={<App/>} />
                <Route path="/admin" element={<Auth />} />
                <Route path="/restock" element={<Restock />} />
            </Routes>
        </Router>
        );
    }
}