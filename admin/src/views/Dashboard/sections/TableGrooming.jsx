import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from "@material-ui/core";

//icons
import Image from "@material-ui/icons/Image";
import Check from "@material-ui/icons/Check";
// core components
import Button from "components/CustomButtons/Button.jsx";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import Swal from "sweetalert2/dist/sweetalert2";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import { TERIMA_GROOMING } from "store/Actions/groomingAction";
import { PIN_CONFIRMATION } from "store/Actions/pinConfirmation";
import { firestoreConnect } from "react-redux-firebase";
import UserInfo from "./UserInfo";

class TableGrooming extends React.Component {
  handleShowStruk = d => {
    Swal.fire({
      title: "Struk",
      imageUrl: d,
      imageWidth: 400,
      imageHeight: 400
    });
  };

  handleTerimaGrooming = prop => {
    if (new Date().getTime() < new Date(prop.tanggal).getTime()) {
      Swal.fire({
        title: "Action Failed",
        text:
          "Tidak Bisa Menerima Grooming Apabila Waktu Sekarang di Bawah " +
          moment(prop.tanggal).format("LT"),
        type: "warning"
      });
      return;
    }
    PIN_CONFIRMATION(() =>
      Swal.fire({
        title: "Customer Sudah Datang?",
        type: "question",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Process !"
      }).then(res => {
        if (res.value) {
          this.props.TERIMA_GROOMING(prop.id);
        }
      })
    );
  };
  handleDataUser = () => {};
  render() {
    const { classes, tableHead, tableData, tableHeaderColor } = this.props;

    return (
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
              <TableRow className={classes.tableHeadRow}>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={
                        classes.tableCell + " " + classes.tableHeadCell
                      }
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData &&
              tableData.map((prop, key) => {
                return (
                  <TableRow key={key} className={classes.tableBodyRow}>
                    <TableCell className={classes.tableCell}>
                      {key + 1}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <UserInfo uid={prop.uid} />
                    </TableCell>

                    <TableCell className={classes.tableCell}>
                      {moment(prop.tanggal).format("LT")}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {prop.phone}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Button
                        type="button"
                        justIcon
                        onClick={() => this.handleTerimaGrooming(prop)}
                        round
                        color
                        color="success"
                      >
                        <Check />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

TableGrooming.defaultProps = {
  tableHeaderColor: "gray"
};

TableGrooming.propTypes = {
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
)(TableGrooming);
