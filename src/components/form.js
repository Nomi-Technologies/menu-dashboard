import styled from "styled-components";
import { Colors } from "../util/colors";
import { Button } from "../components/basics";

export const FormRow = styled.div``;

export const FormContainer = styled.div`
  position: relative;
  width: 100%;
  max-height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 0 25%;
  padding-top: 32px;
`;

export const FormControls = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: flex-end;
  bottom: 0px;
  right: 0px;
  padding: 32px 0;
  width: 100%;

  background-color: white;

  ${Button} {
    margin-left: 16px;
  }
`;

export const FormSplitRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FormSplitColumn = styled.div`
  flex-basis: 48%;
`;

export const FormTitle = styled.h1`
  font-size: 24px;
  margin: 0;
  margin-bottom: 24px;
`;

export const FormSubtitle = styled.p`
  font-size: 12px;
  text-transform: uppercase;
  padding: 0;
  margin-top: 0;
  margin-bottom: 8px;
`;

export const FormMessage = styled.p`
  padding: 0;
  margin-top: 0;
  margin-bottom: 8px;
`;

export const FormError = styled.p`
  color: red;
  margin: 0px;
`;

export const FormInput = styled.input`
  width: 100%;
  border-radius: 6px;
  border: none;
  background-color: ${Colors.SLATE_LIGHT};
  opacity: 0.75;
  padding: 16px;
  margin-bottom: 24px;
  box-sizing: border-box;
`;

export const FormTextArea = styled.textarea`
  background-color: ${Colors.SLATE_LIGHT};
  width: 100%;
  border-radius: 6px;
  opacity: 0.75;
  padding: 16px;
  box-sizing: border-box;
  resize: none;
  border: none;
  height: 70px;
  margin-bottom: 24px;
`;

export const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin: 20px 0;
`;

export const FormNotice = styled.div`
  font-family: HK Grotesk Light;
  color: ${Colors.BLACK75};
  font-size: 14px;
`;
