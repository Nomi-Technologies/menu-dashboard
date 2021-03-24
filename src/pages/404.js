import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

import styled from "styled-components";

let NotFound = styled.div`
  margin-left: 20px;
  margin-top: 20px;
`;

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <NotFound>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </NotFound>
  </Layout>
);

export default NotFoundPage;
