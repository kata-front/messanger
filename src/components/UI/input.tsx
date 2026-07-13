import { FC, InputHTMLAttributes } from "react";

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <input
      className={`
        w-full h-12 px-4 py-2 
        bg-white text-black placeholder-gray-400 
        border border-gray-300 rounded-xl 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:-translate-y-2 focus:scale-101 focus:shadow-2xl
        transition-all duration-200
        hover:-translate-y-2 hover:scale-101 hover:shadow-2xl
        ${className || ""}
      `}
      {...props}
    />
  );
};

export default Input;
