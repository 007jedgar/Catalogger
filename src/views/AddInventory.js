import React, { Component } from 'react'
import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native'
import {
  ScaledSheet,
  moderateScale,
  scale,
} from 'react-native-size-matters'
import {
  Block,
  BackNavBar,
  InventoryCard,
} from '../components'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { 
  newItem, 
  updateInput, 
  clearInput,
  editItem 
} from '../actions';

class AddInventory extends Component {
  constructor(props) {
      super(props)

      this.state = {
        listImg: require('../assets/icons/camera.png'),
      }
  } 

  clearInput = () => {
    this.refs.childCard.clearText()
  }


  getInfo = () => {
    const { name, tags, imgUri, x, y, z } = this.props

    if (!name) {
      return alert('Please supply a name for the item')
    }
    let itemInfo = {}

    itemInfo = {
      name: name.name? name.name: name, 
      tags: tags.tags? tags.tags: tags, 
      imgUri: imgUri.imgUri? imgUri.imgUri: imgUri, 
      x: x.x? x.x: x, 
      y: y.y? y.y: y, 
      z: z.z? z.z: z,
    }

    return itemInfo
  }

  onAddAnother = () => {
    const listInfo = this.props.currentList
    let info = this.getInfo()

    this.props.newItem(info, listInfo)
    this.clearInput()
  }

  onFinish = () => {
    const listInfo = this.props.currentList
    let info = this.getInfo()
    console.log(info)
    let finish = true
    
    this.props.newItem(info, listInfo, finish)
    this.clearInput()
  }

  onEdit = () => {
    let { docRef } = this.props
    let item = this.getInfo()
    let finish = true 

    this.props.editItem(docRef, item, finish)
  }

  renderTotalItems() {
    const { itemText, itemContainer } = styles 
    if (this.state.itemNums) {
      return (
        <View style={itemContainer}>
          <Text style={itemText}>{this.state.itemNums} items in list</Text>
        </View>
      )
    }
  }

  renderEdits() {
    const { btn, btnText } = styles
    if (this.props.edits) {
      return (
        <TouchableOpacity onPress={this.onEdit} style={btn}>
          <Text style={[btnText, {color: '#5E5999'}]}>Edit Item</Text>
        </TouchableOpacity>
      )
    }
  }

  renderNewList() {
    const { btn, btnText } = styles
    if (!this.props.edits) {
      return (
        <View>
          <TouchableOpacity onPress={this.onAddAnother} style={btn}>
            <Text style={[btnText, {color: '#5E5999'}]}>Add Another Item</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={this.onFinish} style={btn}>
            <Text style={[btnText, {color: '#2A2D34'}]}>Finish List</Text>
          </TouchableOpacity>          
        </View>
      )
    }
  }

  render() {
    let addedStyle =  { borderWidth: moderateScale(2), 
      borderColor: '#6761A8', 
      marginBottom: moderateScale(5),
      padding: moderateScale(2),
      alignSelf: 'center',
     }
    let title = ''
    if (this.state.listImg == require('../assets/icons/camera.png')) {
      addedStyle = {}
    }
    if (this.props.edits) {
      title = 'Edit item'
    } else {
      title = 'Add Item'
    }

    return (
      <Block >
        <BackNavBar 
          title={title} 
          titleViewStyle={{marginLeft: scale(-60), marginBottom: moderateScale(5)}}
          drawerPress={() => Actions.popTo('inventoryList')}
        />

        {this.renderTotalItems()}

        <InventoryCard
          ref="childCard"
          {...this.props}
          x={this.props.x} 
          y={this.props.y} 
          z={this.props.z}
          imgUri={this.props.imgUri} 
          name={this.props.name} 
          tags={this.props.tags} 
          xTyped={(x) => this.props.updateInput({x})}
          yTyped={(y) => this.props.updateInput({y})}
          zTyped={(z) => this.props.updateInput({z})}
          nameTyped={(name) => this.props.updateInput({name})}
          tagsTyped={(tags) => this.props.updateInput({tags})}
          setUri={(imgUri) => this.props.updateInput({imgUri})}
        />

        {this.renderEdits()}
        {this.renderNewList()}

      </Block>
    )
  }
}

const styles = ScaledSheet.create({
  btn: {
    height: '60@ms',
  },
  btnText: {
    fontFamily: 'Raleway-Regular',
    fontSize: '25@ms',
    textAlign: 'center',
  },
  itemText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: '24@ms',
  },
  itemContainer: {
    height: '40@ms',
    backgroundColor: '#6761A8',
    justifyContent: 'center',
  }
})

const mapStateToProps = state => {
  const { 
    currentList,
    listImg,
    itemNums,
    name,
    tags,
    imgUri,
    docRef,
    x,
    y,
    z,
  } = state.inventory

  return {
    currentList,
    listImg,
    itemNums,
    docRef,
    name,
    tags,
    imgUri,
    x,
    y,
    z
  }
}

export default connect(mapStateToProps, {newItem, updateInput, clearInput, editItem})(AddInventory)
