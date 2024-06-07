import React from "react";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Routers from "../routes/Routers.jsx";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/home" || location.pathname === "/";

  return (
    <div>
      {isHome ? null : <Header />}
      <main>
        <Routers />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
