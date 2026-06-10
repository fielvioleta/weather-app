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
    (city && main) && (
      <div className="weather-container">

        {/* Top Card */}
        <div className="weather-card">

          <div className="weather-header">
            <h1 className="city-name">{city}</h1>

            <button className="unit-btn" onClick={toggleUnits}>
              °{units === 'metric' ? 'F' : 'C'}
            </button>
          </div>

          <div className="weather-main">
            <div className="temperature">
              {Math.round(main.temp)}°
            </div>

            <div className="weather-meta">
              <p className="feels-like">
                Feels like {Math.round(main.feels_like)}°
              </p>
              <p className="air-quality">
                Air Quality: 20 • Good
              </p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <h2 className="section-title">Weather Details</h2>

        <div className="details-grid">
          {[
            { label: "Humidity", value: main.humidity + "%" },
            { label: "Pressure", value: main.pressure + " hPa" },
            { label: "Temp Min", value: Math.round(main.temp_min) + "°" },
            { label: "Temp Max", value: Math.round(main.temp_max) + "°" },
          ].map((item) => (
            <div key={item.label} className="detail-card">
              <span className="detail-label">{item.label}</span>
              <span className="detail-value">{item.value}</span>
            </div>
          ))}
        </div>

      </div>
    )
  )
};

export default Details;
