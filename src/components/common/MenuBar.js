import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const MenuBar = ({ buttons }) => {
  const { mainViewStyle } = styles;
  return (
    <View style={mainViewStyle}>
      {
        buttons.map(button => {
          const { text, isSelected, onPress } = button;
          return <MenuItem key={text} text={text} onPress={onPress} isSelected={isSelected} />
        })
      }
    </View>
  );
};

const MenuItem = ({ text, isSelected, onPress }) => {
  const { menuItemStyle, selectedMenuItemStyle, textStyle } = styles;
  const itemStyle = isSelected ? { ...menuItemStyle, ...selectedMenuItemStyle } : menuItemStyle

  return (
    <TouchableOpacity style={itemStyle} onPress={onPress}>
      <View>
        <Text style={textStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = {
  mainViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    height: 60,
    elevation: 3
  },
  menuItemStyle: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d46a0',
  },
  selectedMenuItemStyle: {
    borderColor: '#4a76bd',
    borderBottomWidth: 2
  },
  textStyle: {
    fontSize: 18,
    color: '#ffffff'
  }
};

export { MenuBar };