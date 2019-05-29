import React from 'react';
import {
  StatusBar,
  Platform,
  View,
  Dimensions,
} from 'react-native';
import {
  ScaledSheet, moderateScale,
} from 'react-native-size-matters';

const AppStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

// const { width, height } = Dimensions.get('window');

let STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
let STATUSBAR_MARGIN = moderateScale(5)
const isIos = Platform.OS === 'ios';
const isIphoneX = isIos && Dimensions.get('window').height >= 810;
// const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

if (isIos && isIphoneX) {
  STATUSBAR_HEIGHT = moderateScale(40);
} else if (isIos) {
  STATUSBAR_HEIGHT = 20;
} else {
  STATUSBAR_HEIGHT = StatusBar.currentHeight;
}


const styles = ScaledSheet.create({
  statusBar: {
  height: STATUSBAR_HEIGHT,
  },
})

export default AppStatusBar;