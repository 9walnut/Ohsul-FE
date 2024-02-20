import React from "react";
import styled from "styled-components";

import CheckboxContext from "./CheckboxContext";
import { CheckboxGroupProps } from "../../types/OhsulTag";

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  children,
  values,
  onChange,
  disabled,
}: CheckboxGroupProps) => {
  const isChecked = (value: string) => values.includes(value);

  const toggleValue = ({
    checked,
    value,
  }: {
    checked: boolean;
    value: string;
  }) => {
    if (checked) {
      onChange([...values, value]);
    } else {
      onChange(values.filter((v) => v !== value));
    }
  };
  const isDisabled = () => disabled;

  return (
    <>
      <fieldset>
        <StyledLegend>{label}</StyledLegend>
        <CheckboxContext.Provider
          value={{ isChecked, toggleValue, isDisabled }}
        >
          {children}
        </CheckboxContext.Provider>
        {/* <div>
          선택 한거:{" "}
          {values.map((value) => (
            <span key={value}>{value}</span>
          ))}
        </div> */}
      </fieldset>
    </>
  );
};

export default CheckboxGroup;

const StyledLegend = styled.legend`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.ydFont};
  color: ${({ theme }) => theme.colors.blueFont};
  margin: 7px 0px;
`;
