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
class TableOrder extends React.Component {
  handleShowImage = IMAGE => {
    Swal.fire({
      imageUrl: IMAGE
    });
  };
  handleBank = bank => {
    const img = gambar => <img width="100" height="50" src={gambar} />;
    switch (bank) {
      case "bca":
        return img(require("assets/img/BCA.png"));
      case "bri":
        return img(require("assets/img/BRI.png"));
      default:
        return;
    }
  };
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
  handlePilihKurir = ORDER_DATA => {
    PIN_CONFIRMATION(() => this.SWAL_PILIH_KURIR(ORDER_DATA));
  };
  async SWAL_PILIH_KURIR(ORDER_DATA) {
    let JNE = require("assets/img/kurir/JNE.png");
    let TIKI = require("assets/img/kurir/TIKI.png");
    let TEMPALTE_GAMBAR = GAMBAR => `<img height="100" width="150" 
    src="${GAMBAR}"/>`;
    const inputOptions = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          JNE: TEMPALTE_GAMBAR(JNE),
          TIKI: TEMPALTE_GAMBAR(TIKI)
        });
      }, 1000);
    });

    const { value: KURIR } = await Swal.fire({
      title: "Pilih Kurir",
      input: "radio",
      inputOptions: inputOptions,
      inputValidator: value => {
        if (!value) {
          return "Anda Harus Memilih Kurir";
        }
      }
    });

    if (KURIR) {
      const TEMPLATE_SWAL = DATA =>
        Swal.fire({
          title: DATA.title,
          html: TEMPALTE_GAMBAR(DATA.gambar) + `<p>${DATA.text}<p>`,
          showCancelButton: true,
          cancelButtonText: "Batal",
          cancelButtonColor: "#ed1b24",
          confirmButtonText: "Ya, Pilih Kurir !"
        }).then(res => {
          if (res.value) {
            this.props.PILIH_KURIR({
              id: ORDER_DATA.id,
              kurir: KURIR
            });
          }
        });
      switch (KURIR) {
        case "JNE":
          TEMPLATE_SWAL({
            title: KURIR,
            text: "Anda Memilih Kurir " + KURIR + " ?",
            gambar: JNE
          });
          return;
        case "TIKI":
          TEMPLATE_SWAL({
            title: KURIR,
            text: "Anda Memilih Kurir " + KURIR + " ?",
            gambar: TIKI
          });
          return;
        default:
          return;
      }
    }
  }
  handleInputResi = DATA_ORDER => {
    PIN_CONFIRMATION(() => this.SWAL_INPUT_RESI(DATA_ORDER));
  };
  async SWAL_INPUT_RESI(DATA_ORDER) {
    let GAMBAR = require("assets/img/kurir/" + DATA_ORDER.kurir + ".png");
    const { value: resi } = await Swal.fire({
      title: "Input No Resi " + DATA_ORDER.kurir,
      html: `<img height="100" width="150" 
      src="${GAMBAR}"/>`,
      input: "text",
      inputPlaceholder: "Masukkan No resi " + DATA_ORDER.kurir
    });

    if (resi) {
      Swal.fire({
        title: "No Resi Sudah Benar?",
        text: "No Resi Akan Di Tambahkan Kedata Order",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Input No Resi!"
      }).then(result => {
        if (result.value) {
          this.props.INPUT_RESI({
            id: DATA_ORDER.id,
            resi: resi
          });
        }
      });
    }
  }
  render() {
    const {
      classes,
      tableData,
      tableHead,
      tableHeaderColor,
      marker,
      orderWaiting
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
                        {"IDR " + formatIDR(rowData.total)}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Button
                          onClick={() => this.handleShowImage(rowData.struk)}
                          color="info"
                          justIcon
                          round
                          size="sm"
                        >
                          <Photo />
                        </Button>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {this.handleBank(rowData.bank)}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {!rowData.kurir ? (
                          <Button
                            onClick={() => this.handlePilihKurir(rowData)}
                            round
                            color="info"
                            size="sm"
                          >
                            Pilih Kurir
                          </Button>
                        ) : (
                          <>
                            <img
                              width="150"
                              heigth="100"
                              style={{ cursor: "pointer" }}
                              onClick={() => this.handlePilihKurir(rowData)}
                              src={require(`assets/img/kurir/${rowData.kurir}.png`)}
                            />
                          </>
                        )}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {rowData.kurir ? (
                          rowData.no_resi ? (
                            <Link onClick={() => this.handleInputResi(rowData)}>
                              {rowData.no_resi}
                            </Link>
                          ) : (
                            <Button
                              onClick={() => this.handleInputResi(rowData)}
                              round
                              color="info"
                              size="sm"
                            >
                              Input No Resi
                            </Button>
                          )
                        ) : (
                          <Warning>Pilih Kurir Terlebih Dahulu</Warning>
                        )}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(rowData.created_at).format("llll")}
                      </TableCell>
                      {orderWaiting ? (
                        <TableCell className={classes.tableCell}>
                          <Button
                            type="button"
                            justIcon
                            onClick={() => this.handleTerimaOrder(rowData.id)}
                            round
                            color
                            color="success"
                          >
                            <Check />
                          </Button>
                        </TableCell>
                      ) : null}
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
TableOrder.defaultProps = {
  tableHeaderColor: "gray"
};
TableOrder.propTypes = {
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
    TERIMA_ORDER: ORDER_ID => dispatch(TERIMA_ORDER(ORDER_ID)),
    PILIH_KURIR: ORDER_DATA => dispatch(PILIH_KURIR(ORDER_DATA)),
    INPUT_RESI: ORDER_DATA => dispatch(INPUT_RESI(ORDER_DATA))
  };
};
export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(tableStyle)
)(TableOrder);
