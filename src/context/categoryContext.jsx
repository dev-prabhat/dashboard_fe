import { createContext, useContext, useEffect, useState } from "react";
import { useAxios } from "../customHooks/useAxios";
import toast from "react-hot-toast";
import { useAuth } from "./authContext";
const apiUrl = import.meta.env.VITE_API_URL;

const CategoryContext = createContext();

export const useCategoryContext = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const { encodedToken } = useAuth()
  const { response: postCategoryResponse, operation: postCategoryOperation } =
    useAxios();
  const { response: allCategories, operation: getCategories } = useAxios();
  const [categoryData, setCategoryData] = useState({
    category: "",
    gstRate: "",
  });

  const getAllCategories = () => {
    getCategories({
      method: "get",
      url: `${apiUrl}/category/c`,
      headers: { authorization: encodedToken },
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    postCategoryOperation({
      method: "post",
      url: `${apiUrl}/category/createCategory`,
      headers: { authorization: encodedToken },
      data: categoryData,
    });
    setCategoryData({
      category: "",
      gstRate: "",
    });
  };

  useEffect(() => {
    if(encodedToken){
      getAllCategories();
    }
  }, [encodedToken]);

  useEffect(() => {
    if (postCategoryResponse && encodedToken) {
      toast.success(postCategoryResponse.message, {duration:2000})
      getAllCategories();
    }
  }, [postCategoryResponse,encodedToken]);

  return (
    <CategoryContext.Provider
      value={{ handleOnSubmit, categoryData, setCategoryData, allCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
