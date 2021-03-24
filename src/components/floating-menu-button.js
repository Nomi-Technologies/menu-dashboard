import React, { useState, useEffect } from "react";

import styled from "styled-components";
import HamburgerMenu from "react-hamburger-menu";
import { FloatingMenu } from "../components/dashboard/floating-menu";
import { Colors } from "../util/colors";

const Button = styled.div`
  position: fixed;
  width: 62px;
  height: 62px;
  right: 64px;
  bottom: 56px;
  border-radius: 36px;
  background: ${Colors.ORANGE};
  box-shadow: 0px 10px 20px rgba(243, 163, 92, 0.2);
  cursor: pointer;
`;
const StyledHamburger = styled(HamburgerMenu)`
  margin: auto;
  position: absolute !important; /* overrides the in-line css of hamburger menu */
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

let StyledFloatingMenu = styled(FloatingMenu)`
  position: fixed;
  right: 64px;
  bottom: 56px;

  .menu {
    bottom: 70px;
    right: 150px;
  }
`;

const FloatingMenuButton = ({ menuId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFloatingMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeFloatingMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={toggleFloatingMenu}>
        <StyledHamburger
          isOpen={isOpen}
          menuClicked={() => {}}
          width={26}
          height={24}
          borderRadius={2}
          color="white"
          strokeWidth={4}
        />
      </Button>
      <StyledFloatingMenu
        isOpen={isOpen}
        close={closeFloatingMenu}
        menuId={menuId}
        className="menu"
      />
    </>
  );
};

export { FloatingMenuButton };
