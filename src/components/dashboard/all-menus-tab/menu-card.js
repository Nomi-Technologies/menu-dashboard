import React, { useState, useEffect } from "react";

import styled from "styled-components";
import EditIcon from "../../../assets/img/edit-orange.png";
import HeartIcon from "../../../assets/img/heart-active.png";
import HeartEmptyIcon from "../../../assets/img/heart-inactive.png";
import { FloatingMenu } from "../../dashboard/floating-menu";

import Client from "../../../util/client";
import { navigate } from "gatsby";
import Navigation from "../../../util/navigation";

const StyledMenuCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 8px 20px rgba(0, 20, 63, 0.1);
  border-radius: 8px;
  font-size: 18px;
  line-height: 26px;
  justify-content: space-between;
  display: flex;
  width: 325px;
  padding: 20px;
  margin: 8px;

  img {
    margin: 10px;
    cursor: pointer;
    width: 22px;
  }

  .controls {
    margin-right: 15px;
    display: flex;
    align-items: center;
  }
`;

const MenuName = styled.div`
  float: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
  width: 50%;
`;

const MenuCard = ({ menuId, name }) => {
  const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState(false);

  const toggleFloatingMenu = () => {
    setIsFloatingMenuOpen(!isFloatingMenuOpen);
  };

  return (
    <>
      <StyledMenuCard>
        {/* Adding placeholder here because it doesn't look trivial to supply the actual restaurant id. And it's not worth the effort because the field is only effective after the navigation rework */}
        <MenuName onClick={() => Navigation.table("my", menuId)}>
          {name}
        </MenuName>
        <div className="controls">
          {/* {
                        props.isFavorited ?
                        <img alt="Unfavorite" src={HeartIcon} onClick={() => props.toggleFavoriteMenu(props.id, false)}/> :
                        <img alt="Favorite" src={HeartEmptyIcon} onClick={() => props.toggleFavoriteMenu(props.id, true)}/>
                    } */}
          {/* <img
            type="image"
            alt="Edit"
            src={EditIcon}
            onClick={toggleFloatingMenu}
          /> */}
        </div>
      </StyledMenuCard>
      {/* <FloatingMenu
        isOpen={isFloatingMenuOpen}
        close={toggleFloatingMenu}
        menuId={menuId}
      /> */}
    </>
  );
};

export { MenuCard };
