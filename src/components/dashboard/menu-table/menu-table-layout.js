import React, { useState, useEffect } from 'react';

import SidebarLayout from "../../dashboard/sidebar/sidebar-layout"
import { Container, Column } from "../../grid"
import { navigate } from 'gatsby';
import Client from "../../../util/client"
import { MenuContext } from "./menu-context" 
import { ModificationContext } from './modification-context';

import { MenuSelector } from "../../dashboard/menu-selector/menu-selector"
import TopBar from "../../top-bar"

const MenuTableLayout = ({ menuId, children }) => {
    let [menus, setMenus] = useState([])
    const [currentMenu, setCurrentMenu] = useState(null);
    const [modificationsById, setModificationsById] = useState({});

    const getAllMenus = async () => {
        Client.getAllMenus().then((res) => {
            setMenus(res.data)
        })
    }

    const getMenu = async (menuId) => {
        await Client.getMenu(menuId).then((res) => {
            setCurrentMenu(res.data)
        })
    }

    const refreshMenu = async () => {
        await getAllMenus()

        if (menuId !== null && menuId !== undefined && menuId !== 'all-menus') {
            setCurrentMenu({})
            await getMenu(menuId)
        } else {
            if(menuId !== 'all-menus') {
                navigate('/dashboard/all-menus')
            }
        }
    };

    let menuContext = {
        menu: currentMenu,
        refreshMenu: refreshMenu
    }

    const refreshModifications = async () => {
        const { data } = await Client.getAllModifications();
        let modsLUT = data.reduce((accumulator, value) => {
            accumulator[value.id] = value;
            return accumulator
        }, {});
        setModificationsById(modsLUT);
    }

    let modificationContext = {
        modifications: modificationsById,
        refreshModifications,
    }

    useEffect(() => {
        refreshMenu();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuId]);

    useEffect(() => {
        refreshModifications();
    }, []);


    return (
        <SidebarLayout>
            <MenuContext.Provider value={ menuContext }>
                <ModificationContext.Provider value={ modificationContext }>
                    <Container>
                        <Column>
                            <TopBar title="Menu Management">
                                <MenuSelector menuId={ menuId } menus={ menus }/>
                            </TopBar>
                            { children }                
                        </Column>
                    </Container>
                </ModificationContext.Provider>
            </MenuContext.Provider>
        </SidebarLayout>
    )
}

export default MenuTableLayout
