import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SearchForm from './SearchForm';

class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/" className='navbar-brand'>
                        Weather Report
                    </Link>

                    <SearchForm></SearchForm>

                </div>
            </nav>
        )
    }
}

export default Navbar;


