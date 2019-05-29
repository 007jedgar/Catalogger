import React from 'react'
import {
  View,
  Text,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { CachedImage } from 'react-native-cached-image';

const EmptyCard = ({text}) => {
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.section}>
          <CachedImage
            source={require('../assets/icons/empty.png')}
            style={styles.imageStyle}
          />
          <Text style={styles.uhOhText}>
            {text}
          </Text>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  emptyContainer: {
    margin: '10@ms',
    paddingTop: '45@vs',
    paddingBottom: '40@vs',
  },
  uhOhText: {
    color: '#5E5999',
    fontFamily: 'Raleway-Regular',
    fontSize: '24@ms',
    margin: '20@ms',
    textAlign: 'center',
    alignSelf: 'center',
  },
  imageStyle: {
    width: '100@ms',
    height: '100@ms',
    alignSelf: 'center',
    // resizeMode: 'contain',
  },
  section: {
    padding: '3@ms',
    justifyContent: 'center',
    borderColor: '#ddd',
    position: 'relative',
  }
})

export { EmptyCard };