import { useEffect, useState } from 'react';
import axios from 'axios';

function defaultProduct() {
  return {
    productCategoryID: '',
    supplierID: localStorage.getItem('userID'),
    name: '',
    description: '',
    costPerDay: 0,
    imageURL: '',
    quantity: 0
  }
}

export default function AddProduct() {
  // load product categories
  const [productCategories, setProductCategories] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_SERVER_URL + '/api/product/category')
      .then((response) => {
        setProductCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // save product in state
  const [product, setProduct] = useState(defaultProduct());

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios.post(import.meta.env.VITE_SERVER_URL + '/api/product', product)
      .then((response) => {
        console.log(response);
        setProduct(defaultProduct());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
              <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleFormSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleFormChange}
                        value={product.name}
                      />
                    </div>

                    {/* product category dropdown */}
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="productCategoryID" className="block text-sm font-medium text-gray-700">
                        Product Category
                      </label>

                      <select
                        name="productCategoryID"
                        id="productCategoryID"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleFormChange}
                        value={product.productCategoryID}
                      >
                        <option value="" disabled>Select a product category</option>
                        {productCategories.map((productCategory) => (
                          <option
                            key={productCategory._id}
                            value={productCategory._id}
                          >
                            {productCategory.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="product@example.com"
                          onChange={handleFormChange}
                          value={product.description}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description of the product. URLs are hyperlinked.
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="costPerDay" className="block text-sm font-medium text-gray-700">
                        Cost Per Day
                      </label>
                      <input
                        type="text"
                        name="costPerDay"
                        id="costPerDay"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleFormChange}
                        value={product.costPerDay}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        min={1}
                        autoComplete="quantity"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleFormChange}
                        value={product.quantity}
                      />
                    </div>

                    <br />

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Photo</label>
                      <div className="mt-1 flex items-center">
                        <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        <button
                          type="button"
                          className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}