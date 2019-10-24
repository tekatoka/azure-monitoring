import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import dateFormat from 'dateformat';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  headerCell: {
    fontSize: "2rem",
    fontWeight: "bold"
  },
  cell: {
    fontSize: "2rem"
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            
            {props.type == "current" ?
            <TableRow className={classes.cell}>
                <TableCell key="hNr" style={{ width: "10px" }} >#</TableCell>
                <TableCell key="hName" style={{ minWidth: "100px" }} >Name</TableCell>
                <TableCell key="hBuildNumber" style={{ minWidth: "100px" }} >Build Number</TableCell>
                <TableCell key="hStartTime" style={{ minWidth: "100px" }} >Start Time</TableCell>
                <TableCell key="hStatus" style={{ minWidth: "100px" }} >Status</TableCell>
            </TableRow>
            :
            <TableRow className={classes.cell}>
                <TableCell key="hNr" style={{ width: "10px" }} >#</TableCell>
                <TableCell key="hName" style={{ minWidth: "100px" }} >Name</TableCell>
                <TableCell key="hBuildNumber" style={{ minWidth: "100px" }} >Build Number</TableCell>
                <TableCell key="hStartTime" style={{ minWidth: "100px" }} >Start Time</TableCell>
                <TableCell key="hFinishTime" style={{ minWidth: "100px" }} >Finish Time</TableCell>
                <TableCell key="hStatus" style={{ minWidth: "100px" }} >Status</TableCell>
            </TableRow>
            }
            
          </TableHead>
          <TableBody>
            {props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                
                props.type == "current" ?

                <TableRow className={classes.cell} hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell key="name" align="left">
                        {index + 1}
                    </TableCell>
                    <TableCell key="name" align="left">
                        {row.definition.name}
                    </TableCell>
                    <TableCell key="buildNumber" align="left">
                        {row.buildNumber}
                    </TableCell>
                    <TableCell key="buildNumber" align="left">
                      {dateFormat(row.startTime, "dd.mm.yyyy, HH:MM:ss")}
                    </TableCell>
                    <TableCell key="status" align="left">
                    {row.status}
                    </TableCell>
                </TableRow>

                :

                <TableRow className={classes.cell} hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell key="name" align="left">
                        {index + 1}
                    </TableCell>
                    <TableCell key="name" align="left">
                        {row.name}
                    </TableCell>
                    <TableCell key="buildNumber" align="left">
                        {row.latestOutcome.buildNumber}
                    </TableCell>
                    <TableCell key="startTime" align="left">
                        {dateFormat(row.latestOutcome.startTime, "dd.mm.yyyy, HH:MM:ss")}
                    </TableCell>
                    <TableCell key="finishTime" align="left">
                        {dateFormat(row.latestOutcome.finishTime, "dd.mm.yyyy, HH:MM:ss")}
                    </TableCell>
                    <TableCell key="result" align="left">
                        <Fab
                            variant="extended"
                            size="small"
                            className={clsx("statusLabel", row.latestOutcome.result)}                           
                            >
                            {row.latestOutcome.result}
                        </Fab>
                    </TableCell>
                </TableRow>

                )}
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
