import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import dateFormat from 'dateformat';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    position:"relative"
  },
  item: {
    padding: '20px',
    borderBottom: "1px solid #eee"
  },
  status: {
    textAlign: "left",
    verticalAlign: "middle",
    position: "absolute",
    top: "0",
    left: "0",
    bottom: "1px",
    width: "10px",
  },
  timeStamp: {
    float: "right",
  }
}));

function BuildsListItem(props) {
  const classes = useStyles();

  const build = props.data;

  return (
    <div className={classes.root}>
      <div className={classes.item}>

      <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <strong>{build.name}</strong><br />
            {build.latestOutcome.buildNumber}
          </Grid>
          <Grid item xs={6} sm={3}>
            {dateFormat(build.latestOutcome.finishTime, "dd.mm.yyyy, HH:MM:ss")}
          </Grid>
          <Grid item xs={1} sm={3} style={{textAlign: "right"}}>
            <Fab
              variant="extended"
              size="small"
              className={clsx("statusLabel", build.latestOutcome.result)}                           
              >
              {build.latestOutcome.result}
          </Fab>
          </Grid>
      </Grid>
      </div>
    </div>
  );
}
  
export default BuildsListItem;