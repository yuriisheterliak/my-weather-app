import React, { Component } from 'react';

import { formatWeather } from './other/weatherFormatter';
import Header from './components/Header/Header';
import Week from './components/Week/Week';
import Hours from './components/Hours/Hours';
import GraphContainer from './components/GraphContainer/GraphContainer';
import classes from './App.module.scss';

class App extends Component {
  state = {
    units: 'celsius',
    weather: null,
    activeDay: 0,
    weatherIsLoading: false,
    locationIsLoading: false,
    error: null,
    locationInfo: {
      location: null,
      country: null,
      lat: null,
      lng: null,
    },
    sliderCoordinates: {
      clientX: null,
      clientY: null,
    },
  };

  componentDidMount() {
    this.getWeather('Kyiv');
  }

  getLocationInfo = async (locationName) => {
    const geocodingAPIKey = 'fc5537dfa58042ccb273b70a735c9fbe';
    const geocodingURL = `https://api.opencagedata.com/geocode/v1/json?q=${locationName}&limit=1&key=${geocodingAPIKey}`;

    try {
      this.setState({ locationIsLoading: true, weatherIsLoading: true });
      const response = await fetch(geocodingURL);
      const data = await response.json();
      const locationData = data.results[0];

      this.setState({
        error: null,
        locationIsLoading: false,
        locationInfo: {
          location:
            locationData.components.city ||
            locationData.components.town ||
            locationData.components.village ||
            locationData.components.state,
          country: locationData.components.country,
          lat: locationData.geometry.lat,
          lng: locationData.geometry.lng,
        },
      });
    } catch {
      this.setState({
        error: 'Geocoding API Error! Try again...',
        locationIsLoading: false,
        locationInfo: {
          location: null,
          country: null,
          lat: null,
          lng: null,
        },
      });
    }
  };

  getWeather = async (locationName) => {
    await this.getLocationInfo(locationName);
    if (this.state.error) return;

    const baseWeatherURL = 'https://api.openweathermap.org/data/2.5/onecall?';
    const weatherAPIKey = 'f7598b88f802f301ba64fa1641332295'; // :)
    const parameters = `lat=${this.state.locationInfo.lat}&lon=${this.state.locationInfo.lng}&exclude=current,minutely&units=metric&appid=${weatherAPIKey}`;
    const weatherURL = `${baseWeatherURL}${parameters}`;

    try {
      const response = await fetch(weatherURL);
      const data = await response.json();
      const weather = formatWeather(data);

      this.setState({
        error: null,
        weatherIsLoading: false,
        weather: weather,
      });
    } catch (err) {
      this.setState({
        error: 'Weather API Error! Try again...',
        weatherIsLoading: false,
        weather: null,
      });
    }
  };

  onSubmitHandler = async (value, e) => {
    e.preventDefault();
    e.persist();
    await this.getWeather(value);
    if (this.state.error === null) e.target.reset();
  };

  changeActiveDayHandler = (index, e) => {
    const { clientX, clientY } = this.state.sliderCoordinates;
    if (clientX === e.clientX || clientY === e.clientY) {
      this.setState({ activeDay: index });
    }
  };

  onMouseDownSliderHandler = (e) => {
    this.setState({
      sliderCoordinates: {
        clientX: e.clientX,
        clientY: e.clientY,
      },
    });
  };

  onChangeUnitsHandler = (e) => {
    if (e.target.checked) {
      this.setState({ units: 'fahrenheit' });
    } else {
      this.setState({ units: 'celsius' });
    }
  };

  render() {
    let mainContent = (
      <>
        <Week
          weather={this.state.weather}
          activeDay={this.state.activeDay}
          units={this.state.units}
          isLoading={this.state.weatherIsLoading}
          changeActiveDayHandler={this.changeActiveDayHandler}
          onMouseDownHandler={this.onMouseDownSliderHandler}
        />
        <Hours
          weather={this.state.weather}
          activeDay={this.state.activeDay}
          units={this.state.units}
          isLoading={this.state.weatherIsLoading}
        />
        <GraphContainer
          weather={this.state.weather}
          activeDay={this.state.activeDay}
          isLoading={this.state.weatherIsLoading}
        />
      </>
    );

    if (this.state.error) {
      mainContent = <div className={classes.Error}>Something went wrong!</div>;
    }

    return (
      <div className={classes.App}>
        <Header
          onSubmitHandler={this.onSubmitHandler}
          onChangeUnitsHandler={this.onChangeUnitsHandler}
          location={{
            location: this.state.locationInfo.location,
            country: this.state.locationInfo.country,
          }}
          isLoading={this.state.locationIsLoading}
          error={this.state.error}
        />
        {mainContent}
      </div>
    );
  }
}

export default App;
