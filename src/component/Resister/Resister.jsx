import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from '../../firebase/firebase.config';

const auth = getAuth(app)

const Resister = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (event) => {
        // 1.prevent page refresh
        event.preventDefault();
        setSuccess('');
        setError('');
        //2.collect form data
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password)
        //validate password 
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('please add at least one Uppercase')
            return
        }
        else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setError('please add at least tow number')
            return
        }

        else if (password.length < 6) {
            setError('please add at least 6 characters in Your Number')
            return
        }


        //3.create user in Firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setError('');
                event.target.reset();
                setSuccess('User has been created successfully')
            })
            .catch(error => {
                console.log(error.message);
                setError(error.message);
            })

    }

    const handleEmailChange = (event) => {
        // console.log(event.target.value);
        // setEmail(event.target.value)
    }

    const handlePasswordBlur = (event) => {
        // console.log(event.target.value);
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Please Resister</h2>
            <form onSubmit={handleSubmit}>
                < input className='w-50 rounded mb-4 pt-2 pb-2' type="email" onChange={handleEmailChange} name="email" id="" placeholder='Your Email' required />
                <br />
                < input className='w-50 rounded mb-4 pt-2 pb-2' type="password" onBlur={handlePasswordBlur} name="password" id="" placeholder='Your Password' required />
                <br />
                <button className='btn btn-primary' type="submit">Resister Now</button>
            </form>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Resister;