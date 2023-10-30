import React, { useRef, useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);


const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const emailRef = useRef();


    const handleLogin = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        //Validation
        setError('');
        setSuccess('');

        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('please at least tow characters uppercase. ex: AB')
            return
        }
        else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('Please Enter  "?=.*[!@#$&*" this type characters')
            return
        }

        else if (password.length < 6) {
            setError('Please inter 6 characters latter')
            return
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                setSuccess('Login successfully');
                setError('');
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const handleResetPassword = event =>{
        const email = emailRef.current.value;
        if(!email) {
            alert('please provide the email Address to reset password')
        }
        sendPasswordResetEmail(auth, email)
        .then( () => {
            alert('please check your Email')
        })
        .catch(error => {
            console.log(error.message)
        })
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <form onSubmit={handleLogin}>
                            <h2 className="text-center">Login</h2>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    name='email'
                                    className="form-control w-50 rounded mb-4"
                                    id="username"
                                    placeholder="Enter your username"
                                    ref={emailRef}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name='password'
                                    className="form-control w-50 rounded mb-4"
                                    id="password"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">
                                Login
                            </button>
                        </form>
                        <p>Forget Your Password? Please, <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></p>
                        <p><small>are you new to website? <Link to="/resister">Resister</Link></small></p>
                        <p className='text-danger'>{error}</p>
                        <p className='text-success'>{success}</p>
                        <label className="form-check-label" htmlFor="termsCheckbox">
                            ☑ I agree to the terms and conditions
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;