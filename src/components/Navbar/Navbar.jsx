import React from 'react';
import { Menu } from 'semantic-ui-react';

const Navbar = () => (
  <Menu fluid widths={5}>
    <Menu.Item name="Home" />
    <Menu.Item name="About Us" />
    <Menu.Item name="Shariah Compliance" />
    <Menu.Item name="Helpful Websites" />
    <Menu.Item name="Contact Us" />
  </Menu>
);

export default Navbar;
