import { Fragment,useState } from "react";
import { useNavigate} from "react-router-dom";

import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,

} from "@material-tailwind/react";

export default function JobDialog({job, handleOpen, size}){
        const navigate = useNavigate();
        if (job) {
            return (
                <Fragment>
                    <Dialog
                        open={size === "lg"}
                        size={"lg"}
                        handler={handleOpen}
                    >
                        
                        <DialogBody divider>
                            {job.description}
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={() => handleOpen(null)}
                                className="mr-1"
                            >
                                <span>Close</span>
                            </Button>
                            <Button
                                variant="gradient"
                                color="blue"
                                onClick={() => {
                                    handleOpen(null);
                                    navigate("/appliedJob/" + job._id);
                                }}
                                className="mr-1"
                            >
                                View Applied Order
                            </Button>
                            <Button
                                variant="gradient"
                                color="purple"
                                onClick={() => {
                                    handleOpen(null);
                                    navigate("/jobs/edit/" + job._id);
                                }}
                            >
                                Modify Product
                            </Button>
                        </DialogFooter>
                    </Dialog>
                </Fragment>
            );
        } else {
            return null;
        }

       
    }


    // if(job){
    //     return (
    //         <Fragment>
    //         <Dialog open = {size === "lg"}
    //         size ={"lg"}
    //         handler ={handleOpen}>

    //         <DialogHeader>Job Info </DialogHeader>
    //         <DialogBody divider>{job.description}<br/>
    //          Wage Per Day{job.wagePerDay}
    //          Number of working days {job.duration}
    //          Number of workers needed {job.quantity}
                            
    //         </DialogBody>

    //         <DialogFooter>
    //           <Button
    //            variant="text"
    //            color="red"
    //            onClick={()=>handleOpen(null)}
    //            className="mr-1"
    //            >
    //            <span>Close</span>
    //            </Button>

    //            <Button
    //                     variant="gradient"
    //                     color="blue"
    //                     onClick={() => {
    //                         handleOpen(null);
    //                         navigate("/orders/" + job._id);
    //                     }}
    //                     className="mr-1"
    //                 >
    //                     View Application
    //                 </Button>
    //            <Button
    //            variant="gradient"
    //            color="purple"
    //            onClick={()=>{
    //             handleOpen(null);
    //             navigate("/job/edit/"+job._id);
    //            }}
    //            >
    //            Modify Job 
    //            </Button>

    //         </DialogFooter>

    //         </Dialog>
    //         </Fragment>
    //     );
    // }
    // else{
    //     return null;
    // }