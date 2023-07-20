import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import Loader from '../Shared/Loader';
import axios from 'axios';
import Swal from 'sweetalert2';

const UploadPapers = () => {
    const [error, setError] = useState('')
    const { loading } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const name = form.name.value;
        const examName = form.examName.value.toLowerCase();
        const image = form.photo.files[0]; // Get the selected file from the file input

        // console.log(email, image);

        // Create a new FormData object
        const formData = new FormData();
        formData.append('image', image);
        
        setError('')
        // Example: Upload image using fetch
        await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API_KEY}`, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if(data.success === true){
                    Swal.fire({
                        icon: 'success',
                        text: 'Photo uploaded successfully',
                    })
                }
                const image = data.data.url;
                const paper = {name, email, image, examName, date: new Date() }
                axios.post(`${import.meta.env.VITE_BASE_URL}/all-papers`, paper)
                    .then(response => console.log(response))
                // Handle the response from the server
            })
            .catch((error) => {
                setError('Error uploading image. Please try again.')
                // Handle any errors that occur during the upload
                console.error('Error uploading image:', error);
            });
    };


    return (
        <>
            {
                loading && <Loader />
            }
            <div className="hero">
                <form onSubmit={handleSubmit} className="card w-full max-w-sm md:max-w-md shadow-2xl bg-base-300 my-10">
                    <p className='text-xl font-bold md:pt-5 pt-3 mx-auto md:text-3xl'>Upload Paper</p>
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label font-semibold">Student Email</label>
                            <input name='email' type="text" placeholder="Student Email" className="input input-bordered focus:outline-none" required />
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold">Student Name</label>
                            <input name='name' type="text" placeholder="Student Name" className="input input-bordered focus:outline-none" required />
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold">Exam Name</label>
                            <input name='examName' type="text" placeholder="Exam Name" className="input input-bordered focus:outline-none" required />
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold">Photo</label>
                            <input type="file" name='photo' className="file-input file-input-bordered w-full focus:outline-none" required />
                        </div>
                        <p className='text-red-600'>{error}</p>
                        <div className="form-control">
                            <button type='submit' className="btn btn-primary font-bold">upload</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UploadPapers;