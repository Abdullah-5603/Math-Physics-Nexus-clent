import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'
import { AuthContext } from '../../Providers/AuthProviders';
import Loader from '../Shared/Loader';
import axios from 'axios';

const Login = () => {
    const [error, setError] = useState('')
    const { setUser, loading, setLoading, signInUser, googleSignInUser } = useContext(AuthContext);
    const location = useLocation()
    const navigate = useNavigate();
    const from = location.state?.form?.pathname || '/'

    const handleSubmit = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        setError('')

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{6}$/;

        if (password < 6) {
            setError('Password must be at least 6 characters')
            return;
        } else if (regex.test(password)) {
            setError('Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 symbol')
            return;
        }

        signInUser(email, password)
            .then(result => {
                const user = result.user;
                Swal.fire({
                    icon: 'success',
                    text: 'Login Successfully',
                })
                navigate(from, { replace: true });
                setLoading(false)
                form.reset()
            })
            .catch(error => {
                const errorMessage = error.message
                if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
                    setError('Please Input a valid email address')
                    setLoading(false)
                } else if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
                    setError('wrong password. Please try again')
                    setLoading(false)
                }
                setLoading(false)
                // console.log(errorMessage)
            })
    }

    const handleGoogleSignIn = () => {
        googleSignInUser()
            .then(result => {
                const user = result.user
                const userData = { username: user.displayName, email: user.email, image: user.photoURL, role: 'student' }
                axios.post(`${import.meta.env.VITE_BASE_URL}/all-users`, userData)
                    .then(result => {
                        // console.log(result.data);
                        setUser(user)
                        Swal.fire({
                            icon: 'success',
                            text: 'Login Successfully',
                        })
                        navigate(from, { replace: true });
                        setLoading(false)
                    })
                // console.log(user);
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
                    <p className='text-xl font-bold md:pt-5 pt-3 mx-auto md:text-3xl'>Login</p>
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label font-semibold">Email</label>
                            <input name='email' type="text" placeholder="Email" className="input input-bordered focus:outline-none" required />
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold">Password</label>
                            <input name='password' type="password" placeholder="Password" className="input input-bordered focus:outline-none" required />
                        </div>
                        <p className='text-red-600'>{error}</p>
                        <Link to='/reset-password'><p className='text-sm font-semibold cursor-pointer underline text-sky-600'>Forgot Password?</p></Link>
                        <p className='text-xs font-semibold my-3'>New to Math Physics Nexus? Please <Link className='underline text-sky-700' to='/sign-up'>Sign Up</Link></p>
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

export default Login;