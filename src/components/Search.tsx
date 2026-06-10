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
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city..."
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="search-input"
        />

        <button onClick={handleSearch} className="search-btn">
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
