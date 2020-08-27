import React, { useEffect } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

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
