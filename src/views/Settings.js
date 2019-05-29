import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  Block,
  BackNavBar
} from '../components'
import {
  scale,
  moderateScale,
  ScaledSheet
} from 'react-native-size-matters'
import Communications from 'react-native-communications';


class Settings extends Component {

  onCall = () => {
    Communications.phonecall('2259079616', true)
  }

  onText = () => {
    Communications.text('2259079616')
  }

  onEmail = () => {
    Communications.email(['jedgardev@gmail.com'], null, null, 'Hi Joneaux!', null)
  }

  render() {
    const { header, supportContact, supportLine, supportView} = styles
    return (
      <Block>
        <BackNavBar 
          title="Support" 
          titleViewStyle={{marginLeft: scale(-60), marginBottom: moderateScale(5)}}
        />

        <Text style={header}>Support/Questions/Bugs?</Text>

        <View style={supportView}>
          <Text style={supportLine}>Hi, I'm Jonathan. You can litterally call/text/email me and I'll do my best to help!</Text>

          <TouchableOpacity onPress={this.onCall}>
            <Text style={supportContact}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onText}>
            <Text style={supportContact}>Text</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onEmail}>
            <Text style={supportContact}>Email</Text>
          </TouchableOpacity>
        
        </View>
      </Block>
    )
  }
}

const styles = ScaledSheet.create({
    btn: {
    margin: '10@ms',
    marginTop: '0@ms',
    marginBottom: '10@ms',
    backgroundColor: '#F35F55',
    padding: '4@ms',
    paddingTop: '8@ms',
    paddingBottom: '8@ms',
    borderRadius: '3@ms',
  },
  btnText: {
    alignSelf: 'center',
    fontSize: '27@ms',
    fontFamily: 'RobotoSlab-Regular',
    color: '#fff'
  },
  header: {
    fontFamily: 'Raleway-Bold',
    fontSize: '33@ms',
    color: '#5E5999',
  },  
  supportView: {
    marginTop: '20%',
    margin: '10@ms',
  },
  supportContact: {
    textAlign: 'center',
    fontFamily: 'RobotoSlab-Bold',
    fontSize: '22@ms',
    color: '#5E5999',
    margin: '4@ms',
  },
  supportLine: {
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: '22@ms',
    color: '#5E5999',
    marginBottom: '5@ms',
  },
})

export default Settings