/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Auth = lazy(() => import("./pages/Auth.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Checkout = lazy(() => import("./pages/Checkout.jsx"));
const ProductDetails = lazy(() => import("./pages/ProductDetails.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "auth", element: <Auth /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
