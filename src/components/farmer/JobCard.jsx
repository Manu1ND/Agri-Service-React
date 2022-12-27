import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button
} from "@material-tailwind/react";

export default function JobCard({ job, handleDialogOpen }) {
  return (
    <Card className="w-72 relative py-100">
      <CardHeader color="deep-orange" className="relative h-56">
        <img
          src={job.jobCategory.imageURL}
          alt={job.jobCategory.name}
          className="h-full w-full"
        />
      </CardHeader>

      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          {job.jobCategory.name}
        </Typography>
        <Typography>
          {job.description}
        </Typography>
      </CardBody>

      <CardFooter divider className="flex sticky top-[100vh] items-center justify-between py-3">
        <Typography variant="small">${job.wagePerDay}/night</Typography>
        <Button color="blue" size="sm" onClick={() => handleDialogOpen("lg", job)}>
          View
        </Button>
        <Typography variant="small" color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          Quantity: {job.quantity}
        </Typography>
      </CardFooter>
    </Card>
  );
}

