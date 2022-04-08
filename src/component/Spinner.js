import React, { Component } from "react";
import Snake from "./Snake.gif";

const Spinner = () => {
  return (
    <div className="text-center ">
      <img src={Snake} alt="Loading" />
    </div>
  );
};

export default Spinner;
