import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import {
  Block,
  BackNavBar,
  EmptyCard,
  ItemCard,
  EditBtn,
} from '../components'
import { connect } from 'react-redux'
import {
  getItems,
  deleteItem,
  setItem,
} from '../actions'
import { 
  moderateScale,
  scale,
  ScaledSheet,
} from 'react-native-size-matters';
import { Actions } from 'react-native-router-flux';
var _ = require('lodash')

class ItemsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showOptions: false 
    }
  }

  componentDidMount() {
    this.props.getItems(this.props.currentList.docRef)
  }

  toggleOptions = () => {
    this.setState({ showOptions: !this.state.showOptions })
  }

  deleteItem = (item) => {
    this.props.deleteItem(item.docRef)
  }

  setItem = (_item) => {
    this.props.setItem(_item)
  }

  renderItemsList() {
    const { list } = this.props
    if (this.props.itemsInList.length < 1) {
      return (
        <EmptyCard text={`There are currently no items in your ${list.name} catalog.`} />
      )
    }

    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <FlatList
          ref="REF-FLATLIST"
          data={this.props.itemsInList}
          renderItem={({item}) => (
            <ItemCard 
              ref={(ref) => this.itemRef = {...this.itemRef, [`REF-FLATLIST${item.id}`]: ref}}
              {...this.props}
              item={item}
              deleteItem={this.deleteItem}
              setItem={this.setItem}
            />
          )}
          numColumns={2}
          keyExtractor={(item) => item.id}
        />
      </View>
    )
  }

  renderOptions() {
    if (this.state.showOptions) {
      return (
        <View style={styles.optionContainer}>
          <TouchableOpacity 
            onPress={() => Actions.addInventory()} 
            style={styles.options}
          >
            <Text style={styles.optionText}>Add Furniture</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.options}
            onPress={() => _.forEach(this.itemRef, (r) => {
              if (r) {
                r.toggle()
              }
            })}
          >
            <Text style={styles.optionText}>Remove Furniture</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    return (
      <Block>
        <BackNavBar 
          title={this.props.list.name}
          titleText={{fontSize: moderateScale(23)}}
          titleViewStyle={{marginLeft: scale(10), marginBottom: moderateScale(5)}}
          settings
          settingsPressed={() => Actions.listSettings({docRef: this.props.list.docRef})}
        />

        {this.renderItemsList()}

        {this.renderOptions()}
        <EditBtn onPressed={this.toggleOptions}/>
      </Block>
    )
  }
}

const styles = ScaledSheet.create({
  options: {
    backgroundColor: '#fff',
    borderColor: '#5E5999',
    borderWidth: '2@ms',
    padding: '2@ms',
  },
  optionText: {
    color: '#2A2D34',
    fontFamily: 'Roboto-Medium',
    fontSize: '23@ms',
  },
  optionContainer: {
    position: 'absolute',
    bottom: '10@ms',
    left: '70@ms',
    alignSelf: 'flex-end',
  },
})

const mapStateToProps = state => {
  const { currentList, itemsInList } = state.inventory
  const { uuid } = state.auth

  return {
    uuid,
    itemsInList,
    currentList
  }
}

export default connect(mapStateToProps, {getItems, deleteItem, setItem})(ItemsList)