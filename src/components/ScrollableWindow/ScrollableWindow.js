import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthUser } from "../../utils/auth";
import "./ScrollableWindow.scss";
import Axios from "axios";

function ScrollableWindow({ width, children }) {
  return (
    <div className="scrollable-window" style={{ width: `${width}px` }}>
      {children}
    </div>
  );
}

export default ScrollableWindow;
