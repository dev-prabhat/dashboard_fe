import { useState } from "react";
import { useProduct } from "../context/productContext";
import { useCategoryContext } from "../context/categoryContext";
import { useSale } from "../context/saleContext";
import Navbar from "../components/Navbar";

// home page where user can enter sales details
const Home = () => {
  const { allProducts } = useProduct();
  const { allCategories } = useCategoryContext();
  const { handleSaleOnSubmit, saleResponse } = useSale();
  const [rows, setRows] = useState([
    { _id: "", product: "", category: "", price: "", tax: "", gstRate: "" },
  ]);

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;

    // Find the product based on selected product ID
    if (field === "product") {
      const selectedProduct = allProducts?.data?.find(
        (product) => product.name === value
      );
      const selectedCategory = allCategories?.data?.find(
        (category) => category._id === selectedProduct.category
      );
      if (selectedProduct) {
        newRows[index]._id = selectedProduct._id;
        newRows[index].category = selectedCategory.name;
        newRows[index].price = selectedProduct.price;
        newRows[index].gstRate = selectedCategory.gstRate;
        newRows[index].tax =
          (selectedProduct.price * selectedCategory.gstRate) / 100;
      }
    }
    setRows(newRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { _id: "", product: "", category: "", price: "", tax: "", gstRate: "" },
    ]);
  };

  const handleSubmit = () => {
    handleSaleOnSubmit(rows);
    setRows([
      { _id: "", product: "", category: "", price: "", tax: "", gstRate: "" },
    ]);
  };
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Product</th>
              <th className="border border-gray-200 px-4 py-2">Category</th>
              <th className="border border-gray-200 px-4 py-2">Price</th>
              <th className="border border-gray-200 px-4 py-2">GST</th>
              <th className="border border-gray-200 px-4 py-2">Tax</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-200 px-4 py-2">
                  <select
                    value={row.product}
                    onChange={(e) =>
                      handleInputChange(index, "product", e.target.value)
                    }
                    className="w-full p-2 border-2 border-black rounded-lg capitalize"
                  >
                    <option value="" disabled>
                      Select a product
                    </option>
                    {allProducts?.data?.map((ele) => (
                      <option
                        className="capitalize"
                        key={ele._id}
                        value={ele.name}
                      >
                        {ele.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <input
                    type="text"
                    value={row.category}
                    readOnly
                    className="w-full capitalize"
                    placeholder="Enter category"
                  />
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <input
                    type="number"
                    value={row.price}
                    readOnly
                    className="w-full bg-gray-100"
                    placeholder="Rate auto-populated"
                  />
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <input
                    type="text"
                    value={row.gstRate ? `${row.gstRate}%` : ""}
                    readOnly
                    className="w-full bg-gray-100"
                    placeholder="Rate auto-populated"
                  />
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <input
                    type="number"
                    value={row.tax}
                    readOnly
                    className="w-full bg-gray-100"
                    placeholder="Tax auto-calculated"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-4">
          <button
            onClick={addRow}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Row
          </button>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-white text-blue-500 px-4 py-2 rounded border-blue-500 border-[1px]"
          >
            Submit
          </button>
        </div>
        {saleResponse && (
          <table className="table-auto my-4 w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">Product</th>
                <th className="border border-gray-200 px-4 py-2">Category</th>
                <th className="border border-gray-200 px-4 py-2">Price</th>
                <th className="border border-gray-200 px-4 py-2">GST</th>
                <th className="border border-gray-200 px-4 py-2">Tax</th>
              </tr>
            </thead>
            <tbody>
              {saleResponse?.data?.products?.map((row) => (
                <tr key={row._id}>
                  <td className="border border-gray-200 px-4 py-2">
                    <p className="capitalize">{row.product.name}</p>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <p className="capitalize">{row?.category?.name}</p>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <p>{row?.product?.price}</p>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <p>{`${row?.category?.gstRate}%`}</p>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <p>{Math.round(row?.amount) - row?.product?.price}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Home;
