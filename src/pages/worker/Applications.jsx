import ApplicationRow from "../../components/worker/ApplicationRow";
import ApplicationDialog from "../../components/worker/ApplicationDialog";

import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

export default function Applications() {
  // save applications in state
  const [applications, setApplications] = useState([]);

  // state for dialog
  const [application, setApplication] = useState(null);
  const [dialogSize, setDialogSize] = useState(null);

  const { jobID } = useParams();

  function loadApplicationsByWorker() {
    axios.get(import.meta.env.VITE_SERVER_URL + "/api/jobOffer/worker/" + localStorage.getItem("userID"))
      .then((res) => {
        setApplications(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (jobID) {
      axios.get(import.meta.env.VITE_SERVER_URL + "/api/jobOffer/job/" + jobID)
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
      loadApplicationsByWorker();
    }
  }, [jobID]);

  const handleDialogOpen = (size, application) => {
    setDialogSize(size);
    if (application) {
      setApplication(application);
    }
  }

  const handleCancelApplication = () => {
    axios.put(
      import.meta.env.VITE_SERVER_URL +
      "/api/jobOffer/" +
      application._id, { status: "cancelledByWorker" }
    )
      .then((response) => {
        console.log(response);
        handleDialogOpen(null);
        // reload applications
        loadApplicationsByWorker();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Jobs you applied for
        </h2>

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
          <ApplicationDialog application={application} handleDialogOpen={handleDialogOpen} handleCancelApplication={handleCancelApplication} size={dialogSize} />
        )}
      </div>
    </div>
  );
}
