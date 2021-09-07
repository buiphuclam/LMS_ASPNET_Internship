
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

const useStyles = makeStyles(theme => ({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    SearchContainer: {
        display: "flex",
        background: alpha(theme.palette.info.light, 0.15),
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px",

    },

    SearchSharp: {

        alignSelf : "flex-end",
        marginBottom: "5px",


    },
    SearchInput: {
        Width : "200px",
        margin: "5px",
    },

  }));
  

const Home = (props: {name:string}) => {
    const classes = useStyles();
    return (
        <div className="form-home">
                <div>
                    <Toolbar>
                        <div className={classes.SearchContainer}>
                            <SearchSharp className={classes.SearchSharp} />
                            <TextField className={classes.SearchInput} />
                        </div>
                    </Toolbar>
                    <Course/> 
                </div>
          </div>
                
    );
};

export default Home;