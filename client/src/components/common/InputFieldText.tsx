import React from "react";

interface InputProps {
  onChange: (value: string) => void;
  name?: string;
  id: string;
  type: "text" | "number" | "password";
  placeholder?: string;
  value?: string;
}

const InputFieldText: React.FC<InputProps> = ({
  name,
  id,
  type,
  placeholder,
  value,
  onChange,
}: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <>
      <div>InputText</div>
      <label htmlFor={id}></label>
      <input id={id} type={type} placeholder={placeholder} value={value} />
    </>
  );
};

export default InputFieldText;
