import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import {
    ScaledSheet, moderateScale, scale
} from 'react-native-size-matters'
import {
    Block, BackNavBar
} from '../components'
import { formStyle } from '../stylesheets';
import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';
import {
  newList
} from '../actions'
var ImagePicker = require("react-native-image-picker");
import FastImage from 'react-native-fast-image'

var t = require('tcomb-form-native');
var Form = t.form.Form;

var User = t.struct({
  name: t.String,
  description: t.maybe(t.String),
});

var options = {
  stylesheet: formStyle,
  fields: {
    name: {
      label: 'List Name',
      placeholder: 'Living Room',
    },
    description: {
      label: 'Description',
      placeholder: 'Possible items for living room',
      keyboardType: 'email-address',
    },
  }
};


class NewList extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      listImg: require('../assets/icons/camera.png'),
      value: {}
    }
  }

  componentDidMount() {
    console.log(this.props.currentList)
  }

  onGetImg = () => {
    this.setState({ picLoading: true })

    ImagePicker.showImagePicker((response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
         // or const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          listImg: source,
          listData: response.uri,
          picLoading: false,
        })
      }
      this.setState({ picLoading: false })
    })
  }

  onChange = (i) => {
    this.setState({ value: i })
  }

  onNext = () => {
    const { listData } = this.state
    const { name, description } = this.state.value
    let listInfo = { listImg: listData, name, description, createdBy: this.props.uuid }
    console.log(listInfo)
    this.props.newList(listInfo)
  }

  renderLoading() {
    if (this.state.picLoading) {
      return(
        <ActivityIndicator size="large" color="#0000ff" />
      )
    }
  }


  render() {
    const { formView, pic, nextbtn, nextBtnText } = styles
    let addedStyle =  { borderWidth: moderateScale(2), 
      borderColor: '#6761A8', 
      marginBottom: moderateScale(5),
      padding: moderateScale(2),
      alignSelf: 'center',
     }
    if (this.state.listImg == require('../assets/icons/camera.png')) {
      addedStyle = {}
    }
    
    return (
      <Block >
        <BackNavBar title="New List" 
          titleViewStyle={{marginLeft: scale(-60), marginBottom: moderateScale(5)}}
        />

        <KeyboardAwareScrollView  style={formView}>
          <TouchableOpacity onPress={this.onGetImg} style={{marginBottom: moderateScale(20)}}>
            <FastImage source={this.state.listImg} style={[pic, addedStyle]} />
            {this.renderLoading()}
            <Text style={{textAlign: 'center'}}>Inventory List Photo (Optional)</Text>
          </TouchableOpacity>
          
          <Form
            ref="form"
            type={User}
            options={options}
            value={this.state.value}
            onChange={this.onChange}
          />
        </KeyboardAwareScrollView>

        <TouchableOpacity style={nextbtn} onPress={this.onNext}>
          <Text style={nextBtnText}>Next</Text>
        </TouchableOpacity>
      </Block>
    )
  }
}

const styles = ScaledSheet.create({
  formView: {
    margin: '10@ms',
    marginRight: '20@ms',
  },
  pic: {
    width: '100@ms',
    height: '100@ms',
    alignSelf: 'center',
  },
  nextbtn: {
    backgroundColor: '#5533A1',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '8%',
    justifyContent: 'center',
  },
  nextBtnText: {
    color: '#fff',
    fontSize: '26@ms',
    fontFamily: 'RobotoSlab-Regular',
    textAlign: 'center',
  },
})

const mapStateToProps = state => {
  const { currentList } = state.inventory
  const { uuid } = state.auth

  return {
    currentList,
    uuid,
  }
}

export default connect(mapStateToProps, {newList})(NewList)
