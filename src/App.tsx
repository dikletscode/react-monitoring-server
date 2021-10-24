import React, { useContext, useEffect } from "react";
import "./App.css";
import { Header } from "./components";
import { API, setAuthToken } from "./config/axios";
import AuthContext from "./context/context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, InstalledApp } from "./pages";

function App() {
  const { state, dispatch } = useContext(AuthContext);

  const getUser = async () => {
    try {
      let res: any = await API.get("user");
      let data = res.data.user;

      data &&
        dispatch({
          type: "USER",
          payload: data,
        });
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = localStorage.getItem("user");

  useEffect(() => {
    if (loginUser) {
      const data = JSON.parse(loginUser);
      setAuthToken(data.token);
      getUser();
    } else {
      setAuthToken(null);
      dispatch({ type: "INVALID_USER", payload: null });
    }
  }, [loginUser]);

  if (state == null) {
    return <></>;
  }

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={InstalledApp} path="/installed-app" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
