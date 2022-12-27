
import JobCard from "../../components/farmer/JobCard";
import JobDialog from "../../components/farmer/JobDialog";

import { useState,useEffect } from "react";
import axios from "axios";


export default function Job(){
    const[jobOffers,setJobOffers] =useState([]);
    const [job,setJob] = useState(null);
    const [dialogSize,setDialogSize] = useState(null);

    const handleOpen = (size, job) => {
        setDialogSize(size);
    
        if (job) {
          setJob(job);
        }
      }

    useEffect(() =>{
        axios.get(import.meta.env.VITE_SERVER_URL +'/api/job/farmer/'+localStorage.getItem('userID'))
        .then ((res)=>{
            console.log(res.data)
            setJobOffers(res.data);
        })
        .catch((err)=>{
            console.log(err);
        });
    },[]);

    return(
      <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Job offered by you
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10">
      
          {jobOffers.map((job) => (
            <JobCard key={job._id} job={job} handleOpen={handleOpen} ></JobCard>
     ) )}
        </div>

        <JobDialog job={job} handleOpen={handleOpen} size={dialogSize} />
      </div>
    </div>
         

    );
}

//<div className="bg-white">
        // <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        //   <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        //     Job offered by you
        //   </h2>

        //   <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        //   <div>
        //   {
        //     jobOffers.map((job) => (
            
        //     <JobCard key={job._id} job={job} 
        //     handleOpen={handleOpen} />
           
        //   ))}
        //   </div>
        // </div>

        //   <JobDialog job ={job} handleOpen={handleOpen} size={dialogSize}/>
        //   </div>
        //   </div>