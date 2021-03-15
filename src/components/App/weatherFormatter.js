import { getDayOfMonth } from '../../shared/utilities';

export const formatWeather = (fetchedWeather) => {
  const result = [];

  fetchedWeather.daily.forEach((day, index) => {
    if (index === 7) return;

    const hourlyWeather = getHourlyWeatherByDate(
      fetchedWeather.hourly,
      day.dt,
      fetchedWeather.timezone
    );
    const formattedHourlyWeather = formatHourlyWeather(hourlyWeather);

    result.push({
      dt: day.dt,
      timezone: fetchedWeather.timezone,
      temp: day.temp.day,
      desc: day.weather[0].description,
      id: day.weather[0].id,
      hourlyWeather: formattedHourlyWeather,
    });
  });

  return result;
};

export const getHourlyWeatherByDate = (
  allHourlyWeather,
  dateTimestampSec,
  timezone
) => {
  const result = [];

  allHourlyWeather.forEach((hour) => {
    if (
      getDayOfMonth(hour.dt, timezone) ===
      getDayOfMonth(dateTimestampSec, timezone)
    ) {
      result.push(hour);
    }
  });

  return result;
};

export const formatHourlyWeather = (hourlyWeather) => {
  const result = [];

  hourlyWeather.forEach((hour) => {
    result.push({
      dt: hour.dt,
      temp: hour.temp,
      desc: hour.weather[0].description,
      id: hour.weather[0].id,
      precipitation: hour.pop,
      humidity: hour.humidity,
      pressure: hour.pressure,
      windSpeed: hour.wind_speed,
    });
  });

  return result;
};
