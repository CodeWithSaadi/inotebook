import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from './logo.png'
import { Link } from "react-router-dom"

const Login = (props) => {
    const host = "http://localhost:5000"


    const [credentials, setCredentials] = useState({ email: "", password: "" })

    let navigate = useNavigate();         // Hook To redirect authtoken and save

    const handleSubmit = async (e) => {
        e.preventDefault()       // not reload page on form submit

        //api call
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            //Save the authtoken and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert('LogIn Successfully', 'success')
            navigate('/');
        }
        else {
            props.showAlert('Invalid Credentials', 'danger')
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='text-center  '>

            <div className="row justify-content-center align-items-center mt-5">
                <div className="col-4 bg-light border rounded">
                    <form onSubmit={handleSubmit}>
                        <img className="mb-4" src={logo} alt="iNotebook" />
                        <h1 className="h3 mb-3 fw-normal">Please login in</h1>
                        <div className="form-floating">
                            <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange}
                                placeholder="name@example.com" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            <label htmlFor="floatingInput">Email address</label>
                        </div>

                        <div className="form-floating">
                            <input type="password" className="form-control" id="password" name='password' placeholder="Password" value={credentials.password} onChange={onChange} />
                            <label htmlFor="floatingPassword" className="form-label">Password</label>
                        </div>



                        <button type="submit" className="btn btn-primary my-3" >Login</button>

                    </form>
                    <div className='my-3'> Don't have an account? &nbsp;	
                        <Link to="/signup" role="button">Sighnup Now</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login


