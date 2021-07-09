import React from "react";
import "../styles/Hero.scss";
import ThreeModel from "./ThreeModel";

export const Hero = () => {
  return (
    <div className="hero-section">
      <div className="content-section">
        <img src="./images/explore.svg" alt="" />
      </div>
      <div className="three-object">
        <ThreeModel />
      </div>
    </div>
  );
};
