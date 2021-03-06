import React, { useReducer } from "react";
import AuthContext from "./context";
import reducer from "./reducer";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, null);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Provider;
