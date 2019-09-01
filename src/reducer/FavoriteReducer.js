import AsyncStorage from '@react-native-community/async-storage';
import {
  SET_FAVORITE,
  REMOVE_FAVORITE,
  LOAD_FAVORITES
} from '../actions/types';

const INITIAL_STATE = {
  favoriteList: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_FAVORITES:
      return { favoriteList: action.payload };  
    case SET_FAVORITE:
      const favoriteListAdd = [...state.favoriteList, action.payload];
      AsyncStorage.setItem('@favoriteBreeds', JSON.stringify(favoriteListAdd));
      return { favoriteList: favoriteListAdd };
    case REMOVE_FAVORITE:
      const favoriteListRemove = state.favoriteList.filter(breedName => breedName !== action.payload);
      AsyncStorage.setItem('@favoriteBreeds', JSON.stringify(favoriteListRemove));
      return { favoriteList: favoriteListRemove };
    default:
      return state;
  }
};
