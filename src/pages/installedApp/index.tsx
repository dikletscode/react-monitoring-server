import React, { useEffect, useState } from "react";
import { API } from "../../config/axios";

export interface AppsTypes {
  name: string;
  serverId: string;
}

const InstalledApp = () => {
  const [apps, setApps] = useState<AppsTypes[]>([]);
  const getApps = async () => {
    try {
      let res: any = await API.get("apps");
      setApps(res.data.apps);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApps();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <table className="text-left mx-auto w-full">
        <thead className="bg-gray-400 flex text-white w-full">
          <tr className="flex w-full ">
            <th className="p-4 w-1/6 items-center">
              <div className="h-4 w-4 bg-white"></div>
            </th>
            <th className="p-4 w-1/3">Apps</th>
            <th className="p-4 w-1/3">Servers</th>
          </tr>
        </thead>

        <tbody
          className="bg-grey-light flex flex-col items-center  overflow-y-scroll w-full"
          style={{ height: "50vh" }}
        >
          {apps.map((item) => {
            return (
              <tr className="flex w-full mb-4">
                <td className="p-4 w-1/6">
                  <input
                    className="px-7 py-1 w-5 h-5 absolute bg-white "
                    type="checkbox"
                  />
                </td>
                <td className="p-4 w-1/3">{item.name}</td>
                <td className="p-4 w-1/3">{item.serverId}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default InstalledApp;
