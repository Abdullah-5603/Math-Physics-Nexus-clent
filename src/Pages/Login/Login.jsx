import React from 'react';
import { Link } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc'

const Login = () => {
    return (
        <div className="hero">
            <form className="card w-full max-w-sm md:max-w-md shadow-2xl bg-base-300 my-10">
                <p className='text-xl font-bold md:pt-5 pt-3 mx-auto md:text-3xl'>Login</p>
                <div className="card-body">
                    <div className="form-control">
                        <label className="label font-semibold">Email</label>
                        <input name='email' type="text" placeholder="Email" className="input input-bordered focus:outline-none" />
                    </div>
                    <div className="form-control">
                        <label className="label font-semibold">Password</label>
                        <input name='password' type="password" placeholder="Password" className="input input-bordered focus:outline-none" />
                    </div>
                    <p className='text-xs font-semibold my-3'>New to Math Physics Nexus? Please <Link className='underline text-sky-700' to='/sign-up'>Sign Up</Link></p>
                    <div className="form-control">
                        <button type='submit' className="btn btn-primary font-bold">Login</button>
                    </div>
                    <div className='divider text-black'>Or</div>
                    <div className='text-black cursor-pointer flex items-center justify-between w-full py-3 px-3 md:px-10 mx-auto border-2 md:mt-3 border-gray-500 rounded-full'><FcGoogle className='w-7 h-7' /> <p className='font-bold md:text-xl text-center'>Sign in with Google</p></div>
                </div>
            </form>
        </div>
    );
};

export default Login;