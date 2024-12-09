import React from "react";

type InputDateProps = {
  id: string; // Identificador único do input
  value: string; // Valor do campo no formato ISO (YYYY-MM-DD)
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Função para lidar com mudanças no valor
  min?: string; // Data mínima no formato ISO (opcional)
  max?: string; // Data máxima no formato ISO (opcional)
  required?: boolean; // Define se o campo é obrigatório
  placeholder?: string; // Texto de ajuda exibido no campo (opcional)
};

const InputDate: React.FC<InputDateProps> = ({
  id,
  value,
  onChange,
  min,
  max,
  required = false,
  placeholder,
  ...props
}) => {
  return (
    <input
      type="date"
      id={id}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      required={required}
      placeholder={placeholder}
      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  );
};

export { InputDate };
