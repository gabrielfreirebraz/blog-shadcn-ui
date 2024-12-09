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
      style={{
        padding: "0.5rem",
        fontSize: "1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: "100%",
        marginBottom: "1rem",
      }}
    />
  );
};

export { InputDate };
