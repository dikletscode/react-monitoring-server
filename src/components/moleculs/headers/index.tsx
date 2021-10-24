import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Input, Submit } from "../..";
import { icon } from "../../../assets";
import AuthContext from "../../../context/context";
import { Login, Register } from "../../../modals";
import Button from "../../atoms/button";
import DropDown from "../dropdown";
import Wrapper from "../wrapper";

const Header = () => {
  const { state } = useContext(AuthContext);
  const [open, setOpen] = useState({
    login: false,
    register: false,
  });
  const [dropdown, setDropDown] = useState(false);
  const openModal = (field: string) => {
    setOpen((prev) => ({ ...prev, [field]: true }));
  };
  const closeModal = (field: string) => {
    setOpen((prev) => ({ ...prev, [field]: false }));
  };
  console.log(state.data, "stt");
  return (
    <>
      <nav className="bg-white p-5 shadow-lg">
        <div className="md:flex items-center justify-between  py-2 px-8 md:px-12">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800 md:text-3xl">
              <a href="#">Logo</a>
            </div>
            <div className="md:hidden">
              <button
                type="button"
                className="block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
              >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path
                    className="hidden"
                    d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"
                  />
                  <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                </svg>
              </button>
            </div>
            <div className="lg:flex flex-col md:flex-row hidden md:block mx-5">
              <Link
                to="/"
                className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2"
              >
                Apps
              </Link>
              <Link
                to="/installed-app"
                className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2"
              >
                Installed App
              </Link>
            </div>
          </div>

          {state && state.isLogin ? (
            <div className="relative">
              <div className="flex items-center ">
                <div className="pr-5">
                  <p>{state.data.name}</p>
                </div>
                <div
                  onClick={() => setDropDown(true)}
                  className="bg-blue-600 rounded-full  h-12 w-12"
                ></div>
              </div>
              <DropDown isOpen={dropdown} close={() => setDropDown(false)} />
            </div>
          ) : (
            <div className="flex">
              <Button open={() => openModal("login")} value="login" />
              <Button open={() => openModal("register")} value="register" />
            </div>
          )}
        </div>
      </nav>
      <Login isOpen={open.login} close={() => closeModal("login")} />
      <Register isOpen={open.register} close={() => closeModal("register")} />
    </>
  );
};
export default Header;
