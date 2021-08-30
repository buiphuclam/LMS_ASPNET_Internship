import React, { SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        // const response = 
        await fetch('https://lmsg03.azurewebsites.net/api/authenticate/register',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                email,
                password,
                confirmpassword
            })
        });
        setRedirect(true);

        // const content = await response.json();
    }

    if(redirect)
        return <Redirect to="/login"/>;

    return (
        <div>
            <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>
            <input type="email" className="form-control" placeholder="Username" required
                onChange={e => setUsername(e.target.value)}/>
            <input type="email" className="form-control" placeholder="name@example.com" required
                onChange={e => setEmail(e.target.value)}/>
            <input type="password" className="form-control" placeholder="Password" required
                onChange={e => setPassword(e.target.value)}/>
            <input type="password" className="form-control" placeholder="Confirm password" required
                onChange={e => setConfirmpassword(e.target.value)}/>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>

            </form>

        </div>
    );
};

export default Register;