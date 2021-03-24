import React, { useEffect } from "react";

import { navigate } from "gatsby";

import { retrieveUserToken } from "../util/auth";

import Navigation from "../util/navigation";
import "./index.css";

const IndexPage = () => {
  useEffect(() => {
    if (retrieveUserToken() != null) {
      Navigation.allMenus();
    } else {
      navigate("/login");
    }
  }, []);

  return <></>;
};

export default IndexPage;
