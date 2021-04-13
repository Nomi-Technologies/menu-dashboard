import React, { useState } from "react";
import Client from "../../../util/client";
import SearchIcon from "../../../assets/img/search.png";
import CancelIcon from "../../../assets/img/delete-icon.png";
import {
  Button,
  ButtonPrimary,
  ButtonSecondary,
  ButtonSpecial,
  ButtonDelete,
} from "../../basics";

import styled from "styled-components";

const SearchStyle = styled.div`
  width: 30%;

  .searchForm {
    flex-basis: 50%;
    position: relative;
  }

  .search {
    padding: 10px 20px;
    background-color: #f9f9f9;
    font-size: 14px;
    padding-left: 10px;
    border-radius: 8px;
    border: 2px #e3ebf2 solid;
    width: 100%;
  }

  .cancelSearch {
    margin-top: -45px;
    position: absolute;
    left: 98%;
    height: 45%;
  }

  .submitSearch {
    margin-top: -45px;
    position: absolute;
    left: 98%;
    height: 45%;
  }
`;

const SearchBox = (props) => {
  const [showCancelIcon, setShowCancelIcon] = useState(false);
  const [searchBoxValue, setSearchBoxValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (showCancelIcon) {
      setSearchBoxValue("");
      props.setIsSearching(false);
      setShowCancelIcon(false);
      return;
    }

    if (searchBoxValue.trim() === "") {
      props.setIsSearching(false);
    } else {
      Client.searchDishes(searchBoxValue, props.menu?.id)
        .then((res) => {
          props.setSearchResults(res.data);
          props.setIsSearching(true);
          setShowCancelIcon(true);
        })
        .catch((err) => {
          console.error("error searching for dishes");
        });
    }
  };

  return (
    <SearchStyle>
      <form onSubmit={handleSearch} className="searchForm">
        <input
          className="search"
          placeholder="Search Dishes..."
          id="searchBox"
          type="text"
          value={searchBoxValue}
          onChange={(e) => {
            setSearchBoxValue(e.target.value);
            setShowCancelIcon(false);
          }}
        />
        {showCancelIcon ? (
          <input
            className="cancelSearch"
            type="image"
            alt="Reset search"
            src={CancelIcon}
          />
        ) : (
          <input
            className="submitSearch"
            type="image"
            alt="Submit"
            src={SearchIcon}
          />
        )}
      </form>
    </SearchStyle>
  );
};

export { SearchBox };
