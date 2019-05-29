import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native'
import {
  ScaledSheet 
} from 'react-native-size-matters'
import {
  Block,
  BackNavBar
} from '../components'
import {
  Actions
} from 'react-native-router-flux'
import firebase from 'react-native-firebase'
import { formStyle } from '../stylesheets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

var t = require('tcomb-form-native');
var Form = t.form.Form;

var Signup = t.struct({
  name: t.String,
  email: t.String,
  password: t.String,
});

var Login = t.struct({
  email: t.String,
  password: t.String,
});


var options = {
  stylesheet: formStyle,
  i18n: {
    optional: '',
    required: ' '
  },
  fields: {
    name: {
      label: 'Name',
    },
    email: {
      label: 'Email',
    },
    password: {
      label: 'Password',
    },
  }
};

class Welcome extends Component {
  constructor(props) {
    super(props)

    this.state = {
      login: {},
      signup: {},
      showLogin: false,
      showSignup: true,
      formState: 'Sign up'
    }
  }

  animateForm() {
    const createPropery = {
      type: 'spring',
      springDamping: 0.5,
      property: 'opacity',
    }

    const updatePropery = {
      type: 'spring',
      springDamping: 0.9,
      property: 'opacity',
    }

    const deletePropery = {
      type: 'spring',
      springDamping: .9,
      property: 'opacity',
    }

    const animationConfig = {
      duration: 300,
      create: createPropery,
      update: updatePropery,
      delete: deletePropery,
    };

    LayoutAnimation.configureNext(animationConfig);
  }

  componentDidMount() {
    const user = firebase.auth().currentUser
    if (!user) {
      return
    }

    Actions.inventoryList({ user })
  }

  componentWillUpdate() {
    this.animateForm()
  }

  renderLogin() {
    if (this.state.showLogin) {
      return (
        <View style={styles.formView}>
          <Form 
            ref="form"
            type={Login}
            value={this.state.login}
            options={options}
          />
           <TouchableOpacity onPress={this.toggleSignup}>
              <Text style={styles.subheader}>Sign up</Text>
          </TouchableOpacity>         
        </View>
      )
    }
  }

  renderSignup() {
    if (this.state.showSignup) {
      return (
        <View style={styles.formView}>
          <Form 
            ref="form"
            type={Signup}
            value={this.state.signup}
            options={options}
          />

          <TouchableOpacity onPress={this.toggleSignup}>
              <Text style={styles.subheader}>Login to a current account</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  toggleSignup = () => {
    let formState = !this.state.showSignup? 'Sign up': 'Login'
    this.setState({ 
      showSignup: !this.state.showSignup,
      showLogin: !this.state.showLogin,
      formState  
    })
  }

  render() {
    const { header } = styles
    return (
      <Block >
        <BackNavBar />

        <KeyboardAwareScrollView>
          <Text style={header}>{this.state.formState}</Text>

          {this.renderSignup()}
          {this.renderLogin()}

          <TouchableOpacity onPress={() => Actions.inventoryList()} style={styles.btn}>
            <Text style={styles.btnText}>{this.state.formState}</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>

      </Block>
    )
  }
}

const styles = ScaledSheet.create({
  header: {
    marginTop: '24@ms',
    marginBottom: '30@ms',
    marginLeft: '5@ms',
    fontSize: '25@ms',
    fontFamily: 'Raleway-Bold',
    textAlign: 'center',
    color: '#6761A8',
  },
  subheader: {
    marginTop: '14@ms',
    marginLeft: '5@ms',
    fontSize: '20@ms',
    textAlign: 'center',
    color: '#6761A8',
  },
  btn: {
    margin: '5@ms',
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
