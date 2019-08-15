import React from "react";
import BG_MANAGE_AKUN from "../../assets/img/city-profile.jpg";

import moment from "moment";
// import { range } from "moment-range";
import "./calendar.css";
import Swal from "sweetalert2/dist/sweetalert2";
import { timeBooking } from "./data";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { tambahGrooming } from "../../store/action/groomingAction";
import { Redirect } from "react-router-dom";

class Grooming extends React.Component {
  weekdayshort = moment.weekdaysShort();

  state = {
    showYearTable: false,
    showMonthTable: false,
    showDateTable: true,
    inputTanggal: false,
    dateObject: moment(),
    allmonths: moment.months(),
    selectBooking: null,
    selectTime: null,
    inputForm: false
  };
  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };
  year = () => {
    return this.state.dateObject.format("Y");
  };
  currentDay = () => {
    return this.state.dateObject.format("D");
  };
  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject)
      .startOf("month")
      .format("d"); // Day of week 0...1..5...6
    return firstDay;
  };
  month = () => {
    return this.state.dateObject.format("MMMM");
  };
  showMonth = (e, month) => {
    this.setState({
      showMonthTable: !this.state.showMonthTable,
      showDateTable: !this.state.showDateTable
    });
  };
  setMonth = month => {
    let monthNo = this.state.allmonths.indexOf(month);
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showDateTable: !this.state.showDateTable
    });
  };
  MonthList = props => {
    let months = [];
    props.data.map(data => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={e => {
            this.setMonth(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let monthlist = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Month</th>
          </tr>
        </thead>
        <tbody>{monthlist}</tbody>
      </table>
    );
  };
  showYearTable = e => {
    this.setState({
      showYearTable: !this.state.showYearTable,
      showDateTable: !this.state.showDateTable
    });
  };

  onPrev = () => {
    let curr = "";
    if (this.state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.subtract(1, curr)
    });
  };
  onNext = () => {
    let curr = "";
    if (this.state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.add(1, curr)
    });
  };
  setYear = year => {
    // alert(year)
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("year", year);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showYearTable: !this.state.showYearTable
    });
  };
  onYearChange = e => {
    this.setYear(e.target.value);
  };
  getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray;
  }
  YearTable = props => {
    let months = [];
    let nextten = moment()
      .set("year", props)
      .add("year", 12)
      .format("Y");

    let tenyear = this.getDates(props, nextten);

    tenyear.map(data => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={e => {
            this.setYear(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let yearlist = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Yeah</th>
          </tr>
        </thead>
        <tbody>{yearlist}</tbody>
      </table>
    );
  };
  belowThisDay = d => {
    let booking = new Date();
    booking.setDate(d.d);
    booking.setMonth(d.m - 1);
    booking.setFullYear(d.t);

    if (booking < new Date()) {
      return "calendar-day empty";
    } else {
      return "calendar-day";
    }
  };

  onDayClick = (e, d) => {
    let booking = new Date();
    booking.setDate(d.d);
    booking.setMonth(d.m - 1);
    booking.setFullYear(d.t);

    if (booking < new Date()) {
      // Swal.fire({
      //   type: "error",
      //   title: "Oops...",
      //   text: "this date is below today!"
      // });
      return;
    }
    this.setState(
      {
        selectBooking: booking,
        inputTanggal: true
      },
      () => {
        // console.log("SELECTED DAY: ", this.state);
      }
    );
  };
  onTimeCLick = d => {
    const newDate = this.state.selectBooking;
    newDate.setHours(d.h);
    newDate.setMinutes(d.m);
    this.setState({
      selectBooking: newDate,
      selectTime: d.h + ":" + d.m
    });
  };
  manageWaktuTerbooking = d => {
    const { grooming } = this.props;
    const filterDate = this.state.selectBooking;
    filterDate.setHours(d.h);
    filterDate.setMinutes(d.m);
    filterDate.toISOString();
    const hasil =
      grooming &&
      grooming.filter(d => {
        return (
          moment(d.tanggal)
            .format("llll")
            .indexOf(moment(filterDate).format("llll")) > -1
        );
      });

    return hasil && hasil.length > 0 ? true : false;
  };
  manageWaktuBookignLewat = d => {
    const filterDate = this.state.selectBooking;
    filterDate.setHours(d.h);
    filterDate.setMinutes(d.m);

    if (filterDate.getTime() < new Date().getTime()) {
      return true;
    } else {
      return false;
    }
  };
  handleNextForm = () => {
    this.setState({
      inputForm: true
    });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleGrooming = () => {
    const { profile } = this.props;
    const { name, email, phone, message } = this.state;
    const newName =
      name !== null && name !== undefined && name !== "" ? name : profile.name;
    const newEmail =
      email !== null && email !== undefined && email !== ""
        ? email
        : profile.email;
    const newPhone =
      phone !== null && phone !== undefined && phone !== ""
        ? phone
        : profile.phone;
    const newMessage =
      phone !== null && message !== undefined && message !== "" ? message : "";
    if (newMessage === "") {
      Swal.fire({
        title: "Please Input Message",
        type: "error"
      });
      return;
    }
    const newData = {
      name: newName,
      email: newEmail,
      phone: newPhone,
      message: newMessage
    };

    let tanggalSkrg = this.state.selectBooking;
    const myGroomingExist =
      this.props.grooming &&
      this.props.grooming.filter(d => {
        return (
          d.uid === this.props.auth.uid &&
          moment(d.tanggal).format("ll") === moment(tanggalSkrg).format("ll")
        );
      }).length;

    if (myGroomingExist > 0) {
      Swal.fire({
        title: "You have booked on the same day!!!",
        type: "error",
        showCancelButton: true,
        confirmButtonText: "My Grooming!",
        cancelButtonText: "cancel"
      }).then(res => {
        if (res.value) {
          this.props.history.push("/manage-akun/my-grooming");
        }
      });
      return;
    }
    const filterDate = this.state.selectBooking;
    filterDate.setHours(this.state.selectTime.split(":")[0].toString());
    filterDate.setMinutes(this.state.selectTime.split(":")[1].toString());

    Swal.fire({
      title: "Are You Sure?",
      html: `<p>Your Booking At ${moment(filterDate).format("ll")} ${
        this.state.selectTime
      }</p>`,
      type: "question",
      showCancelButton: true
    }).then(res => {
      if (res.value) {
        this.props.tambahGrooming({
          tanggal: filterDate,
          uid: this.props.auth.uid,
          ...newData,
          history: this.props.history
        });
      }
    });
  };
  handleAlert = () => {
    Swal.fire({
      title: "This time is past the current time",
      type: "error"
    });
  };
  render() {
    let weekdayshortname = this.weekdayshort.map(day => {
      return <th key={day}>{day}</th>;
    });
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="calendar-day empty">{""}</td>);
    }
    //data penting
    let bulanIni = moment(new Date()).format("M");
    let tahunIni = moment(new Date()).format("Y");
    let selectBulan = moment(this.state.dateObject._d).format("M");
    let selectTahun = moment(this.state.dateObject._d).format("Y");

    let daysInMonth = [];

    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay =
        d == this.currentDay() &&
        selectBulan == bulanIni &&
        selectTahun == tahunIni
          ? "today"
          : "";
      let dateData = {
        d: d,
        m: selectBulan,
        t: selectTahun
      };

      daysInMonth.push(
        <td
          key={d}
          onClick={e => {
            this.onDayClick(e, dateData);
          }}
          className={`${this.belowThisDay(dateData)}   ${currentDay}`}
        >
          <span>{d}</span>
        </td>
      );
    }
    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        // let insertRow = cells.slice();
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });
    const { profile, auth } = this.props;
    if (!auth.uid) return <Redirect to="/login-page" />;
    return (
      <div class="page-header header-filter" style={styles}>
        <div class="container">
          <div class="row">
            <div className="col-lg-3">
              {this.state.selectBooking ? (
                <div className="card">
                  <div className="card-header card-header-rose">
                    <h3 className="card-title text-center">Note</h3>
                  </div>
                  <div className="card-body">
                    <table className="table responsive">
                      <tbody>
                        <tr>
                          <td>
                            {" "}
                            <button className="btn btn-success btn-sm" />
                          </td>
                          <td>:</td>
                          <td>Availables</td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            <button className="btn btn-danger btn-sm" />
                          </td>
                          <td>:</td>
                          <td>Time Passed</td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            <button className="btn btn-rose btn-sm" />
                          </td>
                          <td>:</td>
                          <td>Booked</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </div>

            <div class="col-lg-6 col-md-6 ml-auto mr-auto">
              <div class="card ">
                <div class="card-header card-header-rose text-center">
                  <h4 class="card-title">Set Date</h4>
                </div>
                <p class="description text-center">Red Taddy</p>
                <div class="card-body">
                  {!this.state.inputForm ? (
                    !this.state.inputTanggal ? (
                      <div className="tail-datetime-calendar">
                        <div className="calendar-navi">
                          <span
                            onClick={e => {
                              this.onPrev();
                            }}
                            class="calendar-button button-prev"
                          />
                          {!this.state.showMonthTable && (
                            <span
                              onClick={e => {
                                this.showMonth();
                              }}
                              class="calendar-label"
                            >
                              {this.month()}
                            </span>
                          )}
                          <span
                            className="calendar-label"
                            onClick={e => this.showYearTable()}
                          >
                            {this.year()}
                          </span>
                          <span
                            onClick={e => {
                              this.onNext();
                            }}
                            className="calendar-button button-next"
                          />
                        </div>

                        <div className="calendar-date">
                          {this.state.showYearTable && (
                            <this.YearTable props={this.year()} />
                          )}
                          {this.state.showMonthTable && (
                            <this.MonthList data={moment.months()} />
                          )}
                        </div>

                        {this.state.showDateTable && (
                          <div className="calendar-date">
                            <table className="calendar-day">
                              <thead>
                                <tr>{weekdayshortname}</tr>
                              </thead>
                              <tbody>{daysinmonth}</tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="row justify-content-center">
                          {" "}
                          <button
                            className="btn btn-danger btn-sm "
                            onClick={() =>
                              this.setState({
                                inputTanggal: false,
                                selectBooking: null,
                                selectTime: null
                              })
                            }
                          >
                            Reselect Date
                          </button>
                        </div>

                        <div className="row text-center ">
                          <div className="col-md-4">
                            <h3 className="title text-dark">Morning</h3>
                            {timeBooking.morning.map((d, i) => {
                              return (
                                <button
                                  key={i}
                                  onClick={
                                    !this.manageWaktuTerbooking(d) &&
                                    !this.manageWaktuBookignLewat(d)
                                      ? () => this.onTimeCLick(d)
                                      : this.manageWaktuBookignLewat(d)
                                      ? () => this.handleAlert()
                                      : null
                                  }
                                  className={`btn btn-${
                                    this.state.selectTime === d.h + ":" + d.m
                                      ? "info"
                                      : this.manageWaktuBookignLewat(d)
                                      ? "danger"
                                      : this.manageWaktuTerbooking(d)
                                      ? "rose"
                                      : "success"
                                  } btn-sm btn-block`}
                                >
                                  {d.h + ":" + d.m}
                                </button>
                              );
                            })}
                          </div>
                          <div className="col-md-4">
                            <h3 className="title text-dark">Afternoon</h3>
                            {timeBooking.afternoon.map((d, i) => {
                              return (
                                <button
                                  key={i}
                                  onClick={
                                    !this.manageWaktuTerbooking(d) &&
                                    !this.manageWaktuBookignLewat(d)
                                      ? () => this.onTimeCLick(d)
                                      : this.manageWaktuBookignLewat(d)
                                      ? () => this.handleAlert()
                                      : null
                                  }
                                  className={`btn btn-${
                                    this.state.selectTime === d.h + ":" + d.m
                                      ? "info"
                                      : this.manageWaktuBookignLewat(d)
                                      ? "danger"
                                      : this.manageWaktuTerbooking(d)
                                      ? "rose"
                                      : "success"
                                  } btn-sm btn-block`}
                                >
                                  {d.h + ":" + d.m}
                                </button>
                              );
                            })}
                          </div>
                          <div className="col-md-4">
                            <h3 className="title text-dark">Evening</h3>
                            <p className="text-center">Not Availables</p>
                          </div>
                        </div>
                      </>
                    )
                  ) : (
                    <>
                      <div className="row justify-content-center">
                        <button
                          className="btn btn-danger btn-sm "
                          onClick={() =>
                            this.setState({
                              inputForm: false
                            })
                          }
                        >
                          Reselect Time
                        </button>
                      </div>
                      <form>
                        <div className="form-group">
                          <label htmlFor="">Name</label>
                          <input
                            id="name"
                            type="text"
                            className="form-control"
                            defaultValue={profile.name}
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Email</label>
                          <input
                            id="email"
                            type="text"
                            defaultValue={profile.email}
                            className="form-control"
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Phone Number</label>
                          <input
                            id="phone"
                            type="text"
                            defaultValue={profile.phone}
                            className="form-control"
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Add Your Message</label>
                          <textarea
                            id="message"
                            onChange={this.handleInputChange}
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 ml-auto mr-auto">
              <div class="card ">
                <div class="card-header card-header-rose text-center">
                  <h4 class="card-title">Grooming</h4>
                </div>
                <p class=" text-center">2 hr | Rp 150.000</p>
                <div className="container">
                  <hr />

                  <div class="card-body">
                    <p className="text-left">
                      <span>
                        {this.state.selectBooking ? (
                          <i className="material-icons">date_range</i>
                        ) : null}
                        {this.state.selectBooking &&
                          moment(this.state.selectBooking).format("ll")}
                      </span>
                    </p>
                    <p className="text-left">
                      {this.state.selectTime ? (
                        <i className="material-icons">access_time</i>
                      ) : null}
                      {this.state.selectTime && this.state.selectTime}
                    </p>
                    {this.state.selectTime ? (
                      <p className="text-justify">
                        Professional Cat Groomer Available in our place or
                        door-to-door service
                      </p>
                    ) : (
                      <p className="text-justify">
                        Available in our place or door-to-door service
                      </p>
                    )}
                  </div>
                  <div class="footer text-center">
                    {!this.state.inputForm ? (
                      <button
                        disabled={
                          this.state.selectBooking !== null &&
                          this.state.selectTime !== null
                            ? false
                            : true
                        }
                        className="btn btn-rose btn-sm btn-block"
                        onClick={this.handleNextForm}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        className="btn btn-rose btn-sm btn-block"
                        onClick={this.handleGrooming}
                      >
                        Book It
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const styles = {
  backgroundImage: `url('${BG_MANAGE_AKUN}')`
};
const mapStateToProps = state => {
  const grooming = state.firestore.ordered.grooming;
  return {
    grooming: grooming,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    tambahGrooming: data => dispatch(tambahGrooming(data))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "grooming" }])
)(Grooming);
