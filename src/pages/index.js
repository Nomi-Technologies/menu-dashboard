import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"



import "./index.css"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <Link to="login">Login</Link>
  </Layout>
)

export default IndexPage
