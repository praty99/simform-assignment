import React from 'react';
import { Provider } from 'react-redux';

import reduxStore from './store';
import { HomeContainer } from './modules/home';

const App = () => (
  <Provider store={reduxStore}>
    <div className="App">
      <HomeContainer />
    </div>
  </Provider>
);

export default App;
