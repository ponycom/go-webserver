import React, {SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import  { Navigate  } from 'react-router-dom';

const Nav = () => {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
          async () => {
            const response = await fetch('http://localhost:1323/api/user/profile', {
              method: 'GET',
              headers: {'Content-Type':'application/json'},
              credentials: 'include',
            });
            
            const content = await response.json();
            console.log(content);
            if(content.errors != null) {
                window.location = "/";
            } else {
                return dashboard;
            }
          }
        )();
    });


    const logout = async () => {
        const response = await fetch('http://localhost:1323/api/auth/logout', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        });

        const content = await response.json();
        console.log(content);
        if(content.errors == null) {
            setRedirect(true);
        }
    }
    if(redirect) {
        return <Navigate to='/'  />
    }

    const dashboard = (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/dashboard" className="navbar-brand" >Home</Link>
                
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                        <Link className="nav-link" onClick={logout}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
    
};


export default Nav;