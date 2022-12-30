import OrderRow from "../../components/farmer/OrderRow";
import OrderDialog from "../../components/farmer/OrderDialog";

import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

export default function Orders() {
  // save orders in state
  const [orders, setOrders] = useState([]);

  // state for dialog
  const [order, setOrder] = useState(null);
  const [dialogSize, setDialogSize] = useState(null);

  const { productID } = useParams();

  function loadOrdersByFarmer() {
    axios.get(import.meta.env.VITE_SERVER_URL + "/api/productOrder/farmer/" + localStorage.getItem("userID"))
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (productID) {
      axios.get(import.meta.env.VITE_SERVER_URL + "/api/productOrder/product/" + productID)
        .then((res) => {
          console.log(res);
          setOrders(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      loadOrdersByFarmer();
    }
  }, [productID]);

  const handleDialogOpen = (size, product) => {
    setDialogSize(size);
    if (product) {
      setOrder(product);
    }
  }

  const handleCancelOrder = () => {
    axios.put(
      import.meta.env.VITE_SERVER_URL +
      "/api/productOrder/" +
      order._id, { status: "cancelledByFarmer" }
    )
      .then((response) => {
        console.log(response);
        handleDialogOpen(null);
        // reload orders
        loadOrdersByFarmer();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-8 px-4 sm:py-14 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold pb-10 tracking-tight text-gray-900">
          Your Orders
        </h2>

        <table className="min-w-full divide-y divide-gray-200 border-2 border-orange-200 ">
          <thead className="bg-gray-50 ">
            <tr className="bg-orange-200 ">
              <th scope="col" className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th scope="col" className="px-6 py-3 text-left text-base  font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-base  font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <OrderRow key={order._id} order={order} handleDialogOpen={handleDialogOpen} />
            ))}
          </tbody>
        </table>

        {/* Dialog */}
        {order && (
          <OrderDialog order={order} handleDialogOpen={handleDialogOpen} handleCancelOrder={handleCancelOrder} size={dialogSize} />
        )}
      </div>
    </div>
  );
}