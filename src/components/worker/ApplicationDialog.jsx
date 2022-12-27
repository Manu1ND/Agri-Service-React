import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function ApplicationDialog({ application, handleDialogOpen, handleCancelApplication, size }) {
  if(application) {
    return (
      <Fragment>
        <Dialog
          open={size === "lg"}
          size={"lg"}
          handler={handleDialogOpen}
        >
          <DialogHeader>{application.job.jobCategory.name}</DialogHeader>
          <DialogBody divider>
            {application.job.description}

            {/* if application status is pending or accepted then show cancel button */}
            {(application.status === "pending" || application.status === "accepted") && (
              <Button
                variant="gradient"
                color="red"
                onClick={() => {
                  handleDialogOpen(null);
                  handleCancelApplication();
                }
                }
                className="mr-1"
              >
                <span>Cancel Application</span>
              </Button>
            )}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => handleDialogOpen(null)}
              className="mr-1"
            >
              Close
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>
    );
  } else {
    return null;
  }
}
