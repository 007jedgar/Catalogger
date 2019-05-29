import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native'
import {
  ScaledSheet, moderateScale 
} from 'react-native-size-matters'
import {
  Block
} from '../components'
import {
  Actions
} from 'react-native-router-flux'
import firebase from 'react-native-firebase'
import { CachedImage } from 'react-native-cached-image'

class Welcome extends Component {
  constructor(props) {
    super(props)

    this.state = {
      login: {},
      signup: {},
      showLogin: false,
      showSignup: false,
    }
  }

  componentDidMount() {
   
    const user = firebase.auth().currentUser
    if (!user) {
      return
    }

    Actions.inventoryList({ user })
  }


  render() {
    const { header } = styles
    return (
      <Block style={{justifyContent: 'space-between'}}>
        <Text style={header}>Catalog Your Furniture</Text>

        <CachedImage 
          source={require('../assets/icons/couch.png')} 
          style={{
            width: moderateScale(100),
            height: moderateScale(100),
            alignSelf: 'center',
          }} 
        />

        <View>
          <TouchableOpacity onPress={() => Actions.signup()} style={styles.btn}>
            <Text style={styles.btnText}>Login/Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.inventoryList()} style={styles.btn}>
            <Text style={styles.btnText}>Start</Text>
          </TouchableOpacity>
        </View>
      </Block>
    )
  }
}

const styles = ScaledSheet.create({
  header: {
    marginTop: '20%',
    marginBottom: '30@ms',
    marginLeft: '5@ms',
    fontSize: '25@ms',
    textAlign: 'center',
    fontFamily: 'RobotoSlab-Bold',
    color: '#5E5999'
  },
  btn: {
    margin: '5@ms',
    marginTop: '0@ms',
    backgroundColor: '#5533A1',
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
  formView: {
    margin: '20@ms'
  }
})

export default Welcome
