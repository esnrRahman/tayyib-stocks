import React from 'react';

import { StyledNavbarMenu, StyledNavbarMenuItem } from './NavbarStyles';

const Navbar = () => (
  <StyledNavbarMenu secondary>
    <StyledNavbarMenuItem to="/home">
      Home
    </StyledNavbarMenuItem>
    <StyledNavbarMenuItem to="/about_us">
      About Us
    </StyledNavbarMenuItem>
    <StyledNavbarMenuItem to="/shariah_compliance">
      Shariah Compliance
    </StyledNavbarMenuItem>
    <StyledNavbarMenuItem to="/helpful_websites">
      Helpful Websites
    </StyledNavbarMenuItem>
    <StyledNavbarMenuItem to="/contact_us">
      Contact Us
    </StyledNavbarMenuItem>
  </StyledNavbarMenu>
);

export default Navbar;
