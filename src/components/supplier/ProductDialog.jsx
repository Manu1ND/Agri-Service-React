import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export default function ProductDialog({ product, handleOpen, size }) {
    const navigate = useNavigate();

    if (product) {
        return (
            <Fragment>
                <Dialog
                    open={size === "lg"}
                    size={"lg"}
                    handler={handleOpen}
                >
                    <DialogHeader>{product.name}</DialogHeader>
                    <DialogBody divider>
                        {product.description}
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
                                handleOpen(null)
                                navigate("/orders/" + product._id)
                            }}
                            className="mr-1"
                        >
                            View Orders
                        </Button>
                        <Button
                            variant="gradient"
                            color="purple"
                            onClick={() => handleOpen(null)}
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
