import { createContext, useContext, useEffect } from "react";
import { useAxios } from "../customHooks/useAxios";
import { useAuth } from "./authContext";
const apiUrl = import.meta.env.VITE_API_URL;

const SaleContext = createContext();

export const useSale = () => useContext(SaleContext);

export const SaleProvider = ({ children }) => {
  const { encodedToken } = useAuth()
  const { response: saleResponse, operation: postSaleOperation } = useAxios();
  const { response: saleADayResponse, operation: getSalesADay } = useAxios();
  const { response: revenueForADayResponse, operation: getRvenueForADay } =
    useAxios();
  const { response: revenueForAMonthResponse, operation: getRevenueForAMonth } =
    useAxios();
  const { response: revenueForAYearResponse, operation: getRevenueForAYear } =
    useAxios();

  const handleDateOnChange = (date) => {
    getSalesADay({
      method: "get",
      url: `${apiUrl}/sale/${date}`,
      headers: { authorization: encodedToken },
    });
    getRvenueForADay({
      method: "get",
      url: `${apiUrl}/sale/revenue/day/${new Date(date)}`,
      headers: { authorization: encodedToken },
    });
  };

  const handleSaleOnSubmit = (salesData) => {
    postSaleOperation({
      method: "post",
      url: `${apiUrl}/sale/createSale`,
      data: salesData,
    });
  };

  useEffect(() => {
    if(encodedToken){
      getRevenueForAMonth({
        method: "get",
        url: `${apiUrl}/sale/revenue/month/${new Date().getFullYear()}/${
          new Date().getMonth() + 1
        }`,
        headers: { authorization: encodedToken },
      });
      getRevenueForAYear({
        method: "get",
        url: `${apiUrl}/sale/revenue/year/${new Date().getFullYear()}`,
        headers: { authorization: encodedToken },
      });
    }
  }, [encodedToken]);
  
  return (
    <SaleContext.Provider
      value={{
        handleSaleOnSubmit,
        saleResponse,
        handleDateOnChange,
        revenueForADayResponse,
        revenueForAMonthResponse,
        revenueForAYearResponse,
        saleADayResponse,
      }}
    >
      {children}
    </SaleContext.Provider>
  );
};
