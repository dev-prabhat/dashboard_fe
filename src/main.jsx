import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CategoryProvider } from "./context/categoryContext";
import { ProductProvider } from "./context/productContext";
import { BrowserRouter as Router } from "react-router-dom";
import { SaleProvider } from "./context/saleContext.jsx";
import { AuthProvider } from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <CategoryProvider>
          <ProductProvider>
            <SaleProvider>
              <App />
            </SaleProvider>
          </ProductProvider>
        </CategoryProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
