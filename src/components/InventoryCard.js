import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import {
    ScaledSheet,
    moderateScale
} from 'react-native-size-matters'
var ImagePicker = require("react-native-image-picker");
import {
  splitForm
} from '../stylesheets'
import { DimensionLine } from './DimensionLine';
import { TextLine } from './TextLine'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FastImage from 'react-native-fast-image'

var t = require('tcomb-form-native');
var Form = t.form.Form;

var info = t.struct({
  title: t.String,
  tags: t.maybe(t.String),
});


var options = {
  stylesheet: splitForm,
  i18n: {
    optional: '',
  },
  fields: {
    title: {
      label: 'Title',
    },
    tags: {
      label: 'Tags',
    },
  }
};

class InventoryCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      listImg: require('../assets/icons/camera.png'),
      itemNums: 0,
      name: props.name,
      tags: props.tags,
      imgUri: props.imgUri,
      x: props.x,
      y: props.y,
      z: props.z,
      picLoading: false,
    }
  }

  componentDidMount() {
    this.refs.xchildInput.onSet(this.props.x)
    this.refs.ychildInput.onSet(this.props.y)
    this.refs.zchildInput.onSet(this.props.z)
    this.refs.namechildInput.onSet(this.props.name)
    this.refs.tagschildInput.onSet(this.props.tags)
    if (this.props.imgUri) {
      this.setState({ listImg: {uri: this.props.imgUri} })
    }
  }

  clearText = () => {
    this.refs.xchildInput.onClear()
    this.refs.ychildInput.onClear()
    this.refs.zchildInput.onClear()
    this.refs.namechildInput.onClear()
    this.refs.tagschildInput.onClear()
    this.setState({ listImg: require('../assets/icons/camera.png') })
  }

  onGetImg = () => {
    this.setState({ picLoading: true })
    ImagePicker.showImagePicker((response) => {    
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
          picLoading: false
        })
        this.props.setUri(response.uri)
      }
      this.setState({ picLoading: false })
    })
  }

  renderDimensions() {
    const { dimensionConatiner } = styles
    return  (
      <View>
        <View style={dimensionConatiner}>
          <DimensionLine 
            ref="xchildInput"
            {...this.props}
            value={this.props.x}
            typed={(x) => this.props.xTyped(x)}
            placeholder=""
            title="X (width)"
            returnKeyType="next"
          />
          <DimensionLine 
            ref="ychildInput"
            {...this.props}
            value={this.props.y}
            typed={(y) => this.props.yTyped(y)}
            placeholder=""
            title="Y (height)"
            returnKeyType="next"
          />
          <DimensionLine 
            ref="zchildInput"
            {...this.props}
            value={this.props.z}
            typed={(z) => this.props.zTyped(z)}
            placeholder=""
            title="Z (depth)"
          />
        </View>
      </View>
    )
  }

  renderDeleteList() {
    if (this.props.isEditing) {
      return (
        <TouchableOpacity>
          <FastImage 
            source={require('../assets/icons/delete.png')}
            style={styles.pic}
          />
        </TouchableOpacity>
      )
    }
  }

  renderLoading() {
    if (this.state.picLoading) {
      return(
        <ActivityIndicator size="large" color="#0000ff" />
      )
    }
  }

  render() {
    const { midContainer, pic, cardContainer } = styles
    let addedStyle =  { 
      width: moderateScale(200),
      height: moderateScale(200),
      alignSelf: 'center',
    }
    if (this.state.listImg == require('../assets/icons/camera.png')) {
      addedStyle = {}
    }

    return (
      <KeyboardAwareScrollView>
        <View style={cardContainer}>
          <View style={midContainer}>

            <View style={{alignSelf: 'center'}}>
              <TouchableOpacity onPress={this.onGetImg}>
                <FastImage source={this.state.listImg} style={[pic, addedStyle]} />
              </TouchableOpacity>
              {this.renderLoading()}
            </View>

            <View>
              <View style={styles.titleContainer}>
                <TextLine
                  ref="namechildInput"
                  {...this.props} 
                  placeholder="Item Name"
                  typed={(name) => this.props.nameTyped(name)}
                  value={this.state.name}  
                />
              </View>
              
              <View style={styles.titleContainer}> 
                <TextLine 
                  ref="tagschildInput"
                  {...this.props}
                  placeholder={`Tags: "Dresser, storage"`}
                  typed={(tags) => this.props.tagsTyped(tags)}
                  value={this.state.value}
                />
              </View>
            </View>
          </View>
          
          {this.renderDimensions()}
        </View>  
      </KeyboardAwareScrollView>
    )
  }
}

const styles = ScaledSheet.create({
  pic: {
    width: '60@ms',
    height: '60@ms',
    marginBottom: '5@ms',
    alignSelf: 'center',
  },
  cardContainer: {
    margin: '10@ms',
  },
  midContainer: {
    // flexDirection: 'row'
  },
  dimensionConatiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '13@ms',
  },
  titles: {
    marginRight: moderateScale(2),
    fontSize: moderateScale(20),
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',

  },
  titleContainer: {
    margin: '5@ms',
    flexDirection: 'row'

  },
})

export {InventoryCard}