import React from 'react';
import './Navbar.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { App } from '../App';


export class Navbar extends React.Component {
    render(){
        return (
        // Navbar Div with Title
        <Router>
            <div className="navbar-style">
                <h2 className="title"> 
                    <Link to="/" className="app-btn">ColaCo</Link>
                    <Link to="/restock" className="restock-btn">Re-Stock</Link>
                </h2>  
            </div>
            <Routes>
                <Route exact path="/" component={App} />
                {/* <Route path="/restock" component={Restock} /> */}
            </Routes>
        </Router>
        );
    }
}