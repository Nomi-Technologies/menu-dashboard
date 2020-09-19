import React, { useEffect } from "react"

import { navigate } from "gatsby"

import { retrieveUserToken } from "../util/auth"

import "./index.css"

const IndexPage = () => {

  useEffect(() => {
    if (retrieveUserToken() != null) {
      navigate("/dashboard/menu")
    } else {
      navigate("/login")
    }
  }, [])

  return (<></>)
}

export default IndexPage
