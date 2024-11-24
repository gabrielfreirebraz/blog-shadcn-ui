import React from "react";

interface InputProps {
  id: string;
  placeholder?: string;
  register: any;
  error?: string;
  requiredMessage?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  placeholder = "",
  register,
  error,
  requiredMessage,
}) => {
  return (
    <div>
      <input
        id={id}
        {...register(id, { required: requiredMessage })}
        placeholder={placeholder}
        className={`mt-1 block w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export { Input };
