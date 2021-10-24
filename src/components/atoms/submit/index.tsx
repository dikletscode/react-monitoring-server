import React from "react";
const Submit = ({ value, disabled }: { value: string; disabled?: boolean }) => {
  return (
    <div className="p-1 pt-8 w-40 ">
      <input
        value={value}
        type="submit"
        disabled={disabled}
        className={` py-3 px-2 rounded-md   w-full border-2 bg-gray-300 border-base text-black`}
      />
    </div>
  );
};
export default Submit;
