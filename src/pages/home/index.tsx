import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input, Submit } from "../../components";
import { CreateServer } from "../../modals";
import Select from "react-select";
import { API } from "../../config/axios";
import { useHistory } from "react-router-dom";

interface ServersTypes {
  id?: string;
  ip: string;
  username: string;
  sshKey: string;
  userId: string;
}

const Home = () => {
  const [isOpen, setOpen] = useState(false);
  const init = {
    name: "",
    serverId: "",
  };
  const [data, setData] = useState(init);
  const [servers, setServers] = useState<ServersTypes[]>([]);
  const [disable, setDisable] = useState(true);
  const history = useHistory();
  const getServers = async () => {
    try {
      let res: any = await API.get("servers");
      let arr: any[] = [];
      res.data.servers.map((item: ServersTypes) => {
        arr.push({ value: item.ip, label: item.ip });
      });
      setServers(arr);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData = async () => {
      try {
        await API.post("app", data);
        history.push("/installed-app");
      } catch (error: any) {
        console.log(error);
      }
    };
    postData();
  };

  useEffect(() => {
    getServers();
  }, [isOpen]);

  useEffect(() => {
    if (data.name !== "" && data.serverId !== "") {
      setDisable(false);
    }
  }, [data]);

  return (
    <div className="px-20 mt-16">
      <CreateServer isOpen={isOpen} close={() => setOpen(false)} />

      {data.serverId ? (
        <iframe
          src={`https://${data.serverId}:3000/d/UDdpyzz7z/prometheus-2-0-stats?orgId=1&refresh=1m&from=1635075581428&to=1635079181428&viewPanel=14`}
          width="450"
          height="200"
          frameBorder="0"
        ></iframe>
      ) : (
        <></>
      )}
      <div className="w-32  bg-gray-300 py-2 px-4">
        <button onClick={() => setOpen(true)}>add Servers</button>
      </div>
      <form action="" onSubmit={submit}>
        <div className="w-1/2 ">
          <Input
            type="text"
            name="App Name"
            id="name"
            value={data.name}
            change={handleChange}
          />
          <div>
            <div className="py-3">
              <Select
                id="country"
                options={servers}
                styles={customStyles()}
                onChange={(value: any) =>
                  setData((prev) => ({ ...prev, serverId: value.value || "" }))
                }
              />
            </div>
          </div>
          <Submit value="Install" disabled={disable} />
        </div>
      </form>
    </div>
  );
};

export default Home;
const customStyles = (height = 50) => {
  return {
    valueContainer: (base: any) => ({
      ...base,
      minHeight: height,
    }),
  };
};
