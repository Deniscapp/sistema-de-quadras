import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginScreen from './screens/LoginScreen';
import TutorialScreen from './screens/TutorialScreen';
import MyReservationsScreen from './screens/MyReservationsScreen';
import ReservartionScreen from './screens/ReservationScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';

class RouterComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
        <Scene key='root' hideNavBar>
          <Scene inital key='tutorial' component={TutorialScreen} hideNavBar />
          <Scene key='auth' >
            <Scene key='login' component={LoginScreen} hideNavBar />
          </Scene>
          <Scene key='main'>
            <Scene inital key='reservations' renderLeftButton={()=>(null)}  title='Minhas Reservas'  component={MyReservationsScreen} />
            <Scene key='newReservation'  title='Nova Reserva' component={ReservartionScreen} />
            <Scene key='confirmation' title='Confirmação' component={ConfirmationScreen} />
          </Scene>
        </Scene>
      </Router>
    );
  }
}


export default RouterComponent;
