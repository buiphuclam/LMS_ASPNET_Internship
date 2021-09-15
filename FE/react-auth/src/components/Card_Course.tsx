import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@material-ui/core';

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
  
   const SimpleCard = (props: { courseName: any; courseShortDetail: any; coourseImg: any;  }) => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
  
    const { courseName, courseShortDetail, coourseImg} = props;


    return (
      <Card className={classes.root}>
        <CardContent>
          <CardMedia style={{height: "150px"}} image={courseName} ></CardMedia>
          <Typography variant="h5" component="h2" >
            {courseName}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {courseName}
          </Typography>
          <Typography variant="body2" component="p">
            {courseShortDetail}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  }

  export default SimpleCard;