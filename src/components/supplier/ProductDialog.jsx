import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function ProductDialog({ product, handleDialogOpen, size }) {
  const navigate = useNavigate();

  if (product) {
    return (
      <Fragment>
        <Dialog
          open={size === "lg"}
          size={"lg"}
          handler={handleDialogOpen}
        >
          <DialogHeader>{product.name}</DialogHeader>
          <DialogBody divider>
            {product.description}
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
            <Button
              variant="gradient"
              color="blue"
              onClick={() => {
                handleDialogOpen(null);
                navigate("/orders/" + product._id);
              }}
              className="mr-1"
            >
              View Orders
            </Button>
            <Button
              variant="gradient"
              color="purple"
              onClick={() => {
                handleDialogOpen(null);
                navigate("/products/edit/" + product._id);
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
