import React from "react";
import { cn } from '@/lib/utils'

const InputFiled = ({ placeholderc, type, name, value, onChange, className, ...rest }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholderc}
      className={`px-[15px] py-[14px] outline-none border-[2px] border-primary w-full bg-transparent ${className}`}
      {...rest}
    />
  );
};

export default InputFiled;