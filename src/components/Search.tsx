import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { getWeather } from '../redux/weatherSlice';
import { RootState } from '../redux/store';

const Search: React.FC = () => {
  const { units } = useSelector((state: RootState) => state.weather);
  const [city, setCity] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = () => {
    if (city.trim()) {
      dispatch(getWeather({ city, units }));
    }
  };

  return (
    <div className='search-box flex items-center'>
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city name"
        className='flex-1'
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
