import React from "react";
import styled from "styled-components"

const StyledInput = styled.input`
  width: 1.5em;
  height: 1.5em;
  background: #628DEB;
  border-radius: 4px;
  margin-right: 10px;
  margin-left: 0;
`

const Checkbox = ({ handleCheckboxChange, item }) => (
  <div className="form-check">
    <label>
      <StyledInput
        type="checkbox"
        // onChange={() => handleCheckboxChange(item.id)}
        className="form-check-input"
      />
    </label>
  </div>
);

export default Checkbox;
