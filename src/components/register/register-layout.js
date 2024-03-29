import React, { useState } from "react";
import styled from "styled-components";
import { Container, Column } from "../../components/grid";
import { RegistrationProgress } from "./registration-progress";
import { FormContainer } from "../form";
import { useLocation } from "@reach/router";
import { navigate } from "gatsby";

import "../../pages/index.css";

const StyledRegisterLayout = styled.div``;

let SideBar = styled(Column)`
  min-width: 350px;
  max-width: 450px;
`;

let FormColumn = styled(Column)`
  padding-right: 52px;
`;

let RegisterFormContainer = styled(FormContainer)`
  overflow: hidden;
  padding-top: 100px;
`;

const RegisterLayout = ({ children }) => {
  const [registrationData, setRegistrationData] = useState({});

  const { href } = useLocation();

  const getCurrentIndex = () => {
    if (href) {
      if (href.includes("contact-info")) {
        return 1;
      } else if (href.includes("restaurant-details")) {
        return 2;
      } else {
        return 3;
      }
    }
    return -1;
  };

  return (
    <StyledRegisterLayout>
      <Container>
        <SideBar>
          <RegistrationProgress currentIdx={getCurrentIndex()} />
        </SideBar>
        <FormColumn>
          <RegisterFormContainer>{children}</RegisterFormContainer>
        </FormColumn>
      </Container>
    </StyledRegisterLayout>
  );
};

export default RegisterLayout;
