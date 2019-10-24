import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import appsettings from '../../../appsettings.json';

const useStyles = makeStyles(theme => ({
    root: {
      position: 'fixed',
      bottom: "0",
      left: "0",
      right: "0",
      padding: "10px 20px",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      color:"#777"
    },
    link: {
        color: "#777"
    }
  }));

function Footer(props) {
    const classes = useStyles();
    return (
        <footer className={classes.root}>
            <div className="left"><strong>{appsettings.app && appsettings.app.name ? appsettings.app.name : ""}</strong></div>
            <div className="right">&copy; {new Date().getFullYear()}&nbsp;&nbsp;&nbsp;
            <a href={appsettings.company.url} className={classes.link}>{appsettings.company.name}</a></div>
        </footer>
    )
}

export default Footer;