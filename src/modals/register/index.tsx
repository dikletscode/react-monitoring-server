import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input, Submit, Wrapper } from "../../components";
import Select from "react-select";
import { API } from "../../config/axios";
import { useHistory } from "react-router";

const Register: React.FC<{ isOpen: boolean; close: () => void }> = ({
  isOpen,
  close,
}) => {
  let [country, setCountry] = useState<any[]>([]);
  const init = {
    name: "",
    email: "",
    country: "",
    password: "",
  };
  const [data, setData] = useState(init);
  const [error, setError] = useState(null);
  const history = useHistory();
  const getCountries = async () => {
    try {
      let res: any = await axios.get("https://restcountries.com/v3.1/all");
      let arr: any[] = [];
      res.data.map((item: any) => {
        arr.push({ value: item.name.common, label: item.name.common });
      });
      setCountry(arr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData = async () => {
      try {
        await API.post("register", data);
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
          <form action="" autoComplete="on" onSubmit={submit}>
            <p className="text-red-400 text-center pt-5">{error}</p>
            <div className="  p-10  ">
              <Input
                type="text"
                name="Name"
                value={data.name}
                id="name"
                change={handleChange}
              />
              <Input
                type="email"
                name="Email"
                value={data.email}
                id="email"
                change={handleChange}
              />
              <div className="py-3">
                <Select
                  id="country"
                  options={country}
                  styles={customStyles()}
                  onChange={(value: any, action) =>
                    setData((prev) => ({ ...prev, country: value.value || "" }))
                  }
                />
              </div>

              <Input
                type="password"
                id="password"
                name="Password"
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
export default Register;

const customStyles = (height = 50) => {
  return {
    valueContainer: (base: any) => ({
      ...base,
      minHeight: height,
    }),
  };
};
