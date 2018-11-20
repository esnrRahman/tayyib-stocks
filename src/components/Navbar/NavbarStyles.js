import styled from 'styled-components';
import { Link } from 'react-router-dom';

import STYLE_CONSTANTS from '../../constants/StyleConstants';

export const StyledNavbarMenu = styled.div`
  border: none;
  box-shadow: none;
  display: flex;
  justify-content: space-evenly;
  background: ${STYLE_CONSTANTS.BLACK};
`;

export const StyledNavbarMenuItem = styled(Link)`
  &&&& {
    font-size: 24px;
    font-family: ${STYLE_CONSTANTS.TEXT_FONT_FAMILY};
    padding: 30px;
    color: ${STYLE_CONSTANTS.WHITE};
  }
`;
