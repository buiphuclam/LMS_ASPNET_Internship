
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Register from './Register';
import Nav from '../components/Nav';
import { Grid, TextField, Toolbar } from '@material-ui/core';
import Course from './Course';
import { SearchSharp } from '@material-ui/icons';
import { classExpression } from '@babel/types';
import { alpha,makeStyles } from '@material-ui/core';
  

const Home = (props: {name:string}) => {
    return (
        
                <div>
                    
                    <Course/> 
                </div>
    );
};

export default Home;