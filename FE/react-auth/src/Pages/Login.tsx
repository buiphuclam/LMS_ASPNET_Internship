import React, {SyntheticEvent, useState} from "react"
import { Redirect } from "react-router-dom";

const Login = (props: {setName: (name:string) => void}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('https://lmsg03.azurewebsites.net/api/authenticate/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username,
                password
            })
        });

        const content = await response.json();

        if(content.message === 'Success!')
        {
            setRedirect(true);
        
            props.setName(username);
        }
    }

    if(redirect)
        return <Redirect to="/" />;

    return (
            <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in </h1>
            <input type="username" className="form-control" placeholder="Username" required
                onChange = {e => setUsername(e.target.value)}/>
            <input type="password" className="form-control" placeholder="Password" required
                onChange = {e => setPassword(e.target.value)}/>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

            </form>
            
    );
};

export default Login;