import { combineReducers } from 'redux';
import BreedsReducer from './BreedsReducer';
import FavoriteReducer from './FavoriteReducer';

export default combineReducers({
  breedList: BreedsReducer,
  favorites: FavoriteReducer
});
