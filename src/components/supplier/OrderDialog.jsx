import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";

export default function OrderDialog({ order, handleDialogOpen, size }) {
  const handleCancelOrder = () => {
    axios.put(
      import.meta.env.VITE_SERVER_URL +
      "/api/productOrder/" +
      order._id, { status: "cancelledBySupplier" }
    )
      .then((response) => {
        console.log(response);
        handleDialogOpen(null);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (order) {
    return (
      <Fragment>
        <Dialog
          open={size === "lg"}
          size={"lg"}
          handler={handleDialogOpen}
        >
          <DialogHeader>{order.product.name}</DialogHeader>
          <DialogBody divider>
            {order.product.description}

            {/* if product status is accepted then show cancel button */}
            {order.status === "accepted" && (
              <Button
                variant="gradient"
                color="red"
                onClick={() => {
                  handleDialogOpen(null);
                  handleCancelOrder();
                }
                }
                className="mr-1"
              >
                <span>Cancel Order</span>
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
              <span>Close</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment >
    )
  } else {
    return null;
  }
}
