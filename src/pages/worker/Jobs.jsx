import JobCard from "../../components/worker/JobCard";
import JobDialog from "../../components/worker/JobDialog";

import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Select from "react-tailwindcss-select";

export default function Jobs() {
  // save jobs in state
  const [jobs, setJobs] = useState([]);

  // state for select options
  const [jobCategoryOptionsLoaded, setJobCategoryOptionsLoaded] = useState(false);
  const [jobCategoryOptions, setJobCategoryOptions] = useState([]);
  const [jobCategoryOption, setJobCategoryOption] = useState(null);

  // state for dialog
  const [job, setJob] = useState(null);
  const [dialogSize, setDialogSize] = useState(null);

  const { jobCategoryID } = useParams();

  function loadJobsByWorker() {
    axios.get(import.meta.env.VITE_SERVER_URL + "/api/job/worker/" + localStorage.getItem("userID") + "/active/")
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSelectChange = option => {
    setJobCategoryOption(option);

    if (option && option.value) {
      axios
        .get(import.meta.env.VITE_SERVER_URL + '/api/job/worker/' + localStorage.getItem("userID") + '/category/' + option.value)
        .then((res) => {
          setJobs(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      loadJobsByWorker();
    }
  }

  const handleDialogOpen = (size, job) => {
    setDialogSize(size);

    if (job) {
      setJob(job);
    }
  }

  const handleApplyJob = () => {
    axios.post(
      import.meta.env.VITE_SERVER_URL +
      "/api/job/apply/" +
      job._id, { workerID: localStorage.getItem("userID") }
    )
      .then((res) => {
        console.log(res);
        // reload jobs
        loadJobsByWorker();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // load job categories into select options
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_SERVER_URL + '/api/job/category')
      .then((res) => {
        // add first option to select options
        setJobCategoryOptions([{ label: "All Categories", value: null }]);
        // save job categories in select options
        res.data.forEach((jobCategory) => {
          setJobCategoryOptions((prev) => [
            ...prev,
            { label: jobCategory.name, value: jobCategory._id },
          ]);
          if (jobCategoryID && jobCategory._id === jobCategoryID) {
            setJobCategoryOption({ label: jobCategory.name, value: jobCategory._id });
          }
        });
        setJobCategoryOptionsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // fetch jobs based on job category only after job category options are loaded
  useEffect(() => {
    if (jobCategoryOptionsLoaded) {
      handleSelectChange(jobCategoryOption);
    }
  }, [jobCategoryOptionsLoaded]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Jobs available for you
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1">
            <Select
              placeholder="Select Job Category"
              primaryColor={"orange"}
              value={jobCategoryOption}
              onChange={handleSelectChange}
              options={jobCategoryOptions}
              isSearchable
            />
          </div>
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} handleDialogOpen={handleDialogOpen} />
          ))}
        </div>

        {/* Dialog */}
        {job && (
          <JobDialog job={job} handleDialogOpen={handleDialogOpen} handleApplyJob={handleApplyJob}  size={dialogSize} />
        )}
      </div>
    </div>
  );
}
