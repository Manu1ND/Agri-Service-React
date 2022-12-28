import ProductCard from "../../components/farmer/ProductCard";
import ProductDialog from "../../components/farmer/ProductDialog";

import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Select from "react-tailwindcss-select";


export default function Products() {
  // save products in state
  const [products, setProducts] = useState([]);

  // state for select options
  const [productCategoryOptionsLoaded, setProductCategoryOptionsLoaded] = useState(false);
  const [productCategoryOptions, setProductCategoryOptions] = useState([]);
  const [productCategoryOption, setProductCategoryOption] = useState(null);

  // state for dialog
  const [product, setProduct] = useState(null);
  const [dialogSize, setDialogSize] = useState(null);

  const { productCategoryID } = useParams();

  function loadProducts() {
    axios.get(import.meta.env.VITE_SERVER_URL + "/api/product")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSelectChange = option => {
    setProductCategoryOption(option);

    if (option && option.value) {
      axios
        .get(import.meta.env.VITE_SERVER_URL + '/api/product/farmer/category/' + option.value)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      loadProducts();
    }
  }

  const handleDialogOpen = (size, product) => {
    setDialogSize(size);

    if (product) {
      setProduct(product);
    }
  }

  const handleBuyProduct = (quantity, duration) => {
    axios.post(
      import.meta.env.VITE_SERVER_URL +
      "/api/product/buy/" +
      product._id, {
      farmerID: localStorage.getItem("userID"),
      "duration": duration,
      "quantity": quantity
    })
      .then((res) => {
        console.log(res.data);
        // TODO: show success message
        // reload products
        loadProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // load product categories into select options
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_SERVER_URL + "/api/product/category")
      .then((res) => {
        setProductCategoryOptions([{ label: "All", value: null }]);

        // save product categories in select options
        res.data.forEach((productCategory) => {
          setProductCategoryOptions((prev) => [
            ...prev,
            { label: productCategory.name, value: productCategory._id },
          ]);
          if (productCategory._id === productCategoryID) {
            setProductCategoryOption({ label: productCategory.name, value: productCategory._id });
          }
        });
        setProductCategoryOptionsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // fetch products based on product category only after product categories are loaded
  useEffect(() => {
    if (productCategoryOptionsLoaded) {
      handleSelectChange(productCategoryOption);
    }
  }, [productCategoryOptionsLoaded]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Products available for you
        </h2>

          <div className="col-span-1 flex items-center ">
            <Select
              placeholder="Select a product category..."
              primaryColor={"orange"}
              value={productCategoryOption}
              onChange={handleSelectChange}
              options={productCategoryOptions}
              isSearchable
            />
          </div>
        <div className="mt-20  mr-10 grid grid-cols-1 gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">

          {products.map((product) => (
            <ProductCard key={product._id} product={product} handleDialogOpen={handleDialogOpen} />
          ))}
          </div>

        {/* Dialog */}
        <ProductDialog product={product} handleDialogOpen={handleDialogOpen} handleBuyProduct={handleBuyProduct} size={dialogSize} />
      </div>
    </div>
  );
}
