import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver'

const AllPapers = () => {
    const [allPapers, setAllPapers] = useState([]);
    const [mathPapers, setMathPapers] = useState([]);
    const [physicsPapers, setPhysicsPapers] = useState([]);
    const [showPhysicsPapers, setShowPhysicsPapers] = useState(false)
    const [showMathPapers, setShowMathPapers] = useState(false)
    const [showAllPapers, setShowAllPapers] = useState(false)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/all-papers`)
            .then(res => {
                setAllPapers(res.data);
                setShowAllPapers(true)
            });
    }, []);

    const handlePhysicsPapers = async () =>{
        await axios.get(`${import.meta.env.VITE_BASE_URL}/all-papers?subject=physics`)
        .then(res => {
            setPhysicsPapers(res.data)
            setShowPhysicsPapers(true)
            setShowAllPapers(false)
            setShowMathPapers(false)
        })
    }

    const handleMathPapers = async () =>{
        await axios.get(`${import.meta.env.VITE_BASE_URL}/all-papers?subject=math`)
       .then(res => {
            setMathPapers(res.data)
            setShowMathPapers(true)
            setShowAllPapers(false)
            setShowPhysicsPapers(false)
        })
    }

    const handleAllPapers = async () =>{
        await axios.get(`${import.meta.env.VITE_BASE_URL}/all-papers`)
      .then(res => {
            setAllPapers(res.data)
            setShowAllPapers(true)
            setShowMathPapers(false)
            setShowPhysicsPapers(false)
        })
    }

    const getImageNameFromURL = (url) => {
        const parts = url.split('/');
        const imageName = parts[parts.length - 1];
        return imageName;
      }      

    const handleDownload = (url) => {
        const name = getImageNameFromURL(url);
        saveAs(url, name)
    }

    // console.log(allPapers, showAllPapers);

    return (
        <div>
            <p className='md:text-3xl text-xl font-bold text-center my-10'>All Papers</p>
            <div className='flex w-11/12 md:w-1/2 justify-between items-center mx-auto mb-8'>
            <button onClick={handlePhysicsPapers} className='btn btn-sm md:btn-md btn-primary md:font-bold'>Physics papers</button>
            <button onClick={handleMathPapers} className='btn btn-sm md:btn-md btn-primary md:font-bold'>Math papers</button>
            <button onClick={handleAllPapers} className='btn btn-sm md:btn-md btn-primary md:font-bold'>All papers</button>
            </div>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-5'>
                { showAllPapers && allPapers.map((paper, index) => (
                    <div key={index} className="card w-80 md:w-96 glass mx-auto">
                        <figure><img className='w-full' src={paper.image} alt={paper.email} /></figure>
                        <div className="card-body">
                            <p className='font-semibold md:text-xl'>Student name: <span className='font-normal'>{paper.name}</span></p>
                            <p className='font-semibold md:text-xl'>Exam name: <span className='font-normal'>{paper.examName}</span></p>
                        </div>
                        <button onClick={() => handleDownload(paper.image, paper.name)} className='btn w-full btn-sm md:btn-md btn-primary'>Download</button>
                    </div>
                ))}
                { showPhysicsPapers && physicsPapers.map((paper, index) => (
                    <div key={index} className="card w-80 md:w-96 glass mx-auto">
                        <figure><img className='w-full' src={paper.image} alt={paper.email} /></figure>
                        <div className="card-body">
                            <p className='font-semibold md:text-xl'>Student name: <span className='font-normal'>{paper.name}</span></p>
                            <p className='font-semibold md:text-xl'>Exam name: <span className='font-normal'>{paper.examName}</span></p>
                        </div>
                        <button onClick={() => handleDownload(paper.image, paper.name)} className='btn w-full btn-sm md:btn-md btn-primary'>Download</button>
                    </div>
                ))}
                { showMathPapers && mathPapers.map((paper, index) => (
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

export default AllPapers;
