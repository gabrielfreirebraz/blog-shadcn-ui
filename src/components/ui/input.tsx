import React from "react";
import { cn } from "@/lib/utils"; // Função utilitária do ShadCN

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  onlyNumbers?: boolean;
  currency?: boolean;
}

const Input: React.FC<InputProps> = ({ className, error, onlyNumbers, currency, onInput, ...props }) => {

  const formatToBRL = (value: string): string => {
    const numericValue = value.replace(/\D/g, ""); 
    const formattedValue = (Number(numericValue) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return formattedValue;
  };

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    if (onlyNumbers) {
      event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "");
    
    } else if (currency) {
      const input = event.currentTarget;
      input.value = formatToBRL(input.value); 
    }
    if (onInput) {
      onInput(event); 
    }
  };

  return (
    <div>
      <input
        {...props}
        onInput={handleInput}
        className={cn(
          "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export { Input };
