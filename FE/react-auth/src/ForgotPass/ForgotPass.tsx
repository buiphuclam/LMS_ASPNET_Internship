import React, {SyntheticEvent, useState} from "react"
import { Redirect } from "react-router-dom";

const ForgotPass = () => {
    const [email, setMail] = useState('');
    const [redirect, setRedirect] = useState(false);
    

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('https://lmsg03.azurewebsites.net/api/Authenticate/forgetpassword',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
            })
        });

        const content = await response.json();
        if(content.status=='200')
        {
            alert(content.message)
            return <Redirect to="/login"/>;
        }
        
        
    }

    if(redirect)
        return <Redirect to="/login" />;

    return (
            <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please enter email </h1>
            <input type="email" className="form-control" placeholder="Email" required
                onChange = {e => setMail(e.target.value)}/>
                <pre></pre>           
            <button className="w-100 btn btn-lg btn-primary" type="submit">Confirm</button>
            </form>
            
    );
};

export default ForgotPass;