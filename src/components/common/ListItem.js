import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Images from '../../../assets';

const ListItem = ({ text, isFavorite, onPress, onFavorite }) => {
  const { mainViewStyle, rowStyle, favoriteStyle } = styles;
  return (
    <View style={mainViewStyle}>
      <TouchableOpacity style={rowStyle} onPress={onPress}>
        <Text>{text}</Text>
        <TouchableOpacity onPress={onFavorite}>
          <Image style={favoriteStyle} source={(isFavorite ? Images.favorite : Images.notFavorite)} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  mainViewStyle: {
    borderColor: '#eaeaea',
    borderBottomWidth: 1,
    height: 60,
    padding: 10,
    justifyContent: 'center'
  },
  rowStyle: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textStyles: {
    fontSize: 17
  },
  favoriteStyle: {
    height: 35,
    width: 35
  }
};

export { ListItem };