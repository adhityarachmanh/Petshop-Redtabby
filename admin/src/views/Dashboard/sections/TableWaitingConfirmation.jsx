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
import { formatIDR } from "store/Actions/formatShare";
import Swal from "sweetalert2/dist/sweetalert2";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { TERIMA_ORDER } from "store/Actions/orderAction";
import { PIN_CONFIRMATION } from "store/Actions/pinConfirmation";

class TableWaitingConfirmation extends React.Component {
  handleShowStruk = d => {
    Swal.fire({
      title: "Struk",
      imageUrl: d,
      imageWidth: 400,
      imageHeight: 400
    });
  };
  handleInfoOrder = data => {};
  handleTerimaOrder = ORDER_ID => {
    PIN_CONFIRMATION(() => {
      Swal.fire({
        title: "Are You Sure?",
        type: "question",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Terima"
      }).then(res => {
        if (res.value) {
          this.props.TERIMA_ORDER(ORDER_ID);
        }
      });
    });
  };
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
                      <Link onClick={() => this.handleInfoOrder(prop)}>
                        {prop.id}
                      </Link>
                    </TableCell>

                    <TableCell className={classes.tableCell}>
                      {"IDR " + formatIDR(prop.total)}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Button
                        onClick={() => this.handleShowStruk(prop.struk)}
                        type="button"
                        justIcon
                        round
                        color
                        color="info"
                      >
                        <Image />
                      </Button>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Button
                        type="button"
                        justIcon
                        onClick={() => this.handleTerimaOrder(prop.id)}
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

TableWaitingConfirmation.defaultProps = {
  tableHeaderColor: "gray"
};

TableWaitingConfirmation.propTypes = {
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
    TERIMA_ORDER: ORDER_ID => dispatch(TERIMA_ORDER(ORDER_ID))
  };
};
export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(tableStyle)
)(TableWaitingConfirmation);
