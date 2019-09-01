import React from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Spinner } from './common';
import { getBreedImages } from '../actions';

class BreedData extends React.Component {
  componentDidMount() {
    this.props.getBreedImages(this.props.originalName);
  }

  renderImages(breed) {
    const { imageStyle } = styles;
    
    if (breed.images) {
      return breed.images.map((image, index) => {
        return <Image key={index.toString()} source={{ uri: image }} style={imageStyle} />
      });
    }
  }

  render() {
    const { list, breedName } = this.props;
    const breed = list.find(breed => breed.name === breedName);
    const { viewStyles, textStyle } = styles;

    if (!breed.images && breed.imagesLoading) {
      return <View style={viewStyles}><Spinner /></View>
    }

    if (!breed.images && breed.imagesError) {
      return <View style={viewStyles}><Text styles={textStyle}>{breed.imagesError}</Text></View>
    }

    return (
      <ScrollView styles={{ flex: 1 }}>
        {this.renderImages(breed)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 22
  },
  imageStyle: {
    height: 500,
    width: 500,
    marginVertical: 10
  }
});

const mapStateToProps = state => {
  const { list } = state.breedList;
  return { list };
}

export default connect(mapStateToProps, { getBreedImages })(BreedData);