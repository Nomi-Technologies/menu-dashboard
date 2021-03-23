import React, { useEffect } from "react"

import { navigate } from "gatsby"

import { retrieveUserToken } from "../util/auth"

import "./index.css"
import Navigation from "../util/navigation"

const IndexPage = () => {
  useEffect(() => {
    if (retrieveUserToken() != null) {
      Navigation.allMenus()
    } else {
      navigate("/login")
    }
  }, [])

  return <></>
}

export default IndexPage
