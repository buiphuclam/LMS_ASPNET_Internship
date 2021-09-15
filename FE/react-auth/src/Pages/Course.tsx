import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import SimpleCard from "../components/Card_Course";
// import courseList from './coursejs';



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
  const [courseList, setCourseList] = useState([]);

  const loadCourses = async () => {
      const res = await fetch("https://lmsg03.azurewebsites.net/api/Course/getcourse",{
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });

    const content = await res.json();
    if(content.message ==='Success')
      setCourseList(content.data)
  }

  useEffect(() => {
    loadCourses();
  }, []);
  const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
  };

  const getcourseList =(courseObject: JSX.IntrinsicAttributes & { courseName: any; courseShortDetail: any; coourseImg: any; courseId:any;}) => {
    return (
      <Grid item xs={12} sm={4}>
        <SimpleCard key={courseObject.courseId} {...courseObject} />
      </Grid>
      );
  }

  return (
          <Grid container  spacing={6}>
              
                {courseList.map(courseObject => getcourseList(courseObject))}



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
  );
};

export default Course;