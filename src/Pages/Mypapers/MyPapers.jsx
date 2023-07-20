import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import { saveAs } from 'file-saver'

const MyPapers = () => {
    const [papers, setPapers] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUserResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/current-user/${user.email}`);

                const papersResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-papers?email=${currentUserResponse.data.email}`);
                setPapers(papersResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);

    const getImageNameFromURL = (url) => {
        const parts = url.split('/');
        const imageName = parts[parts.length - 1];
        return imageName;
      }      

    const handleDownload = (url) => {
        const name = getImageNameFromURL(url);
        saveAs(url, name)
    }

    return (
        <div>
            <p className='md:text-3xl text-xl font-bold text-center my-10'>My Papers</p>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-5'>
                {papers.map((paper, index) => (
                    <div key={index} className="card w-80 md:w-96 glass mx-auto">
                        <figure><img className='w-full' src={paper.image} alt={paper.email} /></figure>
                        <div className="card-body">
                            <p className='font-semibold md:text-xl'>Student name: <span className='font-normal'>{paper.name}</span></p>
                            <p className='font-semibold md:text-xl'>Exam name: <span className='font-normal'>{paper.examName}</span></p>
                        </div>
                        <button onClick={() => handleDownload(paper.image, paper.name)} className='btn w-full btn-sm md:btn-md btn-primary'>Download</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyPapers;
