import React, { Component } from "react";
import "./About.css";
import {
  Button,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";

class About extends Component {
  render() {
    return (
      <div className="about">
        <Button id="PopoverLegacy" type="button">
          about
        </Button>
        <UncontrolledPopover
          trigger="legacy"
          placement="bottom"
          target="PopoverLegacy"
        >
          <PopoverHeader className="popover-header">
            Expenses Calculator
          </PopoverHeader>
          <PopoverBody className="popover-body">
            Expenses Calculator is a application made as a final project from my
            7 months course at Semos JS Academy 2019. <br /> This application
            provides you the option to add products that you purchase and
            calculate expenses for them. You can filter by price, date, and you
            can sort your expenses monthly and yearly.
          </PopoverBody>
        </UncontrolledPopover>
      </div>
    );
  }
}

export default About;
