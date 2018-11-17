import React from 'react';
import { Menu } from 'semantic-ui-react';

import {
  StyledFooterMenu, StyledFooterIcon, StyledCopyrightFooterMenuItem,
  StyledFacebookMenuItem,
} from './FooterStyles';

const Footer = () => (
  <StyledFooterMenu secondary fluid>
    <StyledCopyrightFooterMenuItem>
      Copyright &copy; Tayyib Stocks
    </StyledCopyrightFooterMenuItem>
    <Menu.Menu position="right">
      <StyledFacebookMenuItem href="https://www.facebook.com/groups/1387536778189499" target="_blank">
        <StyledFooterIcon position="right" name="facebook" />
      </StyledFacebookMenuItem>
    </Menu.Menu>
  </StyledFooterMenu>
);

export default Footer;
