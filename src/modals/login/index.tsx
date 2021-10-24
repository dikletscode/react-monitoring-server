import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Input, Submit, Wrapper } from "../../components";

import { API } from "../../config/axios";
import AuthContext from "../../context/context";

const Login: React.FC<{ isOpen: boolean; close: () => void }> = ({
  isOpen,
  close,
}) => {
  let init = {
    email: "",
    password: "",
  };
  const [data, setData] = useState(init);
  const { state, dispatch } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData = async () => {
      try {
        let res = await API.post("login", data);
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch({ type: "USER", payload: data });
        close();
      } catch (error: any) {
        setError(error.response.data.message);
      }
    };
    postData();
  };
  useEffect(() => {
    return () => {
      setData(init);
      setError(null);
    };
  }, [isOpen]);
  return (
    <>
      {isOpen ? (
        <Wrapper close={close}>
          <form action="" onSubmit={submit}>
            <p className="text-red-400 text-center pt-5">{error}</p>
            <div className=" p-10 bg-gray-200">
              <Input
                type="text"
                name="Email"
                id="email"
                value={data.email}
                change={handleChange}
              />
              <Input
                type="password"
                name="password"
                id="password"
                value={data.password}
                change={handleChange}
              />
              <Submit value="Login" />
            </div>
          </form>
        </Wrapper>
      ) : (
        <></>
      )}
    </>
  );
};
export default Login;
