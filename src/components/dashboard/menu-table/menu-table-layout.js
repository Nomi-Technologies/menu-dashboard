import React, { useState, useEffect, useContext } from "react";

import SidebarLayout from "../../dashboard/sidebar/sidebar-layout";
import { Container, Column } from "../../grid";
import { navigate } from "gatsby";
import Client from "../../../util/client";
import { MenuContext } from "./menu-context";
import { ModificationContext } from "./modification-context";

import { RestaurantSelector } from "../tab-selector/restaurant-selector";
import { MenuSelector } from "../tab-selector/menu-selector";
import TopBar from "../../top-bar";
import Navigation from "../../../util/navigation";
import { URLParamsContext } from "../../URL-params-context";

const MenuTableLayout = ({ children }) => {
  const context = useContext(URLParamsContext);
  const { menuId } = context;

  let [restaurants, setRestaurants] = useState([]);
  const [restaurantId, setRestaurantId] = useState(null);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [modificationsById, setModificationsById] = useState({});

  const getRestaurants = async () => {
    await Client.getGroup().then((res) => {
      Client.getRestaurantsByGroup(res.data.id).then((res) => {
        setRestaurants(res.data);
        if (res.data.length != 0) {
          setRestaurantId(res.data[0].id);
        }
      });
    });
  };

  const getRestaurant = async () => {
    await Client.getRestaurantInfo(context).then((res) => {
      setCurrentRestaurant(res.data);
      setRestaurantId(restaurantId);
    });
  };

  /*const getAllMenus = async () => {
    Client.getAllMenus(context).then((res) => {
      setMenus(res.data);
    });
  };

  const getMenu = async (menuId) => {
    await Client.getMenu(menuId).then((res) => {
      setCurrentMenu(res.data);
    });
  };*/

  const refreshRestaurant = async () => {
    //await getAllMenus();
    await getRestaurants();

    if (restaurantId !== null && restaurantId !== undefined) {
      //setCurrentRestaurant({});
      await getRestaurant();
      if (context.menuId !== "all-menus") {
        await Client.getMenu(context).then((res) => {
          setCurrentMenu(res.data);
        });
      }
    } else {
      //await getRestaurant(restaurants[0].id);
    }
  };

  let menuContext = {
    //menu: currentMenu,
    restaurant: currentRestaurant,
    refreshRestaurant: refreshRestaurant,
  };

  const refreshModifications = async () => {
    const { data } = await Client.getAllModifications(context);
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
    refreshRestaurant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId]);

  useEffect(() => {
    getRestaurants();
    refreshModifications();
  }, []);

  return (
    <SidebarLayout>
      <MenuContext.Provider value={menuContext}>
        <ModificationContext.Provider value={modificationContext}>
          <Container>
            <Column>
              <TopBar
                title="Menus"
                currentRestaurant={currentRestaurant}
                currentMenu={currentMenu}
              >
                {context.dishIdOrCreate ||
                context.categoryIdOrCreate ? null : menuId === "all-menus" ? (
                  <RestaurantSelector
                    restaurantId={restaurantId}
                    restaurants={restaurants}
                  />
                ) : (
                  <MenuSelector menuId={menuId} />
                )}
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
