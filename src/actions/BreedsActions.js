import AsyncStorage from '@react-native-community/async-storage';
import {
  FETCH_BREED_LIST_SUCCESS,
  FETCH_BREED_LIST_ERROR,
  FETCHING_BREED_LIST,
  FETCHING_BREED_IMAGES,
  FETCH_BREED_IMAGES_SUCCESS,
  FETCH_BREED_IMAGES_ERROR
} from './types';

export const getBreeds = () => {
  return async dispatch => {
    dispatch({ type: FETCHING_BREED_LIST });

    try {
      const breeds = await AsyncStorage.getItem('@breeds');
      if (breeds) {
        dispatch({ type: FETCH_BREED_LIST_SUCCESS, payload: JSON.parse(breeds) });
      }

      const response = await fetch('https://dog.ceo/api/breeds/list/all')
      const data = await response.json();
    
      if (data.status === 'success') {
        const dataMessage = data.message;
        const breeds = Object.keys(dataMessage)
        .map(breed => ({ name: capitalizeFirstLetter(breed), originalName: breed, variations: dataMessage[breed] }));
        
        const orderedBreeds = breeds.sort((a,b) => a.originalName.localeCompare(b.originalName));

        dispatch({ type: FETCH_BREED_LIST_SUCCESS, payload: orderedBreeds });
        AsyncStorage.setItem('@breeds', JSON.stringify(orderedBreeds));
      } else {
        dispatch({ type: FETCH_BREED_LIST_ERROR, payload: 'Could not load breeds.' })
      }
    } catch (err) {
      dispatch({ type: FETCH_BREED_LIST_ERROR, payload: err.message });
    }
  };
};

export const getBreedImages = breedName => {
  return async dispatch => {
    dispatch({ type: FETCHING_BREED_IMAGES, payload: { breedName } });

    try {
      const response = await fetch(`https://dog.ceo/api/breed/${breedName}/images`)
      const data = await response.json();
    
      if (data.status === 'success') {
        const dataMessage = data.message;
        const images = Object.keys(dataMessage).map(image => dataMessage[image]);
        dispatch({ type: FETCH_BREED_IMAGES_SUCCESS, payload: { breedName, images } });
      } else {
        dispatch({ type: FETCH_BREED_IMAGES_ERROR, payload: { breedName, error: 'Could not load images from this breed.' } })
      }
    } catch (err) {
      dispatch({ type: FETCH_BREED_IMAGES_ERROR, payload: { breedName, error: err.message } });
    }
  }
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
