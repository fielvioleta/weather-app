import React from 'react';
import Search from './components/Search';
import Details from './components/Details';
import './styles/global.scss';

const App: React.FC = () => {
  return (
    <>
      <div className='searchContainer'>
        <h1>Weather App</h1>
        <Search />
      </div>
      <Details />
    </>
    
  );
};

export default App;