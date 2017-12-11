import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Content, Text, Button } from 'native-base';

class ConfirmationScreen extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
		headerLeft:null
	}
    
    render() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#FFFF' }} >
                <Image style={{width: 150, height: 150, marginBottom: 20 }} source={{ uri: 'http://imagespng.com/Data/DownloadLogo/Success-PNG-Image.png' }} />
                <Text 
                    numberOfLines={2} 
                    style={{ fontSize: 20, color: 'black', textAlign: 'center', marginBottom: 40 }}> 
                    Sua reserva foi confirmada com sucesso!
                </Text>

                <Button onPress={e => Actions.main()} style={{backgroundColor: '#54D0E0', marginBottom: 10, marginLeft: 20, marginRight: 20 }} block>
                    <Text style={{color: 'white'}}> Voltar ao inicio </Text>
                </Button>
            </View>
        )
    }
}

export default ConfirmationScreen;
