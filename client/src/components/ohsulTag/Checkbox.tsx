import React, { ChangeEvent } from "react";
import styled from "styled-components";
import CheckboxContext from "./CheckboxContext";

import { CheckboxProps } from "../../types/OhsulTag";

const Checkbox: React.FC<CheckboxProps> = ({
  children,
  value,
  checked,
  onChange,
  id,
  disabled,
}: CheckboxProps) => {
  const context = React.useContext(CheckboxContext);
  const { isChecked, toggleValue, isDisabled } = context;

  // console.log("context:", isDisabled(disabled));

  return (
    <>
      <StyledCheckBox>
        <input
          type="checkbox"
          id={id}
          value={value || []}
          checked={isChecked(value)}
          onChange={({ target: { checked } }) =>
            toggleValue({ checked, value })
          }
          disabled={isDisabled(disabled)}
        />
        <label htmlFor={id}>{children}</label>
      </StyledCheckBox>
    </>
  );
};

export default Checkbox;

const BasicStyle = `
padding: 3px 7px;
box-sizing: border-box;
height: 20px;
font-size: 11px;
cursor: pointer;
`;

const StyledCheckBox = styled.div`
  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"] + label {
    ${BasicStyle}
    color: ${({ theme }) => theme.colors.mainBlue};
    background: ${({ theme }) => theme.colors.bgColor};
    flex: 1;
    display: inline-block;
    margin: 2px;
    text-align: center;
    border: 1px dashed ${({ theme }) => theme.colors.mainBlue};
    border-radius: 5px;
  }

  input[type="checkbox"]:checked + label {
    ${BasicStyle}
    color: ${({ theme }) => theme.colors.bgColor};
    background: ${({ theme }) => theme.colors.mainBlue};
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
    z-index: 1;
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  border: 0;
`;
