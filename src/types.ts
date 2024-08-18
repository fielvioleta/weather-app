export interface WeatherState {
  city: string;
  units: 'metric' | 'imperial';
  loading: boolean;
  error: string | null;
  main: any
}
  