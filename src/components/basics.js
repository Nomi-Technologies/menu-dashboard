import styled from "styled-components";
import { Colors } from "../util/colors";

export const Button = styled.div`
  padding: 8px 40px;
  border-radius: 6px;
  color: white;
  cursor: pointer;

  transition: cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s all;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;

  ${Button} {
    margin-left: 10px;
  }
`;

export const ButtonPrimary = styled(Button)`
  background-color: ${Colors.ORANGE};
  border: 2px solid ${Colors.ORANGE};

  &:hover {
    background-color: ${Colors.ORANGE_LIGHT};
    border: 2px solid ${Colors.ORANGE_LIGHT};
  }
`;

export const ButtonSecondary = styled(Button)`
  background-color: ${Colors.WHITE};
  color: ${Colors.ORANGE};
  border: 2px solid ${Colors.ORANGE};

  &:hover {
    background-color: ${Colors.ORANGE_LIGHTEST};
  }
`;

export const ButtonSpecial = styled(Button)`
  background-color: ${Colors.BLUE};
  border: 2px solid ${Colors.BLUE};

  &:hover {
    background-color: ${Colors.BLUE_LIGHT};
    border: 2px solid ${Colors.BLUE_LIGHT};
  }
`;

export const ButtonDelete = styled(Button)`
  background-color: ${Colors.RED};
  border: 2px solid ${Colors.RED};

  &:hover {
    background-color: ${Colors.RED_LIGHT};
    border: 2px solid ${Colors.RED_LIGHT};
  }
`;
