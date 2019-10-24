import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/ListAlt';
import FolderIcon from '@material-ui/icons/Folder';
import FolderSelectedIcon from '@material-ui/icons/FolderOpen';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import jaemacomLogo from "../../_images/jaemacom-logo.svg";
import multicloudLogo from "../../_images/multicloudportal.png";
import stillerAlarmLogo from "../../_images/stilleralarm-logo.svg";

const logos = [
  {
    name: "jaemacom",
    image: jaemacomLogo
  },
  {
    name: "multicloud",
    image: multicloudLogo
  },
  {
    name: "stiller alarm",
    image: stillerAlarmLogo
  }
];

const drawerWidth = 240;
const logoMaxHeight = 50;
const logoMaxWidth = 250;
var logoImg = null;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#fff",
    boxShadow:"none"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  heading: {
    marginTop:"2px",
    color: "rgba(0, 0, 0, 0.87)",
    padding: "0 12px"
  },
  logoImg: {
    maxWidth: `${logoMaxWidth}px`,
    maxHeight: `${logoMaxHeight}px`,
  },
  onlineSign: {
    position:'absolute',
    right: '20px',
    cursor: 'default',
    backgroundColor: 'transparent!important'
  },
  online: {
    color: 'green'
  },
  offline: {
    color: 'red'
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  listItemDefault: {
    cursor:"default"
  },
  listIcon: {
    maxWidth:"35px",
    minWidth:"35px"
  }
}));

function Header(props) {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [setSelected] = React.useState(null);
  
  const selectedProject = props.selectedProject;
  const projects = props.projects;
  const online = props.online;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleItemSelected = () => {
    setSelected(1);
  };

  return (
    <div className={classes.root}>
      
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
        
          <IconButton
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          
          {(selectedProject && selectedProject.ProjectName) && 

            logos.forEach(function(i) {
              if(selectedProject.ProjectName.toLowerCase().indexOf(i.name) > -1) {
                logoImg = <img src={i.image} alt={selectedProject.ProjectName} className={classes.logoImg} />
              } 
            })
          }

          {logoImg ? logoImg :
            <Typography variant="h5" className={classes.heading} noWrap>
            {selectedProject && selectedProject.ProjectName}
            </Typography>
          }

          <IconButton
            color="inherit"
            aria-label="online-offline-sign"
            className={clsx(classes.onlineSign)}
          >
            <PowerSettingsNewIcon fontSize="large" className={online ? classes.online : classes.offline} /><div style={{color: "rgba(0, 0, 0, 0.54)", marginLeft: "10px", fontSize: "20px"}}>{online ? "online" : "offline"}</div>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon fontSize="large" /> : <ChevronRightIcon fontSize="large" />}
          </IconButton>
        </div>
        <Divider />
        <List>
        {(projects && projects.length > 0) && projects.map((p, index) => (
             
            selectedProject && selectedProject.ProjectName && selectedProject.ProjectName == p.name ? 
              
                
              <ListItem button key={p.name} className={classes.listItemDefault}>
                <ListItemIcon className={classes.listIcon}>
                  <FolderSelectedIcon  />
                </ListItemIcon>
                <Typography variant="h5"><strong>{p.name}</strong></Typography>
              </ListItem>
              
              : 
              
              <Link to={`/${p.name}`} onClick={handleItemSelected} key={index}>
                <ListItem button key={p.name}>
                  <ListItemIcon className={classes.listIcon}>
                    <FolderIcon />
                  </ListItemIcon>
                  <Typography variant="h5"><strong>{p.name}</strong></Typography>
                </ListItem>
              </Link>
              

          ))}
        </List>
      </Drawer>
    </div>
  );
}

function mapStateToProps(state) {
  const { projects } = state;
  const { selectedProject, online } = state.builds;
  //const { user } = authentication;
  return {
    projects, selectedProject, online
  };
}

export default connect(mapStateToProps)(Header);