import React, { useState, useEffect, useContext } from "react";

import SidebarLayout from "../../dashboard/sidebar/sidebar-layout";
import { Container, Column } from "../../grid";
import { navigate } from "gatsby";
import Client from "../../../util/client";
import { MenuContext } from "./menu-context";
import { ModificationContext } from "./modification-context";

import { MenuSelector } from "../../dashboard/menu-selector/menu-selector";
import TopBar from "../../top-bar";
import Navigation from "../../../util/navigation";
import { URLParamsContext } from "../../URL-params-context";

const MenuTableLayout = ({ children }) => {
  const { menuId } = useContext(URLParamsContext);

  let [menus, setMenus] = useState([]);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [modificationsById, setModificationsById] = useState({});

  const getAllMenus = async () => {
    Client.getAllMenus().then((res) => {
      setMenus(res.data);
    });
  };

  const getMenu = async (menuId) => {
    await Client.getMenu(menuId).then((res) => {
      setCurrentMenu(res.data);
    });
  };

  const refreshMenu = async () => {
    await getAllMenus();

    if (menuId !== null && menuId !== undefined && menuId !== "all-menus") {
      setCurrentMenu({});
      await getMenu(menuId);
    } else {
      if (menuId !== "all-menus") {
        Navigation.allMenus();
      }
    }
  };

  const reorderMenu = (menu, action) => {
    if (menu === undefined) return;
    let reorderedMenus = [...menus];
    const currentIndex = reorderedMenus.findIndex((e) => e.id === menu.id);
    // Remove current id from the list.
    reorderedMenus.splice(currentIndex, 1);
    switch (action) {
      case "top":
        reorderedMenus = [menu, ...reorderedMenus];
        break;
      case "bottom":
        reorderedMenus.push(menu);
        break;
      case "up":
        reorderedMenus.splice(Math.max(currentIndex - 1, 0), 0, menu);
        break;
      case "down":
        reorderedMenus.splice(
          Math.min(currentIndex + 1, reorderedMenus.length),
          0,
          menu
        );
        break;
      default:
        reorderedMenus.splice(currentIndex, menu);
    }
    reorderedMenus.forEach((menu, index) => (menu.index = index));
    setMenus(reorderedMenus);
    Client.updateMenuOrder(reorderedMenus);
  };

  let menuContext = {
    menus,
    menu: currentMenu,
    refreshMenu: refreshMenu,
    reorderMenu: reorderMenu,
  };

  const refreshModifications = async () => {
    const { data } = await Client.getAllModifications();
    let modsLUT = data.reduce((accumulator, value) => {
      accumulator[value.id] = value;
      return accumulator;
    }, {});
    setModificationsById(modsLUT);
  };

  let modificationContext = {
    modifications: modificationsById,
    refreshModifications,
  };

  useEffect(() => {
    refreshMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuId]);

  useEffect(() => {
    refreshModifications();
  }, []);

  return (
    <SidebarLayout>
      <MenuContext.Provider value={menuContext}>
        <ModificationContext.Provider value={modificationContext}>
          <Container>
            <Column>
              <TopBar title="Menu Management">
                <MenuSelector menuId={menuId} menus={menus} />
              </TopBar>
              {children}
            </Column>
          </Container>
        </ModificationContext.Provider>
      </MenuContext.Provider>
    </SidebarLayout>
  );
};

export default MenuTableLayout;
