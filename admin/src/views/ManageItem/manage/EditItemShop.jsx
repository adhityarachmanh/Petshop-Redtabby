import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import CardBody from "components/Card/CardBody";
import CustomInput from "components/CustomInput/CustomInput";
import { Image, ArrowBack, Remove } from "@material-ui/icons";
import Swal from "sweetalert2";
import Warning from "components/Typography/Warning";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Loading from "components/Loading/Loading";
import { stylesCard } from "./data";
import Button from "components/CustomButtons/Button";
import { EDIT_ITEM_SHOP } from "store/Actions/shopAction";
import { LinearProgress } from "@material-ui/core";
import { LOGOUT_ADMIN } from "store/Actions/authAction";
import { PIN_CONFIRMATION } from "store/Actions/pinConfirmation";

class EditItemShop extends React.Component {
  state = {
    data: null,
    kesalahan: 3
  };
  async handleEditGambar() {
    const inputOptions = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          url: "Image Url",
          upload: "Upload Image"
        });
      }, 1000);
    });

    const { value: mode } = await Swal.fire({
      title: "Select Type",
      input: "radio",
      inputOptions: inputOptions,
      confirmButtonText: "Next",
      inputValidator: value => {
        if (!value) {
          return "You need to choose something!";
        }
      }
    });

    if (mode === "url") {
      const { value: url } = await Swal.fire({
        title: "Input Link Url",
        input: "url"
      });
      if (url) {
        this.setState(prevState => ({
          data: {
            ...prevState.data,
            image: {
              data: url,
              type: "url"
            }
          }
        }));
      }
    } else if (mode === "upload") {
      const { value: file } = await Swal.fire({
        title: "Select Image",
        input: "file",
        inputAttributes: {
          accept: "image/*",
          "aria-label": "Upload Image Item"
        },
        inputValidator: value => {
          if (!value) {
            return "You need to Select Image!";
          }
        }
      });
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.setState(prevState => ({
            data: {
              ...prevState.data,
              image: {
                type: "upload",
                data: e.target.result,
                upload: file
              }
            }
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  }
  handleChange = evt => {
    let id = evt.target.id;
    let val = evt.target.value;
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [id]: val
      }
    }));
  };

  handleSubmit = () => {
    PIN_CONFIRMATION(() => {
      Swal.fire({
        title: "Are You Sure?",
        type: "question",
        showCancelButton: true,
        cancelButtonColor: "red",
        confirmButtonColor: "green",
        confirmButtonText: "Edit Item !"
      }).then(res => {
        if (res.value) {
          this.props.EDIT_ITEM_SHOP({
            newData: {
              ...this.state.data,
              updated_at: new Date().toISOString()
            },
            SHOP_ID: this.props.match.params.id,
            history: this.props.history,
            category: this.props.match.params.category,
            OLD_DATA: this.props.shop
          });
        }
      });
    });
  };
  render() {
    const { classes, shop, match, history, progress, profile } = this.props;
    const { data } = this.state;
    if (shop) {
      return (
        <div>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <h4 className={classes.whiteColor}>Edit Shop Item</h4>
                  </CardIcon>
                </CardHeader>
                <CardBody>
                  <GridContainer justify="center">
                    {progress && progress.status ? (
                      <GridItem xs={12} sm={12} md={8}>
                        <LinearProgress
                          variant="buffer"
                          value={progress.data}
                          valueBuffer={20}
                        />
                      </GridItem>
                    ) : (
                      <GridItem xs={12} sm={12} md={8}>
                        <img
                          onClick={() => this.handleEditGambar()}
                          style={{ cursor: "pointer" }}
                          height="400"
                          width="100%"
                          src={
                            data && data.image && data.image.data
                              ? data.image.data
                              : shop.image
                          }
                        />
                        {data && data.image && data.image.data ? (
                          <Button
                            onClick={() =>
                              this.setState(prevState => ({
                                data: {
                                  ...prevState.data,
                                  image: null
                                }
                              }))
                            }
                            color="danger"
                            justIcon
                            round
                          >
                            <Remove />
                          </Button>
                        ) : null}
                        <Warning>Click Image to Edit </Warning>
                        <CustomInput
                          labelText="Name"
                          inputProps={{
                            placeholder: "Name Product",
                            id: "name",
                            defaultValue: shop.name,
                            type: "text",
                            onChange: this.handleChange
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                        <CustomInput
                          labelText="Price"
                          inputProps={{
                            placeholder: "Price Product",
                            id: "price",
                            defaultValue: shop.price,
                            type: "text",
                            onChange: this.handleChange
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                        <CustomInput
                          labelText="Description"
                          inputProps={{
                            placeholder: "Description Product",
                            id: "description",
                            defaultValue: shop.description,
                            rows: "4",
                            onChange: this.handleChange,
                            multiline: true
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                            <Button
                              onClick={() =>
                                history.push(
                                  "/admin/manage-item/" + match.params.category
                                )
                              }
                              block
                              round
                              color="info"
                            >
                              <ArrowBack /> Back To Table
                            </Button>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <Button
                              block
                              className="pull-right"
                              onClick={() => this.handleSubmit()}
                              round
                              color="success"
                              disabled={data === null}
                            >
                              Edit Item
                            </Button>
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                    )}
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}
EditItemShop.prototypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProp) => {
  const shop = state.firestore.data.shop;

  const shop_id = ownProp.match.params.id;
  const findShopById = shop ? shop[shop_id] : null;

  return {
    shop: findShopById,
    progress: state.shared.progress,
    profile: state.firebase.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    EDIT_ITEM_SHOP: DATA => dispatch(EDIT_ITEM_SHOP(DATA)),
    LOGOUT_ADMIN: () => dispatch(LOGOUT_ADMIN())
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "shop" }]),

  withStyles(stylesCard)
)(EditItemShop);
