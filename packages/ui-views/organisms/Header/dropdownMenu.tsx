/**
 * This component is a dropdown list for important actions
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-03-12
 */

import * as React from "react";
import { Link } from "react-router"
import { DropdownButton, MenuItem } from "react-bootstrap";
import { Horizontal } from "../../icons";

const Dropdown = () => {
  return(
    <DropdownButton title={"°°°"} id={`dropdown-basic`}>
      <MenuItem eventKey="1"><Link to="/">Home</Link></MenuItem>
    </DropdownButton>
  );
};

export default Dropdown
