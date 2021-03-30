import React, { useState, } from 'react';
import Client from '../../../util/client'
import SearchIcon from "../../../assets/img/search.png"
import CancelIcon from "../../../assets/img/delete-icon.png"
import { Button, ButtonPrimary, ButtonSecondary, ButtonSpecial, ButtonDelete } from "../../basics"

import styled from "styled-components"



const MenuControls = styled.div`
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    width: 100%;

    .searchForm {
        flex-basis: 50%;
        position: relative;
    }

    .search {
        padding: 10px 20px;
        background-color: #F9F9F9;
        font-size: 14px;
        padding-left: 10px;
        border-radius: 8px;
        border: 2px #E3EBF2 solid;
        width: 100%;
    }

    .cancelSearch {
        top: 28%;
        position: absolute;
        left: 100%;
        height: 40%;
    }

    .submitSearch {
        top: 0px;
        position: absolute;
        left: 98%;
        height: 45%;
    }

    .buttons {
        display: flex;
        align-self: flex-end;
        text-align: center;
    }
    
    .buttons.right-controls {
        ${Button} {
            margin-left: 10px;
        }
    }
`


const SearchBox = (props) => {

    const [searchBoxFocused, setSearchBoxFocused] = useState(false);
    const [searchBoxValue, setSearchBoxValue] = useState('');




    // TODO: refactor search to be in browser
    const handleSearch = (e) => {
        e.preventDefault();
        e.target.firstChild.blur();
        setSearchBoxFocused(false)
        if (searchBoxValue.trim() === '') {
            props.setIsSearching(false);
        } else {
            Client.searchDishes(searchBoxValue, props.menu?.menuId)
            .then((res) => {
                props.setSearchResults(res.data);
                props.setIsSearching(true);
            })
            .catch((err) => {
                console.error("error searching for dishes");
            })
        }
    }


    return(
        <form onSubmit={handleSearch} className='searchForm'>
        <input className='search' placeholder='Search Dishes...' id='searchBox' type='text' value={searchBoxValue}
            onChange={(e) => setSearchBoxValue(e.target.value)}
            onFocus={(e) => {
                setSearchBoxFocused(true);
                e.target.select(); // highlight text when focus on element
            }}
        />
        {
            (props.isSearching && !searchBoxFocused) ?
            <input className='cancelSearch' type='image' alt="Reset search" src={CancelIcon} onClick={(e) => {
                e.preventDefault();
                setSearchBoxValue('');
                props.setIsSearching(false);
            }}/> :
            <input className='submitSearch' type='image' alt="Submit" src={SearchIcon} />
        }

        </form>
    );


}


export { SearchBox }
