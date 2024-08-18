import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeather } from '../api/weatherAPI';
import { WeatherState } from '../types';

const initialState: WeatherState = {
  // state
  loading: false,
  error: null,
  units: 'metric',
  
  // details
  city: '',
  main: null
};

export const getWeather = createAsyncThunk(
  'weather/fetchWeather',
  async ({ city, units }: { city: string; units: 'metric' | 'imperial' }) => {
    const data = await fetchWeather(city, units);
    return data;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setUnits: (state, action) => {
      state.units = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload.name;
        state.main = action.payload.main;
      })
      .addCase(getWeather.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch weather data';
      });
  },
});

export const { setUnits } = weatherSlice.actions;

export default weatherSlice.reducer;
