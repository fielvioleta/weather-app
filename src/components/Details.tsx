import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setUnits } from '../redux/weatherSlice';

const Details: React.FC = () => {
  const { 
    units,
    loading,
    error,
    city,
    main
  } = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch();

  const toggleUnits = () => {
    dispatch(setUnits(units === 'metric' ? 'imperial' : 'metric'));
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    (city && main) && 
    <>
      <div className='flex box flex-col'>
        <div className='font-semibold cityName'>
          {city}
          <button className="switch" onClick={toggleUnits}>
            Switch to {units === 'metric' ? 'Fahrenheit' : 'Celsius'}
          </button>
        </div>
        <div className='flex citySubDetails'>
          
          <div className='flex flex-1 items-end'>
            <div className='temp font-bold'>{main.temp} °{units === 'metric' ? 'C' : 'F'}</div>
          </div>

          <div className='flex flex-1 flex-col items-end qualityDetails font-medium justify-around'>
            <div>Sun 63°C 57°C</div>
            <div>Air quality : 20 - Good</div>
          </div>
        </div>
      </div>

      <div className='labelDetails font-semibold'>Weather details</div>
      <div className='flex box flex-col labelDetailsContainer'>
        <div className='labelDetailsContainerItem flex flex-col items-center justify-evenly'>
          <div className='containerItemLabel font-medium'>Feels like</div>
          <div className='containerItemValue'>{main.feels_like}</div>
        </div>
        <div className='labelDetailsContainerItem flex flex-col items-center justify-evenly'>
          <div className='containerItemLabel font-medium'>Ground Level</div>
          <div className='containerItemValue'>{main.grnd_level}</div>
        </div>
        <div className='labelDetailsContainerItem flex flex-col items-center justify-evenly'>
          <div className='containerItemLabel font-medium'>Humidity</div>
          <div className='containerItemValue'>{main.humidity}%</div>
        </div>
        <div className='labelDetailsContainerItem flex flex-col items-center justify-evenly'>
          <div className='containerItemLabel font-medium'>pressure</div>
          <div className='containerItemValue'>{main.pressure}</div>
        </div>
        <div className='labelDetailsContainerItem flex flex-col items-center justify-evenly'>
          <div className='containerItemLabel font-medium'>Sea Level</div>
          <div className='containerItemValue'>{main.sea_level}</div>
        </div>
        <div className='labelDetailsContainerItem flex flex-col items-center justify-evenly'>
          <div className='containerItemLabel font-medium'>Temp</div>
          <div className='containerItemValue'>{main.temp}</div>
        </div>
        <div className='labelDetailsContainerItem flex flex-col items-center justify-evenly'>
          <div className='containerItemLabel font-medium'>Temp Min</div>
          <div className='containerItemValue'>{main.temp_min}</div>
        </div>
        <div className='labelDetailsContainerItem flex flex-col items-center justify-evenly'>
          <div className='containerItemLabel font-medium'>Temp Max</div>
          <div className='containerItemValue'>{main.temp_max}</div>
        </div>
      </div> 
    </>
    
  );
};

export default Details;
