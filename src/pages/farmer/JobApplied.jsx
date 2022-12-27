import JobAppliedRow from "../../components/farmer/JobAppliedRow";

import JobAppliedDialog from "../../components/farmer/JobAppliedDialog";

import { useState,useEffect} from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import Select from "react-tailwindcss-select";

function loadJobApplied(setJobOffer){
    axios.get(import.meta.env.VITE_SERVER_URL + '/api/job/farmer/'+localStorage.getItem('userID'))
    .then((res)=>{
        setJobOffer(res.data);
    })
    .catch((err)=>{
        console.log(err);
    });

}

export default function JobOffer(){
    const [jobOffer,setJobOffer] = useState([]);

    const [jobOptionsLoaded,setJobOptionsLoaded]= useState(false);
    const [jobOptions,setJobOptions] = useState([]);
    const [jobOption,setJobOption]=useState(null);

    const [jobApplied,setJobApplied] =useState(null);
    const [dialogSize,setDialogSize]= useState(null);

    const {jobID} = useParams();

    const handleSelectChange= option =>{
        setJobOption(option);

        if(option &&option.value){
            axios.get(import.meta.env.VITE_SERVER_URL +"api/jobOffer/job/"+option.value)
            .then((res)=>{
                setJobOffer(res.data);
            })
            .catch((err)=>{
                console.log(err);
            });
        }
        else {
                loadJobApplied(setJobOffer);
        }
    };

    const handleDialogOpen =(size,job) =>{
        setDialogSize(size);
        if(job)
        {
          setJobApplied(job);
        }
    }

    useEffect(()=>{
        axios.get(import.meta.env.VITE_SERVER_URL +'/api/job/applied/farmer/'+localStorage.getItem('userID'))
        .then((res)=>{
            setJobOptions([{label:"All Job",value:null}]);
            res.data.forEach((job)=>{
                setJobOptions((prev)=>[...prev,{label:job.description,value:job._id}]);

                if(jobID && job._id == jobID)
                {
                    setJobOption({label:job.description,value:job._id})
                }
            });
            setJobOptionsLoaded(true);
        })
        .catch((err)=>{
            console.log(err);
        });
        
    },[]);

    useEffect(()=>{
        if(jobOptionsLoaded){
            handleSelectChange(jobOption);
        }
    },[jobOptionsLoaded]);

    return (
        <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900"> Job applied by the worker
          </h2>

          <Select
          placeholder="Search for a product..."
          primaryColor={"orange"}
          value={jobOption}
          onChange={handleSelectChange}
          options={jobOptions}
          isSearchable
        />
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Job 
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Job category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                 Salary
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">

          {jobOffer.map((jobApplied) => (
            <JobAppliedRow key={jobApplied._id} jobApplied={jobApplied} handleDialogOpen={handleDialogOpen} size={dialogSize} />
          ))}
        </tbody>
        <JobAppliedDialog jobApplied={jobApplied} handleDialogOpen={handleDialogOpen} size={dialogSize} />
      </table>
    </div>
  </div>
    );


    }




