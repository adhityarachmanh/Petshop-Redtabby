import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { stylesCard, PROTECT_DATA } from "./data";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardIcon from "components/Card/CardIcon";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";
import Warning from "components/Typography/Warning";
import { handleNoSlug } from "store/Actions/formatShare";
import Swal from "sweetalert2";
import { Remove, ArrowBack } from "@material-ui/icons";
import { compose } from "redux";
import { connect } from "react-redux";
import { ADD_NEW_ITEM_SHOP } from "store/Actions/shopAction";
import { LinearProgress } from "@material-ui/core";
import { LOGOUT_ADMIN } from "store/Actions/authAction";
import { PIN_CONFIRMATION } from "store/Actions/pinConfirmation";

class AddItemShop extends React.Component {
  state = {
    data: {}
  };
  async handleUploadImage() {
    const { value: file } = await Swal.fire({
      title: "select image",
      input: "file",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload Image Item"
      },
      inputValidator: value => {
        if (!value) {
          return "Please Select Image";
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
              data: e.target.result,
              type: "upload",
              upload: file
            }
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  }
  async handleUrlImage() {
    const { value: url } = await Swal.fire({
      title: "input url image",
      input: "url",
      inputPlaceholder: "Enter the URL"
    });
    if (url) {
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          image: { data: url, type: "url" }
        }
      }));
    }
  }
  handleChange = e => {
    let id = e.target.id;
    let val = e.target.value;
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [id]: val
      }
    }));
  };
  handleRemoveImage = () => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        image: null
      }
    }));
  };

  handleSubmit = () => {
    if (PROTECT_DATA(this.state.data)) {
      PIN_CONFIRMATION(() =>
        Swal.fire({
          title: "Are You Sure?",
          type: "question",
          showCancelButton: true,
          cancelButtonColor: "red",
          confirmButtonColor: "green",
          confirmButtonText: "Add New Item !"
        }).then(res => {
          if (res.value) {
            this.props.ADD_NEW_ITEM_SHOP({
              ...this.state.data,
              category: this.props.match.params.category,
              history: this.props.history
            });
          }
        })
      );
    }
  };
  isNumberKey(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === "paste") {
      key = evt.clipboardData.getData("text/plain");
    } else {
      // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }
  render() {
    const { classes, match, progress, history, profile } = this.props;
    const { data } = this.state;
    return (
      <>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <h4 className={classes.whiteColor}>
                    Add New Item ({handleNoSlug(match.params.category)})
                  </h4>
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
                      <Warning>Uploading File ...</Warning>
                    </GridItem>
                  ) : (
                    <GridItem xs={12} sm={12} md={8}>
                      {!data.image ? (
                        <GridContainer justify="center">
                          <GridItem md={8}>
                            <Warning>Select Type Image</Warning>
                            <Button
                              onClick={() => this.handleUploadImage()}
                              block
                              round
                              size="sm"
                            >
                              Upload Image
                            </Button>

                            <Button
                              onClick={() => this.handleUrlImage()}
                              block
                              round
                              size="sm"
                            >
                              Url Image
                            </Button>
                          </GridItem>
                        </GridContainer>
                      ) : (
                        <>
                          <img
                            width="100%"
                            height="400"
                            src={data.image.data}
                          />
                          <Button
                            onClick={() => this.handleRemoveImage()}
                            color="danger"
                            justIcon
                            round
                          >
                            <Remove />
                          </Button>
                        </>
                      )}
                      <CustomInput
                        labelText="Product Name"
                        inputProps={{
                          type: "text",
                          id: "name",
                          onChange: this.handleChange
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />

                      <CustomInput
                        labelText="Product Price"
                        inputProps={{
                          type: "text",
                          id: "price",
                          onKeyPress: this.isNumberKey,
                          onChange: this.handleChange
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                      <CustomInput
                        labelText="Product Description"
                        inputProps={{
                          type: "text",
                          id: "description",
                          multiline: true,
                          rows: "4",
                          onChange: this.handleChange
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
                            round
                            onClick={this.handleSubmit}
                            color="success"
                          >
                            Add New Item
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
      </>
    );
  }
}
AddItemShop.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapDispatchToProps = dispatch => {
  return {
    ADD_NEW_ITEM_SHOP: DATA => dispatch(ADD_NEW_ITEM_SHOP(DATA)),
    LOGOUT_ADMIN: () => dispatch(LOGOUT_ADMIN())
  };
};
const mapStateToProps = state => {
  return {
    progress: state.shared.progress,
    profile: state.firebase.profile
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(stylesCard)
)(AddItemShop);
