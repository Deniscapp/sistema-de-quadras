import React, { Component } from "react";
import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import moment from 'moment';
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  RefreshControl
} from "react-native";
import { connect } from "react-redux";
import {
  Text,
  ListItem,
  List,
  Body,
  Right,
  CheckBox,
  Fab,
  Container
} from "native-base";
import Icons from "react-native-vector-icons/MaterialIcons";
import { fetchMyReservations } from "../actions/MyReservationsActions";

class MyReservationsScreen extends Component {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);

    this.state = { refreshing: true, checks: [] };
  }

  componentDidMount() {
    this.props.fetchMyReservations();
  }

  componentWillReceiveProps({ reservations }) {
    if (reservations !== this.props.reservations)
      this.setState({ refreshing: false });
  }

  onRefresh() {
    this.setState({ refreshing: true }, () => {
      this.props.fetchMyReservations();
    });
  }

  handleCheckbox() {

  }

  renderItem({ item }) {
    console.log(item);
    return (
      <ListItem style={{ marginLeft: -5 }} noBorder>
        <Body style={styles.bodyStyle}>
          <View>
            <Text note>
              Dia: {moment(item.dateString).format("DD/MM/YYYY")} / Hora: {item.time}
            </Text>
            <Text note>Esporte: {item.sport} </Text>
          </View>
          <View style={styles.checkboxStyle}>
            <CheckBox value={item.key} onPress={this.handleCheckbox.bind(this)} />
          </View>
        </Body>
      </ListItem>
    );
  }

  render() {
    console.log(this.props);
    return (
      <Container style={{ backgroundColor: "white" }}>
        <FlatList
          refreshControl={
            <RefreshControl
              progressViewOffset={-5}
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          keyExtractor={item => item.key}
          data={this.props.reservations}
          extraData={this.state}
          renderItem={this.renderItem.bind(this)}
        />

        <Fab
          containerStyle={{}}
          style={{ backgroundColor: "#C42633" }}
          position="bottomRight"
        >
          <Icons onPress={() => Actions.newReservation()} name="add" />
        </Fab>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { loader, reservations } = state.myReservations;
  return { loader, reservations };
};

const styles = StyleSheet.create({
  checkboxStyle: {
    alignItems: "flex-end",
    flex: 1,
    marginRight: 10
  },
  bodyStyle: {
    flexDirection: "row"
  }
});

export default connect(mapStateToProps, { fetchMyReservations })(
  MyReservationsScreen
);
