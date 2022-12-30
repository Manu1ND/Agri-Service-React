import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button
} from "@material-tailwind/react";

export default function ProductCard({ product, handleDialogOpen }) {
  return (
    <Card className="w-72 py-100px">
      <CardHeader color="teal" className="bg-slate-800 relative h-56 border-t-2 border-r-4 border-teal-700" >
        <img
          src={product.imageURL}
          alt={product.name}
          className="h-full w-full"
          
        />
      </CardHeader>
      
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          {product.name}
        </Typography>
        <Typography>
          {product.description}
        </Typography>
      </CardBody>

      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">${product.costPerDay}/night</Typography>
        <Button color="teal" size="sm" onClick={() => handleDialogOpen("lg", product)}>
          View
        </Button>
        <Typography variant="small" color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          Quantity: {product.quantity}
        </Typography>
      </CardFooter>
    </Card>
  );
}
