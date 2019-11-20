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
import { PIN_CONFIRMATION } from "store/Actions/pinConfirmation";

class TableItemShop extends React.Component {
  showImage = IMAGE => {
    Swal.fire({
      imageUrl: IMAGE,
      imageHeight: 400
    });
  };
  showDescription = DESCRIPTION => {
    Swal.fire({
      text: DESCRIPTION
    });
  };

  handleLinkEdit = ITEMD_ID => {
    this.props.history.push(
      "/admin/edit-item/" + this.props.match.params.category + "/" + ITEMD_ID
    );
  };
  handleDeleteItem = SHOP_DATA => {
    PIN_CONFIRMATION(() => {
      Swal.fire({
        title: "Are You Sure delete ?",
        text: "You won't be able revert " + SHOP_DATA.name + "!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(res => {
        if (res.value) {
          this.props.REMOVE_ITEM_SHOP(SHOP_DATA.id);
        }
      });
    });
  };
  render() {
    const {
      classes,
      tableData,
      tableHead,
      tableHeaderColor,
      marker,
      profile
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
                        <Button
                          onClick={() => this.showImage(rowData.image)}
                          color="info"
                          round
                          size="sm"
                        >
                          Show Image
                        </Button>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Button
                          onClick={() =>
                            this.showDescription(rowData.description)
                          }
                          color="info"
                          round
                          size="sm"
                        >
                          Show Description
                        </Button>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {"IDR " + formatIDR(rowData.price)}
                      </TableCell>

                      <TableCell className={classes.tableCell}>
                        {rowData.updated_at
                          ? moment(rowData.updated_at).format("llll")
                          : "no update"}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Button
                          style={{ marginRight: "5px" }}
                          onClick={() => this.handleLinkEdit(rowData.id)}
                          color="info"
                          round
                          justIcon
                          size="sm"
                        >
                          <Edit />
                        </Button>
                        <Button
                          style={{ marginLeft: "5px" }}
                          color="danger"
                          round
                          onClick={() => this.handleDeleteItem(rowData)}
                          justIcon
                          size="sm"
                        >
                          X
                        </Button>
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
TableItemShop.defaultProps = {
  tableHeaderColor: "gray"
};
TableItemShop.propTypes = {
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
    REMOVE_ITEM_SHOP: SHOP_ID => dispatch(REMOVE_ITEM_SHOP(SHOP_ID))
  };
};
const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    marker: state.shared.marker
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(tableStyle)
)(TableItemShop);
