import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { CachedImage } from 'react-native-cached-image';

const EditBtn = ({ onPressed,  }) => {
    const { img, container } = styles
    return (
        <TouchableOpacity onPress={onPressed} style={container}>
            <CachedImage source={require('../assets/icons/edit.png')} style={img} />
        </TouchableOpacity>
    )
}

const styles = ScaledSheet.create({
    container: {
        position: 'absolute',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        borderColor: '#5533A1',
        borderWidth: '2@ms',
        borderRadius: '20@ms',
        justifyContent: 'center',
        backgroundColor: '#fff',
        right: 20,
        bottom: 20,
    },
    img: {
        width: '40@ms',
        height: '40@ms',
    }
})

export {EditBtn}