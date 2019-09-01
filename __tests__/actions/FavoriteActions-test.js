import { setFavorite, removeFavorite } from '../../src/actions/FavoriteActions';
import { SET_FAVORITE, REMOVE_FAVORITE } from '../../src/actions/types';

beforeAll(() => { 
  jest.mock('@react-native-community/async-storage');
});

it('should return action to set new favorite', () => {
  expect(setFavorite('Terrier')).toEqual({ type: SET_FAVORITE, payload: 'Terrier' });
});

it('should return action to remove favorite', () => {
  expect(removeFavorite('Terrier')).toEqual({ type: REMOVE_FAVORITE, payload: 'Terrier' });
});
