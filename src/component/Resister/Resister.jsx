import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from '../../firebase/firebase.config';

const auth = getAuth(app)

const Resister = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password)

        // email password 
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleEmailChange = (event) => {
        // console.log(event.target.value);
        setEmail(event.target.value)
    }

    const handlePasswordBlur = (event) => {
        // console.log(event.target.value);
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Please Resister</h2>
            <form onSubmit={handleSubmit}>
                < input className='w-50 rounded mb-4 pt-2 pb-2' type="email" onChange={handleEmailChange} name="email" id="" placeholder='Your Email' />
                <br />
                < input className='w-50 rounded mb-4 pt-2 pb-2' type="password" onBlur={handlePasswordBlur} name="password" id="" placeholder='Your Password' />
                <br />
                <button className='btn btn-primary' type="submit">Resister Now</button>
            </form>
        </div>
    );
};

export default Resister;