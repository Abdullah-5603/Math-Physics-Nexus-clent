import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllPapers = () => {
    const [allPapers, setAllPapers] = useState([]);
    const [mathPapers, setMathPapers] = useState([]);
    const [physicsPapers, setPhysicsPapers] = useState([]);
    const [showPhysicsPapers, setShowPhysicsPapers] = useState(false)
    const [showMathPapers, setShowMathPapers] = useState(false)
    const [showAllPapers, setShowAllPapers] = useState(false)
    const [username, setUsername] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/all-papers`)
            .then(res => {
                setAllPapers(res.data);
                setShowAllPapers(true)
            });

        axios.get(`${import.meta.env.VITE_BASE_URL}/all-users`)
        .then(res => {
              res.data.map(user => setUsername(user.username));
          });
    }, []);

    const handlePhysicsPapers = async () =>{
        await fetch(`${import.meta.env.VITE_BASE_URL}/all-papers/physics`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        // .then(res => {
        //     console.log(res);
        //     setPhysicsPapers(res.data)
        //     setShowPhysicsPapers(true)
        //     setShowAllPapers(false)
        //     setShowMathPapers(false)
        // })
    }
    // console.log(physicsPapers);

    return (
        <div>
            <p className='md:text-3xl text-xl font-bold text-center my-10'>All Papers</p>
            <div className='flex w-3/4 md:w-1/2 justify-between items-center mx-auto mb-8'>
            <button onClick={()=> handlePhysicsPapers} className='btn btn-primary font-bold'>Physics papers</button>
            <button className='btn btn-primary font-bold'>Math papers</button>
            </div>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-5'>
                { showAllPapers && allPapers.map((paper, index) => (
                    <div key={index} className="card w-80 md:w-96 glass mx-auto">
                        <figure><img className='w-full' src={paper.image} alt={paper.email} /></figure>
                        <div className="card-body">
                            <p className='font-semibold text-xl'>Student name: <span className='font-normal'>{username}</span></p>
                            <p className='font-semibold text-xl'>Exam name: <span className='font-normal'>{paper.examName}</span></p>
                        </div>
                    </div>
                ))}
                { showPhysicsPapers && physicsPapers.map((paper, index) => (
                    <div key={index} className="card w-80 md:w-96 glass mx-auto">
                        <figure><img className='w-full' src={paper.image} alt={paper.email} /></figure>
                        <div className="card-body">
                            <p className='font-semibold text-xl'>Student name: <span className='font-normal'>{username}</span></p>
                            <p className='font-semibold text-xl'>Exam name: <span className='font-normal'>{paper.examName}</span></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllPapers;
