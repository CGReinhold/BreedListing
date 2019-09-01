import BreedsReducer from '../../src/reducer/BreedsReducer';
import { FETCH_BREED_LIST_SUCCESS,
  FETCH_BREED_LIST_ERROR,
  FETCHING_BREED_LIST,
  FETCHING_BREED_IMAGES,
  FETCH_BREED_IMAGES_SUCCESS,
  FETCH_BREED_IMAGES_ERROR
} from '../../src/actions/types';

it('should return initial state if no action is called', () => {
  expect(BreedsReducer(undefined, { type: '' })).toEqual({ loading: false, error: '', list: [] });
});

it('should return loading when called FETCHING_BREED_LIST action', () => {
  expect(BreedsReducer(undefined, { type: FETCHING_BREED_LIST })).toEqual({ loading: true, error: '', list: [] });
});

it('should return error when called FETCH_BREED_LIST_ERROR action', () => {
  expect(BreedsReducer(undefined, { type: FETCH_BREED_LIST_ERROR, payload: 'Could not load breeds.' }))
  .toEqual({ loading: false, error: 'Could not load breeds.', list: [] });
});

it('should return breeds when called FETCH_BREED_LIST_SUCCESS action', () => {
  expect(BreedsReducer(undefined, {
    type: FETCH_BREED_LIST_SUCCESS,
    payload: [{ name: 'Beagle' }, { name: 'Bulldog'}, { name: 'Collie' }, { name: 'Terrier' }]
  }))
  .toEqual({ loading: false, error: '', list: [{ name: 'Beagle' }, { name: 'Bulldog'}, { name: 'Collie' }, { name: 'Terrier' }] });
});

it('should return loading breed images when called FETCHING_BREED_IMAGES action', () => {
  const state = {
    loading: false,
    error: '',
    list: [{ name: 'Beagle', originalName: 'beagle' }, { name: 'Bulldog', originalName: 'bulldog' }, { name: 'Collie', originalName: 'collie' }, { name: 'Terrier', originalName: 'terrier' }]
  }
  expect(BreedsReducer(state, { 
    type: FETCHING_BREED_IMAGES, 
    payload: { breedName: 'beagle' }
  }))
  .toEqual({ 
    loading: false, 
    error: '', 
    list: [{ imagesLoading: true, name: 'Beagle', originalName: 'beagle' }, { name: 'Bulldog', originalName: 'bulldog' }, { name: 'Collie', originalName: 'collie' }, { name: 'Terrier', originalName: 'terrier' }]
  });
});

it('should return error for breed images when called FETCH_BREED_IMAGES_ERROR action', () => {
  const state = {
    loading: false,
    error: '',
    list: [{ name: 'Beagle', originalName: 'beagle' }, { name: 'Bulldog', originalName: 'bulldog' }, { name: 'Collie', originalName: 'collie' }, { name: 'Terrier', originalName: 'terrier' }]
  }
  expect(BreedsReducer(state, { 
    type: FETCH_BREED_IMAGES_ERROR, 
    payload: { breedName: 'beagle', error: 'Could not load images.' }
  }))
  .toEqual({ 
    loading: false, 
    error: '', 
    list: [{ imagesLoading: false, imagesError: 'Could not load images.', name: 'Beagle', originalName: 'beagle' }, { name: 'Bulldog', originalName: 'bulldog' }, { name: 'Collie', originalName: 'collie' }, { name: 'Terrier', originalName: 'terrier' }]
  });
});

it('should return image list for breed images when called FETCH_BREED_IMAGES_SUCCESS action', () => {
  const state = {
    loading: false,
    error: '',
    list: [{ name: 'Beagle', originalName: 'beagle' }, { name: 'Bulldog', originalName: 'bulldog' }, { name: 'Collie', originalName: 'collie' }, { name: 'Terrier', originalName: 'terrier' }]
  }
  expect(BreedsReducer(state, { 
    type: FETCH_BREED_IMAGES_SUCCESS, 
    payload: { breedName: 'beagle', images: ["https:\/\/images.dog.ceo\/breeds\/beagle\/Joey.jpg", "https:\/\/images.dog.ceo\/breeds\/beagle\/Phoebe.jpg", "https:\/\/images.dog.ceo\/breeds\/beagle\/n02088364_10108.jpg", "https:\/\/images.dog.ceo\/breeds\/beagle\/n02088364_10206.jpg"]}
  }))
  .toEqual({ 
    loading: false, 
    error: '', 
    list: [{ imagesLoading: false, imagesError: '', images: ["https:\/\/images.dog.ceo\/breeds\/beagle\/Joey.jpg", "https:\/\/images.dog.ceo\/breeds\/beagle\/Phoebe.jpg", "https:\/\/images.dog.ceo\/breeds\/beagle\/n02088364_10108.jpg", "https:\/\/images.dog.ceo\/breeds\/beagle\/n02088364_10206.jpg"], name: 'Beagle', originalName: 'beagle' }, { name: 'Bulldog', originalName: 'bulldog' }, { name: 'Collie', originalName: 'collie' }, { name: 'Terrier', originalName: 'terrier' }]
  });
});
