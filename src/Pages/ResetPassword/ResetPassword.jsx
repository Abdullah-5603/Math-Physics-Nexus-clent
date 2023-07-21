import React, { useContext, useState } from 'react';
import Loader from '../Shared/Loader';
import { AuthContext } from '../../Providers/AuthProviders';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [error, setError] = useState('')
    const {loading, resetPassword, setLoading } = useContext(AuthContext);
    const location = useLocation()
    const navigate = useNavigate();
    const from = location.state?.form?.pathname || '/'

    const handleSubmit = event => {
        event.preventDefault();
        const email = event.target.email.value;
        resetPassword(email)
        .then(() => {
            // Password reset email sent successfully
            Swal.fire({
                icon: 'success',
                text: 'Password reset email sent. Please check your inbox',
            })
            setLoading(false)
            navigate(from, { replace: true });
            console.log('Password reset email sent');
          })
          .catch((error) => {
            Swal.fire({
                icon: 'error',
                text: 'Error sending password reset email. Resubmit the email and try again',
            })
            setError('Password reset email sent. Please check your inbox')
            // Error occurred while sending password reset email
            console.log('Error sending password reset email', error.message);
          });
    }
    return (
        <>
            {
                loading && <Loader />
            }
            <div className="hero">
                <form onSubmit={handleSubmit} className="card w-full max-w-sm md:max-w-md shadow-2xl bg-base-300 my-10">
                    <p className='text-xl font-bold md:pt-5 pt-3 mx-auto md:text-3xl'>Reset Password</p>
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label font-semibold">Email</label>
                            <input name='email' type="text" placeholder="Email" className="input input-bordered focus:outline-none" required />
                        </div>
                        <p className='text-red-600'>{error}</p>
                        <div className="form-control">
                            <button type='submit' className="btn btn-primary font-bold">submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ResetPassword;