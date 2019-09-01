import React from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ListItem, MenuBar, Spinner } from './common';
import { getBreeds, loadFavorites, setFavorite, removeFavorite } from '../actions';

class BreedList extends React.Component {
  state = { showOnlyFavorites: false }

  componentDidMount() {
    this.props.getBreeds();
    this.props.loadFavorites();
  }

  changeFavorite(isFavorite, name) {
    if (isFavorite) {
      this.props.removeFavorite(name);
    } else {
      this.props.setFavorite(name);
    }
  }

  getBreedsToDisplay() {
    const { list, favoriteList } = this.props;
    if (!this.state.showOnlyFavorites) {
      return list;
    }

    return list.filter(breed => !!favoriteList.find(name => name === breed.name));
  }

  renderList() {
    const breedsToDisplay = this.getBreedsToDisplay();
    if (!breedsToDisplay || !breedsToDisplay.length) {
      const { centralizedMessage, messageText } = styles;
      return <View style={centralizedMessage}><Text style={messageText}>There are no breeds to show.</Text></View>
    }

    const { favoriteList } = this.props;

    return (
      <FlatList
        data={breedsToDisplay}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const isFavorite = !!favoriteList.find(breed => breed === item.name);
          return (
            <ListItem
              text={item.name}
              isFavorite={isFavorite}
              onPress={() => Actions.breed({ title: item.name, breedName: item.name, originalName: item.originalName })}
              onFavorite={this.changeFavorite.bind(this, isFavorite, item.name)}
            />
          )
        }}
      />
    );
  }

  render() {
    const { loading, error } = this.props;
    const { centralizedMessage, messageText, container } = styles;

    if (loading) {
      return <Spinner />
    }

    if (error) {
      return <View style={centralizedMessage}><Text style={messageText}>There was an error fetching the breed list.</Text></View>
    }

    return (
      <View style={container}>
        <MenuBar buttons={[
          { text: 'All Breeds', isSelected: !this.state.showOnlyFavorites, onPress: () => this.setState({ showOnlyFavorites: false }) },
          { text: 'Favorite Breeds', isSelected: this.state.showOnlyFavorites, onPress: () => this.setState({ showOnlyFavorites: true }) }
        ]} />
        {this.renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centralizedMessage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  messageText: {
    fontSize: 18
  }
});

const mapStateToProps = state => {
  const { loading, error, list } = state.breedList;
  const { favoriteList } = state.favorites;
  return { loading, error, list, favoriteList };
};

export default connect(mapStateToProps, { getBreeds, loadFavorites, setFavorite, removeFavorite })(BreedList);