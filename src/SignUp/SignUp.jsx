import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'
import { AuthContext } from '../Providers/AuthProviders';
import Loader from '../Pages/Shared/Loader';
import Swal from 'sweetalert2'
import axios from 'axios'

const SignUp = () => {
    const [error, setError] = useState('')
    const { setUser, loading, setLoading, createUser, googleSignInUser } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const username = form.userName.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        setError('')

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{6}$/;

        if (password !== confirmPassword) {
            alert('Passwords did not match');
            return;
        } else if (password < 6) {
            setError('Password must be at least 6 characters')
            return;
        } else if (regex.test(password)) {
            setError('Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 symbol')
            console.log(password);
            return
        }

        const userData = { username, email, password, role: 'student' }

        createUser(email, password)
            .then(result => {
                const user = result.user
                axios.post(`${import.meta.env.VITE_BASE_URL}/all-users`, userData)
                    .then(result => {
                        console.log(result.data);
                        setUser(user)
                        Swal.fire({
                            icon: 'success',
                            text: 'Sign Up Successfully',
                        })
                        setLoading(false)
                        navigate('/')
                    })
            })
            .catch(error => {
                const errorMessage = error.message;
                if (errorMessage == 'Firebase: Error (auth/email-already-in-use).') {
                    Swal.fire({
                        icon: 'error',
                        text: 'This email is already in use. Please Login',
                    })
                    setError('This email is already in use. Please Login')
                    setLoading(false)
                } else if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
                    Swal.fire({
                        icon: 'error',
                        text: 'Please input a valid email address',
                    })
                    setError('Please input a valid email address');
                    setLoading(false)
                }
                setLoading(false)
            })
    }

    const handleGoogleSignIn = () => {
        googleSignInUser()
            .then(result => {
                const user = result.user
                const userData = { username: user.displayName, email: user.email, image: user.photoURL, role: 'student' }
                axios.post(`${import.meta.env.VITE_BASE_URL}/all-users`, userData)
                    .then(result => {
                        console.log(result.data);
                        setUser(user)
                        Swal.fire({
                            icon: 'success',
                            text: 'Login Successfully',
                        })
                        setLoading(false)
                        navigate('/')
                    })
                console.log(result);
            })
            .catch(error => {
                const errorMessage = error.message;
                if (errorMessage == 'Firebase: Error (auth/popup-closed-by-user).') {
                    setLoading(false)
                }
                console.log(errorMessage)
                setLoading(false)
            })
    }
    return (
        <>
            {
                loading && <Loader />
            }
            <div className="hero">
                <form onSubmit={handleSubmit} className="card w-full max-w-sm md:max-w-md shadow-2xl bg-base-300 my-10">
                    <p className='text-xl font-bold md:pt-5 pt-3 mx-auto md:text-3xl'>Sign Up</p>
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label font-semibold">Username</label>
                            <input name='userName' type="text" placeholder="Username" className="input input-bordered focus:outline-none" required />
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold">Email</label>
                            <input name='email' type="text" placeholder="Email" className="input input-bordered focus:outline-none" required />
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold">Password</label>
                            <input name='password' type="password" placeholder="Password" className="input input-bordered focus:outline-none" required />
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold">Confirm Password</label>
                            <input name='confirmPassword' type="password" placeholder="Confirm Password" className="input input-bordered focus:outline-none" required />
                        </div>
                        <p className='text-red-600'>{error}</p>
                        <p className='text-xs font-semibold my-3'>Already have an account? Please <Link className='underline text-sky-700' to='/log-in'>Login</Link></p>
                        <div className="form-control">
                            <button type='submit' className="btn btn-primary font-bold">Sign Up</button>
                        </div>
                        <div className='divider text-black'>Or</div>
                        <div onClick={handleGoogleSignIn} className='text-black cursor-pointer flex items-center justify-between w-full py-3 px-3 md:px-10 mx-auto border-2 md:mt-3 border-gray-500 rounded-full'><FcGoogle className='w-7 h-7' /> <p className='font-bold md:text-xl text-center'>Sign in with Google</p></div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignUp;