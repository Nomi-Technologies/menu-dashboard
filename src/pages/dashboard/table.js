import React, {useState, useEffect} from 'react';
import styled from "styled-components"
import { navigate } from 'gatsby';

import Client from "../../util/client"
import { MenuContext } from "../../components/dashboard/menu-table/menu-context" 

import { FloatingMenuButton } from "../../components/floating-menu-button"
import { MenuTable } from "../../components/dashboard/menu-table/menu-table"
import { MenuTitle } from "../../components/dashboard/menu-table/menu-title"
import MenuTableLayout from '../../components/dashboard/menu-table/menu-table-layout';


let MenuContainer = styled.div`
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0 50px;
    padding-top: 30px;
`

const MenuTablePage = ({ location }) => {
    const { state = {} } = location
    if(state === null) {
        navigate('/dashboard/all-menus')
    }
    
    const { menuId } = state
    console.log(state)

    useEffect(() => {
        refreshMenu()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuId])

    const refreshMenu = async () => {
        console.log(state)
        if (menuId !== null && menuId !== undefined && menuId !== 'all-menus') {
            setMenuContext({
                ...menuContext,
                menu: {}
            })

            Client.getMenu(menuId).then((res) => {
                setMenuContext({
                    ...menuContext,
                    menu: res.data
                })
            })
        } else {
            if(menuId !== 'all-menus') {
                navigate('/dashboard/all-menus')
            }
        }
    };

    const [menuContext, setMenuContext] = useState({
        menu: null,
        refreshMenu: refreshMenu,
        updateMenuContext: setMenuContext
    });

    // TODO: fix menu title and floating menu button
    return (
        <MenuTableLayout menuId={ menuId }>
            <MenuContainer>  
                <MenuContext.Provider value={ menuContext }>
                    {/* <MenuTitle/> */}
                    <MenuTable/>
                    {/* <FloatingMenuButton/>  */}
                </MenuContext.Provider>
            </MenuContainer>
        </MenuTableLayout>
    )
}

export default MenuTablePage
