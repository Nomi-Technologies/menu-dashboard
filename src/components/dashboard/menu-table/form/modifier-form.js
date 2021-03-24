import React, { useContext } from "react";

import { Colors } from "../../../../util/colors";

import { FormSplitRow } from "../../../../components/form";

import EditIcon from "../../../../assets/img/edit-icon.png";
import DeleteIcon from "../../../../assets/img/delete-icon-red.png";
import ModifierDropDown from "./modifier-dropdown";

import styled from "styled-components";
import { ModificationContext } from "../modification-context";

const ModifierContainer = styled.div`
  margin: 20px 0;
  padding: 10px 20px;
  border: 1px solid ${Colors.SLATE_LIGHT};
  border-radius: 5px;
`;

const Modifier = styled.div`
  position: relative;
  font-size: 14px;
  margin: 10px 0;

  & span {
    font-family: "HK Grotesk Light";
    color: ${Colors.GRAY};
  }

  & .edit,
  & .delete {
    width: 14px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    cursor: pointer;
  }

  & .edit {
    right: 30px;
  }

  & .delete {
    right: 5px;
  }
`;

export default ({ modalControls, dishModIds, setDishModIds }) => {
  const { modifications } = useContext(ModificationContext);

  return (
    <>
      <FormSplitRow>
        <div
          style={{
            padding: "0 10px 0 4px",
            flex: "0 1 auto",
            color: `${Colors.SLATE_DARK}`,
            fontSize: "38px",
            cursor: "default",
          }}
        >
          +
        </div>
        <ModifierDropDown
          style={{
            flex: "1 1 auto",
          }}
          onSelect={({ value }) => {
            const modIds = dishModIds.slice(0);
            if (!modIds.some((modId) => modId === value.id)) {
              modIds.push(value.id);
              setDishModIds(modIds);
            }
          }}
          onCreate={(value) => {
            modalControls.openModal(value);
          }}
        />
      </FormSplitRow>
      {dishModIds.length > 0 && Object.keys(modifications).length > 0 ? (
        <ModifierContainer>
          {dishModIds.map((modId, index) => {
            const modification = modifications[modId];
            return (
              <Modifier key={modId}>
                {modification.name}
                <span>, ${modification.price}</span>
                {modification.addTags.length > 0 ? (
                  <span>
                    , adds{" "}
                    {modification.addTags.map((tag) => tag.name).join(", ")}
                  </span>
                ) : null}
                {modification.removeTags.length > 0 ? (
                  <span>
                    , removes{" "}
                    {modification.removeTags.map((tag) => tag.name).join(", ")}
                  </span>
                ) : null}
                <img
                  className="edit"
                  src={EditIcon}
                  alt="edit icon"
                  onClick={() => {
                    modalControls.openModal(modification);
                  }}
                />
                <img
                  className="delete"
                  src={DeleteIcon}
                  alt="delete icon"
                  onClick={() => {
                    const modifications = dishModIds.slice(0);
                    modifications.splice(index, 1);
                    setDishModIds(modifications);
                  }}
                />
              </Modifier>
            );
          })}
        </ModifierContainer>
      ) : null}
    </>
  );
};
