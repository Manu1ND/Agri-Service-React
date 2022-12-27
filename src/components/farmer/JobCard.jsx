import{
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button
} from "@material-tailwind/react";

export default function JobCard ({ job, handleOpen}){
    return (
        <Card className="w-72 relative py-100">

    

        <CardBody className="text-center">
        <Typography>{job.description}</Typography>
        </CardBody>

        <CardFooter divider className="flex sticky top-[100vh] items-center justify-between py-3">
        
        <Typography variant="small">Wage per day 
        {job.wagePerDay[0]} </Typography>

        <Button color="blue" size="sm" onClick={() => handleOpen("lg", job)}>
          View
        </Button>

        <Typography variant ="small" color="gray" className ="flex gap-1">
        <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
        Quantity {job.quantity}
        </Typography>
        
  
        </CardFooter>
        
        </Card>
    );
}

