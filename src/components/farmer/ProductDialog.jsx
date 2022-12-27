import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function ProductDialog({ product, handleDialogOpen, handleBuyProduct, size }) {
  const navigate = useNavigate();

  // state to toggle buy options
  const [buyOptions, setBuyOptions] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [duration, setDuration] = useState(1);

  if (product) {
    function resetDialog() {
      setBuyOptions(false);
      setQuantity(1);
      setDuration(1);
    }

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

            {buyOptions && (
              <Fragment>
                <div className="flex flex-wrap mb-4">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={product.availableQuantity}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Quantity"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Duration
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Duration"
                      />
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
          </DialogBody>

          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => {
                handleDialogOpen(null);
                resetDialog();
              }}
              className="mr-1"
            >
              <span>Close</span>
            </Button>

            <Button
              variant="gradient"
              color="blue"
              onClick={() => {
                handleDialogOpen(null);
                resetDialog();
                navigate("/orders/" + product._id);
              }}
              className="mr-1"
            >
              View Orders
            </Button>

            {buyOptions ? (
              <Button
                variant="gradient"
                color="purple"
                onClick={() => {
                  handleDialogOpen(null);
                  handleBuyProduct(quantity, duration);
                  resetDialog();
                }}
                className="mr-1"
              >
                Buy Product
              </Button>
            ) : (
              <Button
                variant="gradient"
                color="purple"
                onClick={() => {
                  setBuyOptions(true);
                }}
                className="mr-1"
              >
                Buy Product
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
