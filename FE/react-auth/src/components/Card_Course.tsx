import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';

const useStyles = makeStyles({
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
  });
  
   const SimpleCard = (props: { courseName: any; courseShortDetail: any; coourseImg: any; courseId: any}) => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
  
    const { courseName, courseShortDetail, coourseImg, courseId } = props;

    
    return (
      <Card className={classes.root}>
        <CardContent>
          <CardMedia style={{height: "150px"}} image={coourseImg} ></CardMedia>
          <Typography variant="h5" component="h2" >
            {courseName}
          </Typography>
          {/* <Typography className={classes.pos} color="textSecondary">
            {status}
          </Typography> */}
          <Typography variant="body2" component="p">
            {courseShortDetail}
          </Typography>
        </CardContent>
        <CardActions>
          <Button  size="small">Learn More</Button>         
          <Link to={'/details/?id='+ courseId}>Xem khóa học</Link>
          <Link to={'/addsection/?courseId='+ courseId}>Thêm lớp</Link>
        </CardActions>
      </Card>
    );
  }

  export default SimpleCard;