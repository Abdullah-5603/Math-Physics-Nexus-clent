import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'
import { AuthContext } from '../Providers/AuthProviders';
import Loader from '../Pages/Shared/Loader';
import Swal from 'sweetalert2'

const SignUp = () => {
    const { user, setUser, loading, setLoading, createUser, googleSignInUser } = useContext(AuthContext)

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const username = form.userName.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        if (password !== confirmPassword) {
            alert('Passwords did not match');
            return;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user
                setUser(user)
                setLoading(false)
            })
            .catch(error =>{
                const errorMessage = error.message;
                if (errorMessage == 'Firebase: Error (auth/email-already-in-use).') {
                    Swal.fire({
                        icon: 'error',
                        text: 'This email is already in use. Please Login',
                      })
                }
                console.log(errorMessage)
                setLoading(false)
            })
        // console.log(username,email,password);

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
                        <p className='text-xs font-semibold my-3'>Already have an account? Please <Link className='underline text-sky-700' to='/log-in'>Login</Link></p>
                        <div className="form-control">
                            <button type='submit' className="btn btn-primary font-bold">Sign Up</button>
                        </div>
                        <div className='divider text-black'>Or</div>
                        <div className='text-black cursor-pointer flex items-center justify-between w-full py-3 px-3 md:px-10 mx-auto border-2 md:mt-3 border-gray-500 rounded-full'><FcGoogle className='w-7 h-7' /> <p className='font-bold md:text-xl text-center'>Sign in with Google</p></div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignUp;