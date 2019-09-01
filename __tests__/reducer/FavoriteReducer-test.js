import FavoriteReducer from '../../src/reducer/FavoriteReducer';
import { SET_FAVORITE, REMOVE_FAVORITE } from '../../src/actions/types';

beforeAll(() => { 
  jest.mock('@react-native-community/async-storage');
});

it('should return list with no favorite without firing any action', () => {
  expect(FavoriteReducer(undefined, { type: '' })).toEqual({ favoriteList: [] });
});

it('should return list with only one new favorite on SET_FAVORITE action for the first type', () => {
  const initialState = FavoriteReducer(undefined, { type: '' });
  
  expect(FavoriteReducer(initialState, { type: SET_FAVORITE, payload: 'Terrier' }))
  .toEqual({ favoriteList: ['Terrier'] });
});

it('should return list with new favorite on SET_FAVORITE action with current state', () => {
  const stateWithBreed = { favoriteList: ['Terrier'] };

  expect(FavoriteReducer(stateWithBreed, { type: SET_FAVORITE, payload: 'Bulldog' }))
  .toEqual({ favoriteList: ['Terrier', 'Bulldog'] });
});

it('should return list removing breed on REMOVE_FAVORITE action', () => {
  const stateWithBreed = { favoriteList: ['Terrier'] };

  expect(FavoriteReducer(stateWithBreed, { type: REMOVE_FAVORITE, payload: 'Terrier' }))
  .toEqual({ favoriteList: [] });
});

it('should return current list on REMOVE_FAVORITE action when breed is not on the list', () => {
  const stateWithBreed = { favoriteList: ['Terrier'] };

  expect(FavoriteReducer(stateWithBreed, { type: REMOVE_FAVORITE, payload: 'Bulldog' }))
  .toEqual({ favoriteList: ['Terrier'] });
});
