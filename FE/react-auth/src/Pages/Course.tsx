import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme, alpha } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CardActions, TextField, Toolbar } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import SimpleCard from "../components/Card_Course";
import courseList from './coursejs';
import { SearchSharp } from '@material-ui/icons';

const useStyles1 = makeStyles(theme => ({
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);

const Course =() => {
  const [ListCourse, setCourse] = useState([])
  useEffect(() =>  {
    (
        async () => {
            const response = await fetch('https://lmsg03.azurewebsites.net/api/Course/getcourse',{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
            
            const content = await response.json();
            setCourse(content.data)    
    }    
    )();
    },[]);
  
  const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();
  
  const [search, setSearch] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
  };
  const classes1 = useStyles1();
  const getcourseList =(courseObject: JSX.IntrinsicAttributes & { courseName: any; courseShortDetail: any; coourseImg: any; courseId: any}) => {
    return (
      <Grid item xs={12} sm={4}>
      <SimpleCard key={courseObject.courseId} {...courseObject} />
      </Grid>
      );
  }
  const fiter = (name:any) =>{
      const newTodos = ListCourse.filter((todo: any)=>{
          return todo.courseName.indexOf(name) !== -1
      })
      setCourse(newTodos)
  }
  return (
    <div>
        <Toolbar>
                        <div className={classes1.SearchContainer}>
                            <button onClick={()=>{
                              const newTodos = ListCourse.filter((todo: any)=>{
                                console.log(todo.courseName.indexOf(search))
                                return todo.courseName.indexOf(search) >= 0
                            })
                            console.log(newTodos)
                            setCourse(newTodos)
                            }}><SearchSharp className={classes1.SearchSharp} /></button>
                            <TextField className={classes1.SearchInput} onChange ={e => setSearch(e.target.value)}/>                       
                        </div>
              </Toolbar>
              <Grid container  spacing={6}>
               
                {ListCourse.map((todo, i) => getcourseList(todo)                 
                )}
                
              {/* <Grid item xs={12} sm={4}>
                <SimpleCard title={"Javascript"} description={"Khóa học Javascript"} imgSrc={"https://dautucoin24h.com/wp-content/uploads/2021/03/1571131373.jpg"} status={"public"}/>"
              </Grid> */}

              {/* <Grid item  xs={12} sm={4}>
              <SimpleCard title={"Javascript"} description={"Khóa học"} imgSrc={"https://dautucoin24h.com/wp-content/uploads/2021/03/1571131373.jpg"} status={"public"}/>
              </Grid>

              <Grid item  xs={12} sm={4}>
              <SimpleCard title={"Javascript"} description={"Khóa học"} imgSrc={"https://dautucoin24h.com/wp-content/uploads/2021/03/1571131373.jpg"} status={"public"}/>
              </Grid>

              <Grid item  xs={12} sm={4}>
              <SimpleCard title={"Javascript"} description={"Khóa học"} imgSrc={"https://dautucoin24h.com/wp-content/uploads/2021/03/1571131373.jpg"} status={"public"}/>
              </Grid>

              <Grid item  xs={12} sm={4}>
              <SimpleCard title={"Javascript"} description={"Khóa học"} imgSrc={"https://dautucoin24h.com/wp-content/uploads/2021/03/1571131373.jpg"} status={"public"}/>
              </Grid>

              <Grid item  xs={12} sm={4}>
              <SimpleCard title={"Javascript"} description={"Khóa học"} imgSrc={"https://dautucoin24h.com/wp-content/uploads/2021/03/1571131373.jpg"} status={"public"}/>
              </Grid> */}

          </Grid>
    </div>
              
  );
};

export default Course;