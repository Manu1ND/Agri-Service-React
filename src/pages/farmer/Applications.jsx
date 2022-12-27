import ApplicationRow from "../../components/farmer/ApplicationRow";
import ApplicationDialog from "../../components/farmer/ApplicationDialog";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-tailwindcss-select";

export default function Applications() {
  // save applications in state
  const [applications, setApplications] = useState([]);

  // state for select options
  const [jobOptionsLoaded, setJobOptionsLoaded] = useState(false);
  const [jobOptions, setJobOptions] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  // state for dialog
  const [application, setApplication] = useState(null);
  const [dialogSize, setDialogSize] = useState(null);

  const { jobID } = useParams();

  function loadApplicationsByFarmer() {
    axios
      .get(import.meta.env.VITE_SERVER_URL + "/api/jobOffer/farmer/" + localStorage.getItem("userID"))
      .then((res) => {
        setApplications(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSelectChange = option => {
    setSelectedJob(option);

    if (option && option.value) {
      axios
        .get(import.meta.env.VITE_SERVER_URL + "/api/jobOffer/job/" + option.value)
        .then((res) => {
          let jobOffers = res.data.jobOffers;
          let job = res.data.job;
          // add job to each jobOffer
          jobOffers.forEach((jobOffer) => {
            jobOffer.job = job;
          });
          setApplications(jobOffers);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      loadApplicationsByFarmer();
    }
  }

  const handleDialogOpen = (size, application) => {
    setDialogSize(size);
    if (application) {
      setApplication(application);
    }
  }

  const handleUpdateApplication = (status) => {
    axios
      .put(
        import.meta.env.VITE_SERVER_URL +
        "/api/jobOffer/" +
        application._id,
        { status: status }
      )
      .then((res) => {
        console.log(res);
        setApplication(null);
        // reload applications
        loadApplicationsByFarmer();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // load jobs for select options
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_SERVER_URL + "/api/job/farmer/" + localStorage.getItem("userID"))
      .then((res) => {
        // add first option to select options
        setJobOptions([{ label: "All Jobs", value: null }]);

        // add jobs to select options
        res.data.forEach((job) => {
          setJobOptions((prevOptions) => [
            ...prevOptions,
            { label: job.jobCategory.name, value: job._id },
          ]);
          if (jobID && job._id === jobID) {
            setSelectedJob({ label: job.jobCategory.name, value: job._id });
          }
        });
        setJobOptionsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // fetch applications based on select menu value only after options are loaded
  useEffect(() => {
    // load applications based on select menu value
    if (jobOptionsLoaded) {
      handleSelectChange(selectedJob);
    }
  }, [jobOptionsLoaded]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Applications for your Jobs
        </h2>

        <Select
          placeholder="Select for a Job..."
          primaryColor={"orange"}
          value={selectedJob}
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
                Wage per Day
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((application) => (
              <ApplicationRow key={application._id} application={application} handleDialogOpen={handleDialogOpen} />
            ))}
          </tbody>
        </table>

        {/* Dialog */}
        {application && (
          <ApplicationDialog application={application} handleDialogOpen={handleDialogOpen} handleUpdateApplication={handleUpdateApplication} size={dialogSize} />
        )}
      </div>
    </div>
  );
}