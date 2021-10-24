import React, { CSSProperties, useContext, useState } from "react";

import AuthContext from "../../../context/context";
import { Link } from "react-router-dom";
import { icon } from "../../../assets";

const Image = ({
  image,
  inner,
  klik,
}: {
  image: string;
  inner: string;
  klik?: () => void;
}) => {
  return (
    <div className="flex items-center p-4 cursor-pointer" onClick={klik}>
      <img src={image} className="h-5" /> <p className="pl-3">{inner}</p>
    </div>
  );
};

const DropDown = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const { state, dispatch } = useContext(AuthContext);
  const logoutAction = () => {
    close();
    localStorage.removeItem("user");
    dispatch({ type: "INVALID_USER", payload: null });
  };

  return (
    <div
      className="absolute bg-white shadow-xl border-2 border-gray-300 w-40 right-0 top-12 "
      onMouseLeave={close}
    >
      {isOpen ? (
        <Image image={icon.logout} inner="Logout" klik={logoutAction} />
      ) : (
        <></>
      )}
    </div>
  );
};
export default DropDown;
