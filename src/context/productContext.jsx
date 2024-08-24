import { createContext, useContext, useEffect, useState } from "react";
import { useAxios } from "../customHooks/useAxios";
import toast from "react-hot-toast";
import { useAuth } from "./authContext";
const apiUrl = import.meta.env.VITE_API_URL;

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

// product context
export const ProductProvider = ({ children }) => {
  const { encodedToken } = useAuth()
  const { response: allProducts, operation: getProducts } = useAxios();
  const { response: postProductResponse, operation: postProductOperation } =
    useAxios();
  const [productDetails, setProductDetails] = useState({
    productName: "",
    categoryName: "",
    productPrice: "",
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    postProductOperation({
      method: "post",
      url: `${apiUrl}/products/createProduct`,
      headers: { authorization: encodedToken },
      data: productDetails,
    });
    setProductDetails({
      productName: "",
      categoryName: "",
      productPrice: "",
    });
  };

  const getAllProducts = () => {
    getProducts({
      method: "get",
      url: `${apiUrl}/products/p`,
      headers: { authorization: encodedToken },
    });
  };

  useEffect(() => {
    if(encodedToken){
      getAllProducts();
    }
  }, [encodedToken]);

  useEffect(() => {
    if (postProductResponse && encodedToken) {
      toast.success(postProductResponse.message);
      getAllProducts();
    }
  }, [postProductResponse,encodedToken]);
  return (
    <ProductContext.Provider
      value={{ productDetails, setProductDetails, handleOnSubmit, allProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};
