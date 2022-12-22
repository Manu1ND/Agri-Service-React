import { Fragment, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export default function OrderDialog({ order, handleDialogOpen, size }) {
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
                            onClick={() => handleDialogOpen(null)}
                            className="mr-1"
                        >
                            View Orders
                        </Button>
                        <Button
                            variant="gradient"
                            color="purple"
                            onClick={() => handleDialogOpen(null)}
                        >
                            Modify Product
                        </Button>
                    </DialogFooter>
                </Dialog>
            </Fragment>
        )
    } else {
        return null;
    }
}
