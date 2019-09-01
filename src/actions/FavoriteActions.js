import AsyncStorage from '@react-native-community/async-storage';
import {
  SET_FAVORITE,
  REMOVE_FAVORITE,
  LOAD_FAVORITES
} from './types';

export const loadFavorites = () => {
  return async dispatch => {
    const favoriteBreeds = await AsyncStorage.getItem('@favoriteBreeds')
    if (favoriteBreeds) {
      dispatch({ type: LOAD_FAVORITES, payload: JSON.parse(favoriteBreeds) });
    }
  }
}

export const setFavorite = breedName => {
  return { type: SET_FAVORITE, payload: breedName };
}

export const removeFavorite = breedName => {
  return { type: REMOVE_FAVORITE, payload: breedName };
}
