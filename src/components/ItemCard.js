import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator
} from 'react-native'
import {
  ScaledSheet,
} from 'react-native-size-matters'
import FastImage from 'react-native-fast-image'

class ItemCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      deleting: false,
      info: true,
      finished: false,
      loading: true
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ finished: true }), 600)
  }

 
  toggle = () => {
    this.setState({ 
      deleting: !this.state.deleting,
      info: !this.state.info
    })
  }

  onDelete = () => {
    this.props.deleteItem(this.props.item)
  }

  itemPressed = () => {
    const { name, tags, imgURL, x, y ,z, docRef } = this.props.item
    let _item = {
      name, tags, imgUri: imgURL, x, y ,z, docRef
    }

    this.props.setItem(_item)
  }

  renderDelete() {
    if (this.state.deleting) {
      return (
        <TouchableOpacity onPress={this.onDelete} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      )
    }
  }

  renderInfo() {
    const { nameStyle, dimensionsStyle } = styles
    const { name, x, y, z } = this.props.item
    let dimensions = x && y && z? `${x}x${y}x${z}`:'';
    if (!x && !y) {
      dimensions = ''
    } else if (!z) {
      dimensions = `${x}x${y}`
    }

    if (this.state.info) {
      return (
        <View>
          <Text style={nameStyle}>{name}</Text>
          <Text style={dimensionsStyle}>{dimensions}</Text>
        </View>
      )
    }
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <ActivityIndicator 
          size="large"
          color="#fff"
        />
      )
    }
  }

  renderImg() {
    const { img } = styles
    const { imgURL } = this.props.item
    const pic =  imgURL? {uri: imgURL} : require('../assets/icons/couch.png')
    if (this.state.finished) {
      return (
        <View style={{flexDirection: 'row', flex: 1, backgroundColor: '#fff'}}>
          <FastImage 
            source={pic} 
            style={img}
            onProgress={() => this.setState({ loading: true })}
            onLoadEnd={() => this.setState({ loading: false })}
          />
          
        </View>
      )
    }
  }

  render() {
    const { cardContainer } = styles

    return (
      <TouchableWithoutFeedback onPress={this.itemPressed} style={{flex: 1}}>
        <View style={cardContainer}> 

          {this.renderImg()}
          {this.renderLoading()}
          {this.renderInfo()}
          {this.renderDelete()}
        </View>   
      </TouchableWithoutFeedback>
    )
  } 
}

const styles = ScaledSheet.create({
  cardContainer: {
    flex: .5,
    margin: '4@ms',
    borderColor: '#5E5999',
    borderWidth: '2@ms',
    borderRadius: '3@ms',
    backgroundColor: '#5E5999',
  },
  img: {
    flex: 1,
    height: '130@ms'
  },
  nameStyle: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: '20@ms',
    color: '#fff',
    textAlign: 'center',
  },
  dimensionsStyle: {
    fontFamily: 'Roboto-Medium',
    fontSize: '20@ms',
    color: '#fff',
    textAlign: 'center',
  },
  deleteBtn: {
    backgroundColor: '#FB4A4D',
    padding: '2@ms',
  },
  deleteText: {
    fontFamily: 'Roboto-Medium',
    fontSize: '24@ms',
    color: '#fff',
    textAlign: 'center',
  },
})
 
export { ItemCard }