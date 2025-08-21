import React from "react";
import Header from "@/component/Header/Header";
import { Outlet } from "react-router-dom";

const Main: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
