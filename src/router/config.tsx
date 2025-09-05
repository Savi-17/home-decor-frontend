
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Wishlist from "../pages/wishlist/page";
import Products from "../pages/products/page";
import ProductDetail from "../pages/product-detail/page";
import Checkout from "../pages/checkout/page";
import Tracking from "../pages/tracking/page";
import Profile from "../pages/profile/page";
import Address from "../pages/address/page";
import Orders from "../pages/orders/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/tracking",
    element: <Tracking />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/address",
    element: <Address />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
