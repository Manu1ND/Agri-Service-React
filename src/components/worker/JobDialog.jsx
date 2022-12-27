import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function JobDialog({ job, handleDialogOpen, handleApplyJob, size }) {
  const navigate = useNavigate();

  if (job) {
    return (
      <Fragment>
        <Dialog
          open={size === "lg"}
          size={"lg"}
          handler={handleDialogOpen}
        >
          <DialogHeader>{job.jobCategory.name}</DialogHeader>
          <DialogBody divider>
            {job.description}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => handleDialogOpen(null)}
              className="mr-1"
            >
              <span>Close</span>
            </Button>

            {/* if not applied then show button */}
            {!job.applied && (
              <Button
                variant="gradient"
                color="blue"
                onClick={() => {
                  handleDialogOpen(null);
                  handleApplyJob();
                }}
                className="mr-1"
              >
                Apply for Job
              </Button>
            )}
            
            {/* if applied then show button */}
            {job.applied && (
              <Button
                variant="gradient"
                color="purple"
                onClick={() => {
                  handleDialogOpen(null);
                  navigate("/applications/" + job._id);
                }}
                className="mr-1"
              >
                View Application
              </Button>
            )}
          </DialogFooter>
        </Dialog>
      </Fragment>
    );
  } else {
    return null;
  }
}