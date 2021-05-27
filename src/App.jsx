import React from 'react';
import Instafoto from './components/Instafoto';
import Navbar from './components/Navbar';
import {StoreProvider} from './store/StoreProvider'


function App() {


  return (
  <StoreProvider>  
    <Navbar />
    <Instafoto />
  </StoreProvider>
  );
}

export default App;
