import React, { Component } from 'react';

import './App.css';
import Header from './components/Header/Header';
import Week from './components/Week/Week';
import Hours from './components/Hours/Hours';
import Graph from './components/Graph/Graph';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      location: null,
      country: null,
      lat: null,
      lng: null,
      weather: null,
    };
  }

  componentDidMount() {
    this.getWeather('London');
  }

  getLocationInfo = async (locationName) => {
    const geocodingAPIKey = 'fc5537dfa58042ccb273b70a735c9fbe';
    const geocodingURL = `https://api.opencagedata.com/geocode/v1/json?q=${locationName}&limit=1&key=${geocodingAPIKey}`;

    try {
      const response = await fetch(geocodingURL);
      const data = await response.json();
      const locationData = data.results[0];

      this.setState({
        error: null,
        location:
          locationData.components.city ||
          locationData.components.town ||
          locationData.components.village,
        country: locationData.components.country,
        lat: locationData.geometry.lat,
        lng: locationData.geometry.lng,
      });
    } catch {
      this.setState({ error: 'Geocoding Error! Try again...' });
    }
  };

  getWeather = async (locationName) => {
    await this.getLocationInfo(locationName);
    if (this.state.error) return;

    const baseWeatherURL = 'https://api.openweathermap.org/data/2.5/onecall?';
    const weatherAPIKey = 'f7598b88f802f301ba64fa1641332295'; // :)
    const parameters = `lat=${this.state.lat}&lon=${this.state.lng}&exclude=current,minutely&units=metric&appid=${weatherAPIKey}`;
    const weatherURL = `${baseWeatherURL}${parameters}`;

    try {
      const response = await fetch(weatherURL);
      const data = await response.json();

      let weather = [];
      data.daily.forEach((day, index) => {
        if (index === 7) return;

        weather.push({
          dt: day.dt,
          temp: day.temp.day,
          desc: day.weather[0].description,
          id: day.weather[0].id
        });
      });

      this.setState({
        error: null,
        weather: weather,
      });
    } catch (err) {
      this.setState({ error: 'Weather Error! Try again...' });
    }
  };

  onSubmitHandler = async (value, e) => {
    e.preventDefault();
    e.persist();
    await this.getWeather(value);
    if (this.state.error === null) e.target.reset();
  };

  render() {
    return (
      <div className="App">
        <Header
          onSubmitHandler={this.onSubmitHandler}
          location={{
            location: this.state.location,
            country: this.state.country,
          }}
          error={this.state.error}
        />
        <Week weather={this.state.weather}/>
        <Hours />
        <Graph />
      </div>
    );
  }
}

export default App;
