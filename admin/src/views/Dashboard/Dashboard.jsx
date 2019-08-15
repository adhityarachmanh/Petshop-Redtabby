import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Menu from "@material-ui/icons/Menu";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Warning from "components/Typography/Warning";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import TableWaitingConfirmation from "./sections/TableWaitingConfirmation";
import { Link } from "react-router-dom";
import moment from "moment";
import TableGrooming from "./sections/TableGrooming";

class Dashboard extends React.Component {
  render() {
    const {
      classes,
      shop,
      users,
      order,
      todayGrooming,
      grooming,
      history,
      orderSuccess,
      orderWaiting
    } = this.props;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>person</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>User Red Tabby</p>
                <h3 className={classes.cardTitle}>
                  {users && users.length + " User"}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Menu />
                  <Link to="/admin/manage-users">Manage User (Table)</Link>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Item Shop</p>
                <h3 className={classes.cardTitle}>
                  {shop && shop.length + " Item"}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Menu />
                  <Link onClick={() => history.push("/admin/manage-shop")}>
                    Manage Item Shop (Table)
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Order Success</p>
                <h3 className={classes.cardTitle}>
                  {orderSuccess && orderSuccess.length}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Menu />
                  <Link
                    onClick={() => history.push("/admin/manage-order-success")}
                  >
                    Manage Item Shop (Table)
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>
                  Waiting Cofirmation Order
                </p>
                <h3 className={classes.cardTitle}>
                  {orderWaiting && orderWaiting.length}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Menu />
                  <Link
                    onClick={() => history.push("/admin/manage-order-waiting")}
                  >
                    Manage Order (Table)
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>pets</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Grooming</p>
                <h3 className={classes.cardTitle}>
                  {grooming && grooming.length}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Menu />
                  <Link to="/admin/manage-grooming">Manage All Grooming (Table)</Link>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Waiting Confirmation</h4>
                <p className={classes.cardCategoryWhite}>Order With Struk</p>
              </CardHeader>
              <CardBody>
                {orderWaiting && orderWaiting.length > 0 ? (
                  <TableWaitingConfirmation
                    users={users}
                    tableHeaderColor="warning"
                    tableHead={["No", "Id Order", "Total", "Struk", "Tools"]}
                    tableData={orderWaiting}
                  />
                ) : (
                  <GridContainer justify="center">
                    <Warning>Not Availables</Warning>
                  </GridContainer>
                )}
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="rose">
                <h4 className={classes.cardTitleWhite}>Grooming </h4>
                <p className={classes.cardCategoryWhite}>
                  at today : {moment(new Date()).format("ll")}
                </p>
              </CardHeader>
              <CardBody>
                {todayGrooming && todayGrooming.length > 0 ? (
                  <TableGrooming
                    users={users}
                    tableHeaderColor="warning"
                    tableHead={["No", "User", "Time", "Phone", "Tools"]}
                    tableData={todayGrooming}
                  />
                ) : (
                  <GridContainer justify="center">
                    <Warning>Not Availables</Warning>
                  </GridContainer>
                )}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  const shop = state.firestore.ordered.shop;
  const order = state.firestore.ordered.order;
  const grooming = state.firestore.ordered.grooming;
  const users = state.firestore.ordered.users;
  const orderWaiting =
    order &&
    order.filter(d => {
      return d.struk && !d.status;
    });
  const orderSuccess =
    order &&
    order.filter(d => {
      return d.status;
    });
  const todayGrooming =
    grooming &&
    grooming.filter(d => {
      return (
        !d.status &&
        moment(d.tanggal).format("ll") === moment(new Date()).format("ll")
      );
    });
  return {
    shop: shop,
    order: order,
    orderWaiting: orderWaiting,
    orderSuccess: orderSuccess,
    users: users,
    grooming: grooming,
    todayGrooming: todayGrooming,
    auth: state.firebase.auth
  };
};
export default compose(
  withStyles(dashboardStyle),
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "shop" },
    { collection: "users" },
    { collection: "grooming", orderBy: ["tanggal", "asc"] },
    { collection: "order", orderBy: ["created_at", "desc"] }
  ])
)(Dashboard);
