import React from 'react'
import {
    View,
    Dimensions
} from 'react-native'
import {
    ScaledSheet
} from 'react-native-size-matters'


const Block = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      {props.children}
    </View>
  )
}

const styles = ScaledSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#FFF3F7',
    paddingBottom: '10@ms',
  }
})

export {Block}