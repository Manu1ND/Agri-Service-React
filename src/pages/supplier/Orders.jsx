import OrderRow from "../../components/supplier/OrderRow.jsx";
import OrderDialog from "../../components/supplier/OrderDialog.jsx";

import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Select from "react-tailwindcss-select";

export default function Orders() {
  // save orders in state
  const [orders, setOrders] = useState([]);

  // state for select options
  const [productOptionsLoaded, setproductOptionsLoaded] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  const [productOption, setProductOption] = useState(null);

  // state for dialog
  const [order, setOrder] = useState(null);
  const [dialogSize, setDialogSize] = useState(null);

  const { productID } = useParams();

  const handleSelectChange = option => {
    setProductOption(option);

    if (option && option.value) {
      axios
        .get(import.meta.env.VITE_SERVER_URL + "/api/productOrder/product/" + option.value)
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(import.meta.env.VITE_SERVER_URL + '/api/productOrder/supplier/' + localStorage.getItem('userID'))
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

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
      order._id, { status: "cancelledBySupplier" }
    )
      .then((response) => {
        console.log(response);
        handleDialogOpen(null);
        // reload orders
        handleSelectChange(productOption);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // load products into select options
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_SERVER_URL + '/api/product/supplier/' + localStorage.getItem('userID'))
      .then((res) => {
        // add first option to select options
        setProductOptions([{ label: "All Products", value: null }]);
        // save products in select options
        res.data.forEach((product) => {
          setProductOptions((prev) => [
            ...prev,
            { label: product.name, value: product._id }
          ]);
          if (productID && product._id == productID) {
            setProductOption({ label: product.name, value: product._id });
          }
        });
        setproductOptionsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // fetch orders based on select menu value only after select options are loaded
  useEffect(() => {
    // load orders based on select menu value
    if (productOptionsLoaded) {
      handleSelectChange(productOption);
    }
  }, [productOptionsLoaded]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Orders placed for your products
        </h2>

        <Select
          placeholder="Search for a product..."
          primaryColor={"orange"}
          value={productOption}
          onChange={handleSelectChange}
          options={productOptions}
          isSearchable
        />

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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