import { useState } from "react";
import { useSale } from "../context/saleContext";
import RevenueSummary from "../components/RevenueDetails";
import Navbar from "../components/Navbar";

// sales and revenue page where admin can see revenue and sales details
const SalesDetails = () => {
  const {
    handleDateOnChange,
    revenueForADayResponse,
    revenueForAMonthResponse,
    revenueForAYearResponse,
    saleADayResponse,
  } = useSale();

  const [date, setDate] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
    handleDateOnChange(new Date(e.target.value));
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center p-4">
        {revenueForAMonthResponse && revenueForAYearResponse && (
          <RevenueSummary
            dailyRevenue={revenueForADayResponse?.data}
            monthlyRevenue={revenueForAMonthResponse?.data}
            yearlyRevenue={revenueForAYearResponse?.data}
          />
        )}
        <div className="my-4">
          <label className="mb-2 text-lg font-semibold" htmlFor="date-picker">
            Select a date for sales and revenue details:
          </label>
          <input
            type="date"
            id="date-picker"
            value={date}
            onChange={handleDateChange}
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {saleADayResponse && (
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
              {saleADayResponse?.data?.map((item) =>
                item?.products?.map((row) => (
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
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SalesDetails;
