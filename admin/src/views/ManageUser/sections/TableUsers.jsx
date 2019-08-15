import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles
} from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Loading from "components/Loading/Loading";
import Button from "components/CustomButtons/Button";
import { formatIDR } from "store/Actions/formatShare";
import { Edit } from "@material-ui/icons";
import Swal from "sweetalert2";
import { compose } from "redux";
import { connect } from "react-redux";
import { REMOVE_ITEM_SHOP } from "store/Actions/shopAction";
import moment from "moment";
import { LOGOUT_ADMIN } from "store/Actions/authAction";
import { PIN_CONFIRMATION } from "store/Actions/pinConfirmation";
import Warning from "components/Typography/Warning";

class TableUsers extends React.Component {
  handleShowImage = IMAGE => {
    Swal.fire({
      imageUrl: IMAGE
    });
  };
  render() {
    const {
      classes,
      tableData,
      tableHead,
      tableHeaderColor,
      marker
    } = this.props;
    let noImage =
      "https://www.sprayandwash.co.nz/wp-content/uploads/2018/12/person-icon-white-png-1.png";
    return (
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
              <TableRow className={classes.tableRow}>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      key={key}
                      className={
                        classes.tableCell + " " + classes.tableHeadCell
                      }
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData
              ? tableData.map((rowData, key) => {
                  return (
                    <TableRow
                      style={{
                        background:
                          marker && marker.id === rowData.id ? "#70c2ad" : null
                      }}
                      className={classes.tableBodyRow}
                    >
                      <TableCell className={classes.tableCell}>
                        {key + 1}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {rowData.photoURL !== noImage ? (
                          <Button
                            onClick={() =>
                              this.handleShowImage(rowData.photoURL)
                            }
                            round
                            size="sm"
                            color="info"
                          >
                            Show Image
                          </Button>
                        ) : <Warning>No Image</Warning>}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {rowData.name}
                      </TableCell>

                      <TableCell className={classes.tableCell}>
                        {rowData.email}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {rowData.address?rowData.address:<Warning>No Address</Warning>}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {rowData.phone?rowData.phone:<Warning>No Phone</Warning>}
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </div>
    );
  }
}
TableUsers.defaultProps = {
  tableHeaderColor: "gray"
};
TableUsers.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(tableStyle)(TableUsers);
