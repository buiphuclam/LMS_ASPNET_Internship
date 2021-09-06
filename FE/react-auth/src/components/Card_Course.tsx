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
  
   const SimpleCard = (props: { title: any; description: any; imgSrc: any; status: any; }) => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
  
    const { title, description, imgSrc, status} = props;


    return (
      <Card className={classes.root}>
        <CardContent>
          <CardMedia style={{height: "150px"}} image={imgSrc} ></CardMedia>
          <Typography variant="h5" component="h2" >
            {title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {status}
          </Typography>
          <Typography variant="body2" component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  }

  export default SimpleCard;