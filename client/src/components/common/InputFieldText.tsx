import React from "react";
import styled from "styled-components";

interface InputProps {
  onChange: (value: string) => void;
  children: React.ReactNode;
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
  children,
}: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <>
      <InputLayout>
        <StyledLabel htmlFor={id}>{children}</StyledLabel>
        <InputFieldBox>
          <StyledInput
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
          />
        </InputFieldBox>
      </InputLayout>
    </>
  );
};

export default InputFieldText;

const InputLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 4px;

  width: 343px;
  height: 57px;
`;

const StyledLabel = styled.label`
  font-weight: 500;
  font-size: 12px;
`;

const InputFieldBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;

  width: 222px;
  height: 29px;

  background: #fcfaf9;
  border-radius: 50px;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 222px;
  height: 29px;
  background-color: transparent;
  &::placeholder {
    font-weight: 400;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
  }
`;
