import React from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  // Add any props if needed
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <Link to="/" className="mr-5 hover:text-blue-200">
        Home
      </Link>
      <Link to="/login" className="mr-5 hover:text-blue-200">
        Login
      </Link>
      <Link to="/register" className="mr-5 hover:text-blue-200">
        Register
      </Link>
      <Link to="/register-rbs" className="mr-5 hover:text-blue-200">
        RegisterRBS
      </Link>
      <Link to="/register-bs" className="hover:text-blue-200">
        RegisterBS
      </Link>
    </nav>
  );
};

export default Header;
