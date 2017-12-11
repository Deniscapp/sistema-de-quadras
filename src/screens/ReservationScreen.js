import React, { Component } from "react";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";
import { Picker, Content, Item, Button, Text } from "native-base";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { connect } from "react-redux";
import {
  selectedDay,
  selectedSport,
  selectedTime,
  createReservation
} from "../actions/ReservationFormActions";
import { availableTimes } from "../utils/times";

class ReservationScreen extends Component {
  constructor(props) {
    super(props);

    this.handleSelectedDay = this.handleSelectedDay.bind(this);
    this.handleSportChanged = this.handleSportChanged.bind(this);
    this.handleTimeChanged = this.handleTimeChanged.bind(this);
  }

  handleSelectedDay(day) {
    this.props.selectedDay(day);
  }

  handleSportChanged(sport) {
    this.props.selectedSport(sport);
  }

  handleTimeChanged(sport) {
    this.props.selectedTime(sport);
  }

  renderTimes() {
    console.log(availableTimes);
    return availableTimes.forEach((elem, i) => {
      <Picker.Item label={i} value={i} />;
    });
  }

  render() {
    console.log(this.props);
    let _availableTimes = availableTimes.map((s, i) => {
        return <Picker.Item key={i} value={s} label={s} />
    });
    const { dateString, selected, sport, time } = this.props;
    return (
      <Content style={{ backgroundColor: "#FFFF" }}>
        <Calendar
          style={{ marginTop: 20 }}
          onDayPress={day => this.handleSelectedDay(day)}
          monthFormat={"MM yyyy"}
          onMonthChange={month => {
            console.log("month changed", month);
          }}
          markedDates={{ [dateString]: { selected } }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 20,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20
          }}
        >
          <Picker
            mode="dropdown"
            style={{ flex: 1, color: "black" }}
            selectedValue={sport}
            onValueChange={sport => this.handleSportChanged(sport)}
          >
            <Picker.Item label="Futebol" value="Futebol" />
            <Picker.Item label="Basquete" value="Basquete" />
            <Picker.Item label="Volei" value="Volei" />
            <Picker.Item label="Tênis" value="Tênis" />
          </Picker>
          <Picker
            mode="dropdown"
            style={{ flex: 1, color: "black" }}
            selectedValue={time}
            onValueChange={time => this.handleTimeChanged(time)}
          >
           {_availableTimes}
          </Picker>
        </View>
        <Button
          onPress={e => this.props.createReservation({ sport, time, dateString})}
          style={{
            backgroundColor: "#54D0E0",
            marginBottom: 10,
            marginLeft: 20,
            marginRight: 20
          }}
          block
        >
          <Text style={{ color: "white" }}> Efetuar Reserva </Text>
        </Button>
      </Content>
    );
  }
}

const mapStateToProps = state => {
  const { day, month, timestamp, dateString, selected, sport, time } = state.reservation;
  return { day, month, timestamp, dateString, selected, sport, time };
};

export default connect(mapStateToProps, {
  selectedDay,
  selectedSport,
  selectedTime,
  createReservation
})(ReservationScreen);
