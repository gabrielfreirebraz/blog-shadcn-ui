import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils"; // Função utilitária do ShadCN
import React from "react";

interface SelectProps {
  id: string;
  options: { value: string; label: string; selected?: boolean; }[];
  onChange?: (value: string) => void;
  register?: any; // Para integração opcional com React Hook Form
  error?: string;
}

const Select: React.FC<SelectProps> = ({ id, options, onChange, register, error }) => {
  return (
    <div>
      <SelectPrimitive.Root 
        defaultValue={options.find((option) => option.selected)?.value ?? options[0]?.value}
        onValueChange={(value) => {
          if (onChange) {
            onChange(value); 
          }
        }}>
        <SelectPrimitive.Trigger
          id={id}
          aria-label={id}
          className={cn(
            "w-full px-3 py-2 border flex justify-between items-center",
            error ? "border-red-500" : "border-gray-300",
            "rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          )}
        >
          <SelectPrimitive.Value placeholder="Select an option" />
          <SelectPrimitive.Icon />
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Content className="rounded-md shadow-lg bg-white">
          <SelectPrimitive.Viewport className="p-1">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}                
                className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Root>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export { Select };
