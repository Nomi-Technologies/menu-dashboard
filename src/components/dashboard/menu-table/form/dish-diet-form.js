import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Client from "../../../../util/client";
import { Colors } from "../../../../util/colors";

// Fix for undefined window bug
let MultiSelectDropdown;

if (typeof window !== `undefined`) {
  const { Multiselect } = require("multiselect-react-dropdown");
  MultiSelectDropdown = Multiselect;
}

let Container = styled.div`
  margin-bottom: 24px;
`;

const css = {
  searchBox: {
    border: "none",
    backgroundColor: Colors.SLATE_LIGHT,
    fontSize: "14px",
    margiBottom: "24px 0",
    padding: "0",
    paddingLeft: "8px",
  },
  inputField: {
    paddingLeft: "8px",
  },
  chips: {
    backgroundColor: Colors.ORANGE,
    color: "white",
    padding: "8px 10px",
    bordeRadius: "5px",
    marginLeft: "8px",
  },
  optionContainer: {
    maxHeight: "180px",
  },
};

const DishDietForm = ({ diets, setDiets }) => {
  const [allDiets, setAllDiets] = useState([]);

  useEffect(() => {
    Client.getDiets().then((response) => {
      setAllDiets(response.data);
    });
  }, []);

  const onSelect = (selectedList, selectedItem) => {
    setDiets(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    setDiets(selectedList);
  };

  return typeof window === "undefined" ? null : (
    <Container>
      <MultiSelectDropdown
        options={allDiets}
        selectedValues={diets}
        displayValue="name"
        placeholder="Start typing to begin..."
        onSelect={onSelect}
        onRemove={onRemove}
        style={css}
        closeIcon="cancel"
      />
    </Container>
  );
};

export { DishDietForm };
