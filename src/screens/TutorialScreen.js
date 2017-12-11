import React, { Component } from 'react';
import { Button, Text } from 'native-base'
import { Actions } from 'react-native-router-flux';
import { View, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../styles/slider';
import styles, { colors } from '../styles/index';
import AppTitle from '../components/AppTitle';

class TutorialScreen extends Component {
  constructor(props) {
    super(props)

    this._onPress = this._onPress.bind(this);

    this.state = { backgroundColor: '', buttonText: 'Iniciar Tutorial', tutorial: false, entries: [{
        title: 'Na palma de sua mão',
        img: 'https://image.freepik.com/free-photo/hand-holding-a-smartphone-with-blank-screen_1232-1091.jpg',
        text: 'Faça as reservas de quadra para o esporte que desejar, sem maiores complicações'
    },
    {
        title: 'Reservas com antecêdencia',
        img: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-128.png',
        text: 'Se programe com antecêdencia de acordo com seus interesses'
    },
    {
        title: 'Começar',
        img: 'http://downloadicons.net/sites/default/files/start-button-icon-94999.png',
        text: 'Pronto para começar? Vamos iniciar'
    }], activeSlide: 0, colors: ['#2999A7','#1E9FAA','#1D939D', '#1E7D88', '#2E7088', '#2A7D9A', '#2B86A1'] }
  }

  _renderItem({ item, index }) {
    return (
          <View style={[{alignSelf: 'center', marginTop: 50, marginBottom: 20, alignItems: 'center', width: 300 }]}>
            <Text style={{textAlign: 'center', fontSize: 25, marginBottom: 20, color: 'black' }}> {item.title} </Text>
            <Image style={{width: 180, height: 180, marginBottom: 20 }} source={{ uri: item.img }} />
            <Text numberOfLines={2} style={{ fontSize: 15, color: 'black', textAlign: 'center', alignItems: 'center' }}> {item.text} </Text>
          </View>
        );
  }


  get pagination () {
      const { entries, activeSlide } = this.state;
      return (
          <Pagination
            dotsLength={entries.length}
            activeDotIndex={activeSlide}
            dotStyle={styles.paginationDot}
            inactiveDotStyle={{
                // Define styles for inactive dots here
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
      );
  }


  _renderCarousel() {
    if(this.state.tutorial) {
      return (
        <View>
            <Carousel
                data={this.state.entries}
                renderItem={this._renderItem}
                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                sliderWidth={sliderWidth}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                itemWidth={300}
              />
              { this.pagination }
        </View>
      )
    }

    return <AppTitle />
  }

  _onPress() {
    if (this.state.tutorial) {
      Actions.auth();
      return;
    }

    this.setState({ tutorial: true, buttonText: 'Continuar', backgroundColor: 'white' })
  }

  render() {
    return (
      <LinearGradient style={{ flex: 1 }} colors={['#2999A7','#1E9FAA','#1D939D', '#1E7D88', '#2E7088', '#2A7D9A', '#2B86A1']}>
        <View style={{ backgroundColor: this.state.backgroundColor, justifyContent: 'space-between', flexDirection: 'column', flex: 1 }}>
          {this._renderCarousel()}
          <Button onPress={this._onPress} style={{position: 'relative', backgroundColor: '#54D0E0', marginBottom: 20, marginLeft: 20, marginRight: 20 }} block>
              <Text style={{color: 'white'}}>{this.state.buttonText}</Text>
            </Button>
        </View>
      </LinearGradient>
    )
  }
}

export default TutorialScreen;
