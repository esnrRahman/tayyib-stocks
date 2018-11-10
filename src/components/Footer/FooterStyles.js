import styled from 'styled-components';
import { Menu, Icon } from 'semantic-ui-react';
import STYLE_CONSTANTS from '../../constants/StyleConstants';

export const StyledFooterMenu = styled(Menu)`
  && {
    border: none;
    box-shadow: none;
  }
`;

export const StyledCopyrightFooterMenuItem = styled(Menu.Item)`
  &&&&&& {
    padding-left: 20px;
    font-size: ${STYLE_CONSTANTS.STANDARD_FONT_SIZE};
    font-family: ${STYLE_CONSTANTS.TEXT_FONT_FAMILY};
  }
`;

export const StyledFacebookMenuItem = styled(Menu.Item)`
  &&&&&& {
    &:hover {
      background: none;
    }
  }
`;

export const StyledFooterIcon = styled(Icon)`
  && {
    font-size: 2.5em;
  }
`;
