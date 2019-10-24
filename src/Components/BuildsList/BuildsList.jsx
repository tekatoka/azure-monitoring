import React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreButton from '@material-ui/icons/MoreVert';
import EmptyIcon from '@material-ui/icons/NoteOutlined';
import BuildsListItem from '../BuildsListItem/BuildsListItem';
import BuildsCurrentListItem from '../BuildsListItemCurrent/BuildsListItemCurrent';

import DialogWindow from '../DialogWindow/DialogWindow';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    boxShadow: "none"
  },
  header: {
    position: "relative",
    height:"50px"
  },
  title: {
    padding: "14px",
    position: "absolute",
    left: "3px",
    top: "3px"
  },
  moreButton: {
    position: "absolute",
    right: "3px",
    top: "3px"
  },
  body: {
    minHeight: "355px"
  },
  empty: {
    display: "table",
    width: "100%",
    textAlign: "center",
    minHeight: "355px"
  },
  emptyMessage: {
    display: "table-cell",
    verticalAlign: "middle",
    position:"relative"
  },
  emptyIcon: {
    position: "absolute",
    color: "#eee",
    fontSize: "20rem",
    marginLeft: "auto",
    marginRight: "auto",
    left: "0",
    right: "0",
    top: "10%",
  }

}));

function BuildsList(props) {
  const classes = useStyles();
  
  const [openDialog, setOpenDialog] = useState(false);
  // const selectedProjectBuilds = props.selectedProjectBuilds;
  const { data, title, type } = props;

  const toggleDialog = () => {
    setOpenDialog(!openDialog);
  };

  return (

      <div>
        <Paper className={classes.root}>
        <div className={classes.header}>
        <Typography  variant="h4" className={classes.title}>{title}</Typography>
        {(data && data.length > 0) && 
        <IconButton
            color="inherit"
            aria-label="home"
            edge="start"
            className={clsx("icon-button", classes.moreButton)}
            onClick={toggleDialog}
          >
            <MoreButton fontSize="large" />
          </IconButton>
        }
          </div>
        
        <div className={classes.body}>
            {(data && data.length > 0) ? data.slice(0, 5).map((item, index) => type=="current" ? <BuildsCurrentListItem key={item.id} data={item} /> : <BuildsListItem key={item.id} data={item} />) 
            : 
            <div className={classes.empty}><div className={classes.emptyMessage}><EmptyIcon className={classes.emptyIcon} />No {title}</div></div> }
        </div>
        
        </Paper>
        
        
        {openDialog &&
          ((data && data.length > 0) && <DialogWindow open={true} tableData={data} title={title} type={type} handleOK={toggleDialog}  /> )
        }
    </div>
  );
}

export default BuildsList;