import Navbar from "../components/Navbar";
import { useCategoryContext } from "../context/categoryContext";

// product category page where admin can add categories
const ProductCategory = () => {
  const { categoryData, setCategoryData, handleOnSubmit } =
    useCategoryContext();

  return (
    <div>
      <Navbar />
      <div className="w-full flex justify-center items-center flex-col">
        <h1 className="text-3xl">
          Create Product Categories and GST rate of the respective
        </h1>
        <form className="w-[65%]" onSubmit={handleOnSubmit}>
          <div className="flex justify-between items-center m-4">
            <label htmlFor="product_category" className="text-xl">
              Enter Category:
            </label>
            <input
              type="text"
              id="product_category"
              placeholder="enter product category"
              className="w-1/2 p-2 border-2 border-black rounded-lg"
              value={categoryData.category}
              onChange={(e) =>
                setCategoryData((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex justify-between items-center m-4">
            <label htmlFor="product_category" className="text-xl">
              Enter GST rate:
            </label>
            <input
              type="number"
              id="product_category"
              placeholder="enter category gst rate"
              className="w-1/2 p-2 border-2 border-black rounded-lg"
              value={categoryData.gstRate}
              onChange={(e) =>
                setCategoryData((prev) => ({
                  ...prev,
                  gstRate: e.target.value,
                }))
              }
            />
          </div>
          <button
            type="submit"
            className="p-3 m-4 border-2 border-black rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductCategory;
