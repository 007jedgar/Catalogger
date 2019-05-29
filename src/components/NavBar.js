import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import {CachedImage} from 'react-native-cached-image';
import { Actions } from 'react-native-router-flux';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bottonRow: props.bottomRow,
      isConnected: true,
    }
  }

  renderSettings() {
    if (this.props.settings) {
      return (
        <TouchableOpacity onPress={() => this.props.settingsPressed()}>
          <CachedImage 
            source={require('../assets/icons/settings.png')} 
            style={{
              width: moderateScale(30),
              height: moderateScale(30),
              marginLeft: moderateScale(5)
            }} 
          />
        </TouchableOpacity>
      )
    }
  }

  renderBottomRow() {
    const { secondRow } = this.props;
    if (this.props.bottomRow) {
      return (
        <View style={styles.bottomView}>
          {secondRow}
        </View>
      );
    }
  }

  renderBackBtn() {
    if (this.props.backBtn) {
      return (
        <TouchableOpacity onPress={() => Actions.pop()}>
          <View style={styles.btnViewStyle}>
            <CachedImage
              source={require('../assets/icons/backArrow.png')}
              style={styles.backBtnStyle}
            />
          </View>
        </TouchableOpacity>
      )
    }
  }

  render() {
    const {
       titleStyle, titleView,
      container, optionText, optionView, top } = styles;
    const {
      rightBtn, optionPress, title, style,
       } = this.props;

    return (
      <View style={[container, style]}>

        <View style={top}>

          {this.renderBackBtn()}
          {this.renderSettings()}

          <View style={titleView}>
            <Text style={[titleStyle, this.props.titleViewStyle]}>{title}</Text>
          </View>

          {<TouchableOpacity style={optionView} onPress={optionPress}>
            <Text style={optionText}>{rightBtn}</Text>
          </TouchableOpacity>}

        </View>

        {this.renderBottomRow()}

      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#FFF3F7',
    shadowOffset: {width: 3, height: 3},
    shadowColor: '#393939',
    shadowOpacity: .3,
    marginBottom: '4@vs',
    justifyContent: 'center',
    paddingTop: '10@ms',
  },
  top: {
    flexDirection: 'row',
    minHeight: '40@ms',
  },
  titleView: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  titleStyle: {
    fontSize: '26@ms',
    color: 'dimgrey',
    fontFamily: 'Raleway-SemiBold',
    alignSelf: 'center',
    textAlign: 'center'
  },
  optionText: {
    fontSize: '22@ms',
    fontFamily: 'Raleway-Regular',
    color: 'dimgrey',
    alignSelf: 'flex-end',
    margin: '5@ms',
  },
  optionView: {
    marginRight: '10@s',
    position: 'absolute',
    alignSelf: 'flex-end',
    margin: '5@ms',
    right: '10@ms',
  },
  bottomView: {
    marginBottom: '5@ms',
    height: '40@ms',
  },
  backBtnStyle: {
    width: '44@ms',
    height: '44@ms',
    padding: '10@ms',
    position: 'absolute',
    alignSelf: 'flex-start',
    marginBottom: '15@ms',
    top: moderateScale(-3),
  },
  btnViewStyle: {
    position: 'absolute',
    alignSelf: 'flex-start',
    width: '44@ms',
    height: '44@ms',
    borderWidth: '1@ms',
    borderColor: '#000'
  },
  networkAlert: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: '2@ms',
  },
  networkText: {
    alignSelf: 'center',
    color: 'dimgrey',
    fontSize: moderateScale(16),
    fontFamily: 'Roboto-Medium',
  },
})

export { NavBar };