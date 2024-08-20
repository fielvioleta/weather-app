import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getWeather, setUnits } from '../redux/weatherSlice';

const Details: React.FC = () => {
  const { 
    units,
    loading,
    error,
    city,
    main
  } = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch<AppDispatch>();

  const toggleUnits = () => {
    dispatch(setUnits(units === 'metric' ? 'imperial' : 'metric'));
  };

  const formatKey = (key: string) => {
    return key.replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    city && dispatch(getWeather({ city, units }));
  }, [units]);

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
        {
          Object.entries(main).map(([key, value]: any) => (
            <div key={key} className='labelDetailsContainerItem flex flex-col items-center justify-evenly'>
              <div className='containerItemLabel font-medium'>{formatKey(key)}</div>
              <div className='containerItemValue'>{value}</div>
            </div>
          ))
        }
      </div> 
    </>
    
  );
};

export default Details;
