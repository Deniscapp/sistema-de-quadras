import React from 'react'
import { View, Text, Image } from 'react-native';

const AppTitle = () => {
  return (
    <View style={{alignSelf: 'center', marginTop: 50, marginBottom: 30 }}>
      <Image style={{width: 180, height: 160, alignSelf: 'center'}} source={require('../assets/images/logo.png')} />
      <Text style={{ fontSize: 20, color: '#FFFF' }}> Sistema de Quadras - UFSCAR </Text>
    </View>
  )
}

export default AppTitle;
