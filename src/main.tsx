import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import VerifyOtp from "./pages/login/otp.tsx";
import Login from "./pages/login/login.tsx";
import Main from "./pages/main/main.tsx";
import HomePage from "./pages/main/home.tsx";
import Top from "./pages/main/mens/top.tsx";
import Bottom from "./pages/main/mens/bottom.tsx";
import Ethnic from "./pages/main/mens/ethnic.tsx";
import Sports from "./pages/main/mens/sports.tsx";
import Fragrance from "./pages/main/mens/fragrances.tsx";
import FootWear from "./pages/main/mens/footwear.tsx";
import Accessories from "./pages/main/mens/accessories.tsx";
import Inner from "./pages/main/mens/inner.tsx";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Login />}></Route>
      <Route path="/verifyOtp" element={<VerifyOtp />}></Route>
      <Route path="" element={<Main />}>
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Top" element={<Top />} />
        <Route path="/Bottom" element={<Bottom />} />
        <Route path="/Ethnic" element={<Ethnic />} />
        <Route path="/Sports" element={<Sports />} />
        <Route path="/Fragrances" element={<Fragrance />} />
        <Route path="/Footwear" element={<FootWear />} />
        <Route path="/Accessories" element={<Accessories />} />
        <Route path="/Inner" element={<Inner />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={routes} />
);
