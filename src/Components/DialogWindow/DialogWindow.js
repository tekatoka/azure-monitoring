import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/WarningRounded';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DataTable from "../DataTable/DataTable";

const DialogTitle = withStyles(theme => ({
    root: {
        //borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root + " dialog-title"}>
            <Typography variant="h4">{children}</Typography>
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        //borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogActions);



class DialogWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            fullWidth: true,
            maxWidth: 'lg',
        };
    }

  
    render() {
        return (
            <div>
                <Dialog
                    fullWidth={this.state.fullWidth}
                    maxWidth={this.state.maxWidth}
                    open={this.state.open}
                    onClose={this.props.handleOK}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.props.handleOK} className="dialog-title">
                        {this.props.title}
                    </DialogTitle>

                    <DialogContent className="dialog-content">
                            {this.props.text && this.props.text}
                            {this.props.tableData && <DataTable rows={this.props.tableData} type={this.props.type} />}
                    </DialogContent>
                    <DialogActions className="dialog-footer">
                        <Button onClick={this.props.handleOK} variant="contained" className="btn btn-primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default DialogWindow;