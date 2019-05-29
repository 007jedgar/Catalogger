import React, { Component } from 'react'
import {
  View,
  FlatList
} from 'react-native'
import {
  ScaledSheet,
  scale,
  moderateScale
} from 'react-native-size-matters'
import {
  Block,
  NavBar,
  AddBtn,
  EmptyCard,
  InventoryListCard,
} from '../components'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import {
  getInventoryLists,
  setCurrentList,
  getUser
} from '../actions'

class InventoryList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editing: false,
    }
  }

  componentDidMount() {
    this.props.getUser()
    // this.props.getInventoryLists(this.props.uuid)
  }

  onEdit = () => {
    console.log('editing')
    this.setState({ editing: !this.state.editing })
  }

  renderList() {
    if (this.props.inventoryLists.length < 1 ) {
      return (
        <EmptyCard text="Add a List and start documenting your stuff."/>
      )
    }
    console.log(this.state.editing)
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.props.inventoryLists}
          renderItem={({item}) => (
            <InventoryListCard 
              inventory={item}
              onSelect={(item) => {
                this.props.setCurrentList(item)
              }}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    )
  }

  render() {
    const { header } = styles
    return (
      <Block>
        <NavBar 
          settings 
          settingsPressed={() => Actions.settings()}
          title="Your Stuff"
          titleViewStyle={{marginLeft: scale(-40), marginBottom: moderateScale(5)}}
        />

        {this.renderList()}

        <AddBtn onPressed={() => Actions.newList()}/>
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
    textAlign: 'center',
  },
  btn: {
    alignSelf: 'center',
    margin: '5@ms',
    backgroundColor: '#5533A1',
    padding: '4@ms',
    borderRadius: '5@ms',
    width: '120@ms',
  },
  btnText: {
    alignSelf: 'center',
    fontSize: '22@ms',
    color: '#fff'
  },
})

const mapStateToProps = state => {
  const { inventoryLists } = state.inventory
  const { uuid } = state.auth

  return {
    inventoryLists,
    uuid
  }
}

export default connect(mapStateToProps, {getInventoryLists, setCurrentList, getUser})(InventoryList)
