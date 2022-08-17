import React, { useContext } from "react";

import { MenuContext } from "./menu-context";

import styled from "styled-components";
import { Colors } from "../../../util/colors";

import { Button } from "../../basics";
import ForwardSingle from "../../../assets/img/forward-single.png";
import ForwardDouble from "../../../assets/img/forward-double.png";

const StyledControl = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px;
`;

const StyledButton = styled(Button)`
  size: 10px;
  color: ${Colors.ORANGE};
  background-color: ${Colors.SLATE_LIGHTER};
  padding: 14px 16px 14px 16px;
  margin-right: 10px;
  position: relative;
`;

const Cover = styled(StyledButton)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  opacity: 0.5;
  background-color: ${Colors.WHITE};
`;

const Forward = styled.img`
  height: 10px;
`;

const ForwardLeft = styled(Forward)`
  transform: rotate(180deg);
  margin-right: 5px;
`;

const ForwardRight = styled(Forward)`
  margin-left: 5px;
`;

const MenuReorderControl = () => {
  let { menu, menus, reorderMenu } = useContext(MenuContext);

  const index = menus.findIndex((e) => e.id === menu.id);
  let position;
  if (index === 0) position = "top";
  else if (index === menus.length - 1) position = "bottom";
  else position = "middle";

  return (
    <StyledControl>
      <StyledButton
        disabled={position === "top"}
        onClick={() => reorderMenu(menu, "top")}
      >
        <ForwardLeft src={ForwardDouble} />
        Move to First
        {position === "top" ? <Cover /> : null}
      </StyledButton>
      <StyledButton
        disabled={position === "top"}
        onClick={() => reorderMenu(menu, "up")}
      >
        <ForwardLeft src={ForwardSingle} />
        Move Up
        {position === "top" ? <Cover /> : null}
      </StyledButton>
      <StyledButton
        disabled={position === "bottom"}
        onClick={() => reorderMenu(menu, "down")}
      >
        Move Down
        <ForwardRight src={ForwardSingle} />
        {position === "bottom" ? <Cover /> : null}
      </StyledButton>
      <StyledButton
        disabled={position === "bottom"}
        onClick={() => reorderMenu(menu, "bottom")}
      >
        Move to Last
        <ForwardRight src={ForwardDouble} />
        {position === "bottom" ? <Cover /> : null}
      </StyledButton>
    </StyledControl>
  );
};

export { MenuReorderControl };
