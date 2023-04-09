import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import './App.css';
import DogDetails from './components/DogDetails/DogDetails';
import Form from './components/Form/Form';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Home}/>
        <Route exact path='/dogs/:id' component={DogDetails}/>
        <Route path='/dog' component={Form}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
