import React, { ChangeEvent, FC } from "react";

interface InputInterface {
  name?: string;
  value?: string | number;
  change?: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

const Input: FC<InputInterface> = (props) => {
  return (
    <div className={"  py-3 "}>
      <input
        value={props.value}
        onChange={props.change}
        type={props.type}
        placeholder={props.name}
        id={props.id}
        className={`py-3 px-2 border-2  border-base border-gray-400 focus:outline-none focus:ring-2 focus:border-blue-400  
           rounded-md w-full`}
      />
      {props.children}
    </div>
  );
};

export default Input;
