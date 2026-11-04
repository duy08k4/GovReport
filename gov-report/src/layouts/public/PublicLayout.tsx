import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";

const PublicLayout: React.FC = () => {
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface min-h-screen flex flex-col">
      <Header />
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 bg-surface flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
