import React, {SyntheticEvent, useState } from 'react';
import  { Navigate  } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:1323/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        const content = await response.json();
        console.log(content);

        if(content.errors == null) {
            setRedirect(true);
        }
    }

    if(redirect) {
        return <Navigate to='/dashboard'  />
    }

    return (
        <main className="form-signin">
            <div>
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    <input type="email" className="form-control"  placeholder="name@example.com" required
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input type="password" className="form-control"  placeholder="Password" required
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                </form>
            </div>
        </main>
    );
};

export default Login;