import React, { Component } from "react";
import Img from "react-image";
import VisibilitySensor from "react-visibility-sensor";

const ImgLoader = props => (
  <VisibilitySensor>
    <Img src={props.image} className="thumbnail" />
  </VisibilitySensor>
);

export default ImgLoader;
