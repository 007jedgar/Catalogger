import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import {
  ScaledSheet,
} from 'react-native-size-matters';
import { thisExpression } from '@babel/types';

class DimensionLine extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  sendData(text) {
    this.setState({ text });
    this.props.typed(text);
  }

  onClear = () => {
    this._textInput.setNativeProps({text: ''})
  }

  onSet = (text) => {
    this._textInput.setNativeProps({ text })
  }

  render() {
    const { inputStyle, placeholder, input, keyboardType, title } = this.props;
    return (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          ref={component => this._textInput = component}
          style={[styles.input, inputStyle]}
          onChangeText={(text) => this.sendData(text)}
          value={input}
          placeholder={placeholder}
          autoCapitalize="sentences"
          keyboardType="numbers-and-punctuation"
          returnKeyType={this.props.returnKeyType}
        />
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  input: {
    width: '100%',
    height: '30@ms',
    fontFamily: 'Roboto-Regular',
    fontSize: '23@ms',
  },
  title: {
    fontSize: '17@ms',
    fontFamily: 'RobotoSlab-Regular'
  },
  container: {
    marginLeft: '10@ms',
    marginRight: '10@ms',
    marginBottom: '30@ms',
    borderBottomWidth: '4@ms',
    borderColor: '#5E5999',
    justifyContent: 'center',
  },
});

export { DimensionLine };