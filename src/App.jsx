import ProductCategory from "./pages/ProductCategory";
import { Toaster } from "react-hot-toast";
import Product from "./pages/Product";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SalesDetails from "./pages/SalesAndRevenueDetails";
import { PrivateRoute } from "./components/PrivateRoute";
import { AuthRoute } from "./components/AuthRoute";
import { Login } from "./pages/Login";
import { LandingPage } from "./pages/Landingpage";

function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/category" element={<ProductCategory />} />
          <Route path="/product" element={<Product />} />
          <Route path="/salesdatails" element={<SalesDetails />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
