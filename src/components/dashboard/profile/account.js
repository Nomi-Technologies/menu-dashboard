import styled from "styled-components";
import { Column } from "../../grid";
import { Link } from "gatsby";

let InfoTitle = styled.p`
  position: relative;
  margin: 10px 0;
  margin-top: 40px;
  margin-left: 96px;
  font-family: HK Grotesk Regular;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  color: #000000;
  flex: none;
  order: 0;
`;
let SideTitle = styled.p`
  margin-left: 96px;
  font-family: HK Grotesk Regular;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 29px;
  color: #8a9db7;
`;
let LinkToAnotherPage = styled(Link)`
  color: #8a9db7;
`;

let Wrapper = styled.div`
  margin-top: 65px;
  position: static;
  overflow-y: hidden;
  overflow-x: hidden;
`;

let Back = styled.p`
  margin-left: 60px;
  font-family: HK Grotesk Regular;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  color: #8a9db7;
  :hover {
    color: orange;
  }
`;
let MarginTop = styled.div`
  margin-top: 100px;
`;

let Orange = styled.p`
  color: orange;
`;

let SideBar = styled(Column)`
  background-color: white;
`;

let GreyBar = styled(Column)`
  padding-bottom: 40px;
`;

export {
  InfoTitle,
  SideTitle,
  LinkToAnotherPage,
  Wrapper,
  Back,
  MarginTop,
  Orange,
  SideBar,
  GreyBar,
};
