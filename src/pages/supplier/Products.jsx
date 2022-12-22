import ProductCard from "../../components/supplier/ProductCard";
import ProductDialog from "../../components/supplier/ProductDialog";

// fetch products from database using axios and hook
import { useState, useEffect } from "react";
import axios from "axios";

export default function Products() {
  // save products in state
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [dialogSize, setDialogSize] = useState(null);

  const handleOpen = (size, product) => {
    setDialogSize(size);

    if (product) {
      setProduct(product);
    }
  }

  // fetch products from database
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_SERVER_URL + '/api/product/supplier/' + localStorage.getItem('userID'))
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Products listed by you
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} handleOpen={handleOpen} />
          ))}
        </div>
        <ProductDialog product={product} handleOpen={handleOpen} size={dialogSize} />
      </div>
    </div>
  );
}
