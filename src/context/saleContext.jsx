import { createContext, useContext, useEffect, useState } from "react";
import { useAxios } from "../customHooks/useAxios";
import { useAuth } from "./authContext";
import { useLocation } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const SaleContext = createContext();

export const useSale = () => useContext(SaleContext);

// sales context
export const SaleProvider = ({ children }) => {
  const location = useLocation();
  const [salesData, setSalesData] = useState(undefined);
  const { encodedToken } = useAuth();
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
      headers: { authorization: encodedToken },
      data: salesData,
    });
  };

  useEffect(() => {
    if (encodedToken) {
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

  useEffect(() => {
    if (saleResponse !== undefined) {
      setSalesData(saleResponse);
    }
  }, [saleResponse]);

  useEffect(() => {
    if (location.pathname == "/login") {
      setSalesData(undefined);
    }
  }, [location]);

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
        salesData,
      }}
    >
      {children}
    </SaleContext.Provider>
  );
};
