import React from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { BreedList, BreedData } from './components';

const sceneConfig = {
  cardStyle: {
    backgroundColor: 'white'
  },
  navigationBarStyle: {
    backgroundColor: '#0d46a0'
  }, 
  titleStyle: {
    color: 'white',
  },
  sceneStyle: {
    backgroundColor: 'white'
  }
};

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="main" {...sceneConfig}>
          <Scene hideNavBar key="breedList" component={BreedList} title="Breed list" {...sceneConfig} />
          <Scene key="breed" component={BreedData} title="Breed" {...sceneConfig} tintColor={'#fff'} />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
