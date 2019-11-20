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
  TableBody
} from "@material-ui/core";

import Button from "components/CustomButtons/Button";
import { formatIDR } from "store/Actions/formatShare";
import { Edit, Photo, Check } from "@material-ui/icons";
import Swal from "sweetalert2";
import moment from "moment";
import { PIN_CONFIRMATION } from "store/Actions/pinConfirmation";
import { compose } from "redux";
import { connect } from "react-redux";
import { TERIMA_ORDER } from "store/Actions/orderAction";
import { PILIH_KURIR } from "store/Actions/orderAction";
import Warning from "components/Typography/Warning";
import { INPUT_RESI } from "store/Actions/orderAction";
import { Link } from "react-router-dom";
import { TERIMA_GROOMING } from "store/Actions/groomingAction";
import Success from "components/Typography/Success";
class TableManageGrooming extends React.Component {
  FILTER_HARI_INI = (TANGGAL_GROOMING, ID) => {
    const filter =
      moment(TANGGAL_GROOMING).format("ll") ===
        moment(new Date().toISOString()).format("ll") &&
      moment(TANGGAL_GROOMING).format("LT") <
        moment(new Date().toISOString()).format("LT")
        ? true
        : false;

    return { filter: filter, ID: ID, TANGGAL_GROOMING: TANGGAL_GROOMING };
  };
  TERIMA_BOOKING = DATA => {
    switch (DATA.filter) {
      case true:
        PIN_CONFIRMATION(() =>
          Swal.fire({
            title: "Customer Come?",
            type: "question",
            showCancelButton: true
          }).then(res => {
            if (res.value) {
              this.props.TERIMA_GROOMING(DATA.ID);
            }
          })
        );
        return;
      case false:
        Swal.fire({
          title: "Action Failed",
          type: "warning",
          text:
            "Waktu Grooming " +
            moment(DATA.TANGGAL_GROOMING).format("LT") +
            " dibawah waktu saat ini " +
            moment(new Date()).format("LT")
        });
        return;
      default:
        return;
    }
  };
  render() {
    const {
      classes,
      tableData,
      tableHead,
      tableHeaderColor,
      marker,
      users
    } = this.props;
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
                        {rowData.name}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {rowData.phone}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(rowData.tanggal).format("llll")}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {rowData.status ? <Success>Grooming Success</Success> : (
                          <Button
                            onClick={() =>
                              this.TERIMA_BOOKING(
                                this.FILTER_HARI_INI(
                                  rowData.tanggal,
                                  rowData.id
                                )
                              )
                            }
                            size="sm"
                            justIcon
                            round
                            color="success"
                          >
                            <Check />
                          </Button>
                        )}
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
TableManageGrooming.defaultProps = {
  tableHeaderColor: "gray"
};
TableManageGrooming.propTypes = {
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
const mapDispatchToProps = dispatch => {
  return {
    TERIMA_GROOMING: GROOMING_ID => dispatch(TERIMA_GROOMING(GROOMING_ID))
  };
};
export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(tableStyle)
)(TableManageGrooming);
