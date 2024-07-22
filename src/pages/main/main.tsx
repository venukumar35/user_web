import { Outlet } from "react-router-dom";
import Layout from "../../components/layout";
import NavBarTwo from "../../components/navbar1";

function Main() {
  return (
    <Layout>
      <NavBarTwo />
      <Outlet />
    </Layout>
  );
}

export default Main;
