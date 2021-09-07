import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { FaceSharp } from '@material-ui/icons';
import { ExitToAppSharp } from '@material-ui/icons';
import { PeopleOutlineSharp } from '@material-ui/icons';
import { EmojiPeopleSharp } from '@material-ui/icons';
import { MenuBookSharp } from '@material-ui/icons';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Course from './Course';
import { BrowserRouter, Route, Switch,Link, withRouter  } from 'react-router-dom';
import Profile from './Profile';
import Student_table from '../components/Table_Actor';
//import { Switch, Route, Link } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        marginTop: 70,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      marginTop: 70,
      backgroundColor: "#e8f5e9",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    drawerContainer: {
      overflow: 'auto',
    },
  }),
);

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}


const Drawer_Admin = (props: any) =>{
  const { history } = props;
  //console.log(props);
  const classes = useStyles();
  
  const itemsList = [
    {
        text: "Danh sách các khóa học",
        icon: <MenuBookSharp/>,
        index:"1",
        onClick: () => history.push("/admin/courseList")
    },
    {
        text: "Quản lý học sinh",
        icon: <PeopleOutlineSharp/>,
        index:"2",
        onClick: () => history.push("/admin/student")
    },
    {
        text: "Quản lý giáo viên",
        icon: <NaturePeopleIcon/>,
        index:"3",
        onClick: () => {
        }
    },
    {
        text: "Quản lý trợ giảng",
        icon: <EmojiPeopleSharp/>,
        index:"4",
        onClick: () => {
        }
    },
    {
        text: "Profile",
        icon: <FaceSharp />,
        index:"5",
        onClick: () => history.push("/admin/profile")
    },
    {
        text: "Đăng xuất",
        icon: <ExitToAppSharp />,
        index:"6",
        onClick: () => {
        }
    }
];

// const title = itemsList.map((item, index) =>{
//   const { text, icon } = item;
//   return (
//     <div>{text.indexOf}</div>
//   );
// })

const title = "Body";
return (
  <div className="form-admin">
  <div className={classes.root}>
    <CssBaseline />
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {itemsList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
            <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
            </ListItem>
          );
          })}
        </List>
        <Divider />
      </div>
    </Drawer>
    <main className={classes.content}>
      <Switch>
        <Route exact path="/admin/courseList">
          
            <Typography paragraph>
            <div style={{margin: '50px 0px'}}>
                <Course/>
              </div>
            </Typography>
            
        </Route>
        <Route exact path="/admin/profile" >
            <Typography>
              <div max-width="500px" style={{margin: '50px 0px'}}>
                <Profile/>
              </div>
            </Typography>
        </Route>
        <Route exact path="/admin/student">
            <Typography>
              <div style={{margin: '50px 0px'}}>   
                <Student_table/>
              </div>
            </Typography>
        </Route>
      </Switch>
      {/* <Toolbar />
      <Typography paragraph>
        <Course/>
      </Typography> */}
    </main>
  </div>
  </div>
);

}

export default  withRouter (Drawer_Admin);