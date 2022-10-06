import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from './logo.png'
import { Link } from "react-router-dom"

const Signup = (props) => {


    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

    let navigate = useNavigate();         // Hook To redirect authtoken and save



    const handleSubmit = async (e) => {
        e.preventDefault()       // not reload page on form submit

        const { name, email, password } = credentials;
        //api call
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })

        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            //Save the authtoken and redirect
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            props.showAlert('Account Created Successfully', 'success')
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
                    <form onSubmit={handleSubmit} >
                        <img className="mb-4" src={logo} alt="iNotebook" />
                        <h1 className="h3 mb-3 fw-normal">Please login in</h1>
                        <div className="form-floating my-3">
                            <input type="text" className="form-control" id="name" name='name' onChange={onChange} value={credentials.name} required minLength={5} placeholder="Name" />
                            <label htmlFor="floatingInput" >Full Name</label>
                        </div>
                        <div className="form-floating my-3">
                            <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credentials.email} required minLength={5}
                                placeholder="name@example.com" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            <label htmlFor="email">Email address</label>
                        </div>

                        <div className="form-floating my-3">
                            <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} required minLength={5} placeholder="sj123456" />
                            <label htmlFor="password" >Password</label>
                        </div>
                        <div className="form-floating my-3">
                            <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} required minLength={5} placeholder="sj123456" />
                            <label htmlFor="cpassword" >Confirm Password</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Signup</button>
                    </form>
                    <div className='my-3'> Already have an account? &nbsp;
                        <Link to="/login" role="button">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup