import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
  Alert,
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
import { connect } from 'react-redux'
import {
  deleteItemList
} from '../actions'

class ListSettings extends Component {

  delete = () => {
    Alert.alert(
      'Delete the entire list?',
      'Are you sure you want to delete the list and all your stuff inside?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.props.deleteItemList(this.props.docRef, this.props.uuid)},
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <Block style={{justifyContent: 'space-between'}}>
        <BackNavBar 
          title="Settings" 
          titleViewStyle={{marginLeft: scale(-60), marginBottom: moderateScale(5)}}
        />

          <TouchableOpacity onPress={this.delete} style={styles.btn}>
            <Text style={styles.btnText}>Delete List</Text>
          </TouchableOpacity>
      </Block>
    )
  }
}

const styles = ScaledSheet.create({
    btn: {
    margin: '5@ms',
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
})

const mapStateToProps = state => {
  const { uuid } = state.auth

  return {
      uuid
  }
}

export default connect(mapStateToProps, {deleteItemList})(ListSettings)