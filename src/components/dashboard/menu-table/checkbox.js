import React from "react";
import styled from "styled-components";

const StyledCheckbox = styled.div`
  position: absolute;
  left: 16px;
`;

const StyledInput = styled.input`
  width: 1.5em;
  height: 1.5em;
  background: #628deb;
  border-radius: 4px;
  margin-right: 10px;
  margin-left: 0;
`;

const Checkbox = ({ handleCheckboxChange, item }) => (
  <StyledCheckbox>
    <label>
      <StyledInput
        type="checkbox"
        onChange={() => handleCheckboxChange(item.id)}
        className="form-check-input"
      />
    </label>
  </StyledCheckbox>
);

export default Checkbox;
