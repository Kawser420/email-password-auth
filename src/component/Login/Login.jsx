import React from 'react';

const Login = () => {
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
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