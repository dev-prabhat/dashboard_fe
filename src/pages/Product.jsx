import Navbar from "../components/Navbar";
import { useCategoryContext } from "../context/categoryContext";
import { useProduct } from "../context/productContext";

// product page where admin can add products
const Product = () => {
  const { productDetails, setProductDetails, handleOnSubmit } = useProduct();
  const { allCategories } = useCategoryContext();

  return (
    <div>
      <Navbar />
      <div className="w-full flex justify-center items-center flex-col">
        <h1 className="text-3xl">Create Product</h1>
        <form className="w-[65%]" onSubmit={handleOnSubmit}>
          <div className="flex justify-between items-center m-4">
            <label htmlFor="product_name" className="text-xl">
              Enter Product Name:
            </label>
            <input
              type="text"
              id="product_name"
              placeholder="enter product name"
              className="w-1/2 p-2 border-2 border-black rounded-lg"
              value={productDetails.productName}
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  productName: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex justify-between items-center m-4">
            <label htmlFor="product_price" className="text-xl">
              Product Price:
            </label>
            <input
              type="number"
              id="product_price"
              placeholder="enter product price"
              className="w-1/2 p-2 border-2 border-black rounded-lg"
              value={productDetails.productPrice}
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  productPrice: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex justify-between items-center m-4">
            <label htmlFor="product_category" className="text-xl">
              Select Category:
            </label>
            <select
              id="product_category"
              className="w-1/2 p-2 border-2 border-black rounded-lg capitalize"
              value={productDetails.categoryName}
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  categoryName: e.target.value,
                }))
              }
            >
              <option value="" disabled>
                Select a Category
              </option>
              {allCategories?.data?.map((ele) => (
                <option className="capitalize" key={ele._id} value={ele.name}>
                  {ele.name}
                </option>
              ))}
            </select>
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

export default Product;
