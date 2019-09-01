import {
  FETCH_BREED_LIST_SUCCESS,
  FETCH_BREED_LIST_ERROR,
  FETCHING_BREED_LIST,
  FETCHING_BREED_IMAGES,
  FETCH_BREED_IMAGES_SUCCESS,
  FETCH_BREED_IMAGES_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  error: '',
  list: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BREED_LIST_SUCCESS:
      return { ...state, loading: false, error: '', list: action.payload };
    case FETCH_BREED_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };
    case FETCHING_BREED_LIST:
      return { ...state, loading: true, error: '' };
    case FETCH_BREED_IMAGES_SUCCESS:
      const listSuccess = state.list.map(breed => {
        if (breed.originalName === action.payload.breedName) {
          return { ...breed, imagesLoading: false, imagesError: '', images: action.payload.images };
        }
        return breed;
      });
      return { ...state, list: listSuccess };
    case FETCH_BREED_IMAGES_ERROR:
      const listError = state.list.map(breed => {
        if (breed.originalName === action.payload.breedName) {
          return { ...breed, imagesLoading: false, imagesError: action.payload.error };
        }
        return breed;
      });
      return { ...state, list: listError };
    case FETCHING_BREED_IMAGES:
      const listLoading = state.list.map(breed => {
        if (breed.originalName === action.payload.breedName) {
          return { ...breed, imagesLoading: true };
        }
        return breed;
      });
      return { ...state, list: listLoading };
    default:
      return state;
  }
};
