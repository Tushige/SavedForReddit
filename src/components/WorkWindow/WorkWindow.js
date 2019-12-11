import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthUser } from '../../utils/auth';
import './WorkWindow.scss';
import Axios from 'axios';


function WorkWindow(props) {
  return (
    <div className="work-window">Work WIndow</div>
  )
}

export default WorkWindow;
