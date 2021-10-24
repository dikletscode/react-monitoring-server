import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input, Submit } from "../../components";
import { Wrapper } from "../../components";
import { API } from "../../config/axios";

const CreateServer: React.FC<{ isOpen: boolean; close: () => void }> = ({
  isOpen,
  close,
}) => {
  let init = {
    ip: "",
    sshKey: "",
    username: "",
  };
  const [data, setData] = useState(init);

  const [error, setError] = useState(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData = async () => {
      try {
        await API.post("server", data);
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
            <div className=" p-10  ">
              <Input
                type="text"
                name="IP Server"
                id="ip"
                value={data.ip}
                change={handleChange}
              />
              <Input
                type="text"
                name="username"
                id="username"
                value={data.username}
                change={handleChange}
              />
              <div className="p-1 ">
                <textarea
                  className="py-3 px-2 bg-cream   w-full h-28 border-2  border-base border-gray-400 focus:outline-none focus:ring-2 focus:border-blue-400 "
                  id="sshKey"
                  value={data.sshKey}
                  placeholder="SSH Key"
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    setData((prev) => ({
                      ...prev,
                      sshKey: e.target.value,
                    }));
                  }}
                ></textarea>
              </div>
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
export default CreateServer;
