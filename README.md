# :snowflake: My Weather App

A simple weather app built with [React.js](https://reactjs.org) and [Netlify](https://www.netlify.com/) lambda functions.

<p>
  <img alt="Desktop Gif" style="width: 100%; margin-right: 10px;" src="https://user-images.githubusercontent.com/55920656/117145506-e658c900-adbb-11eb-9851-3d5f29d50d96.gif">
  <img alt="Mobile Gif" src="https://user-images.githubusercontent.com/55920656/117145933-59fad600-adbc-11eb-83f3-c38a05fc0722.gif">
</p>

## :scroll: Table of contents

1. [Live Demo](#zap-live-demo)
1. [Motivation](#mortar_board-motivation)
1. [Features](#droplet-features)
1. [Technologies](#rocket-technologies)
1. [Used APIs](#umbrella-used-apis)
1. [Requirements](#wrench-requirements)
1. [Development](#hammer-development)
1. [Inspiration](#art-inspiration)

## :zap: Live Demo

Netlify: https://my-weather-app-app.netlify.app/

## :mortar_board: Motivation

I created this project to learn [React](https://reactjs.org), how to build [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) apps, working with APIs and [Netlify](https://www.netlify.com/) serverless functions.

## :droplet: Features

- weather forecasts for 7 days and 48 hours
- charts for pressure, wind speed and comparison of precipitation probability and humidity
- location autocomplete
- time format and temperature units switching
- good keyboard accessibility
- installable on Chrome, Edge(Chromium) and mobile's Opera and Firefox
- works offline (shows previously fetched data)

## :rocket: Technologies

- Javascript ([React](https://reactjs.org))
- [Netlify](https://www.netlify.com/)
- CSS [(SCSS)](https://sass-lang.com)
- HTML
- [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
- [Recharts](https://github.com/recharts/recharts) - A composable charting library built on React components
- [SimpleBar](https://github.com/Grsmto/simplebar/tree/master/packages/simplebar-react) - Simple bar :)
- [keen-slider](https://github.com/rcbyr/keen-slider) - Free touch slider

## :umbrella: Used APIs

- [Geopify](https://www.geoapify.com/address-autocomplete) - location autocomplete
- [Open Weather API](https://openweathermap.org/api) - weather forecasts

## :wrench: Requirements

- node `^14.16.0`
- npm `^6.14.11`

## :hammer: Development

1. Clone or download the repo.
2. To install dependencies run next command in project directory (requires [node.js](https://nodejs.org) and [npm](https://www.npmjs.com/)):

```shell
$ npm install
```

3. The project uses [Netlify](https://www.netlify.com/) serverless functions to keep your API keys in secret, so you must create a project on [Netlify](https://www.netlify.com/) and connect repo. See [Netlify documentation](https://docs.netlify.com/).
   > _The project uses [these](#umbrella-used-apis) APIs, so you must have API keys before next step._
4. Create a file `.env` in repo directory to include all the necessary API keys. Add next in `.env`:

```.env
LOCATION_API_KEY="your location API key"
WEATHER_API_KEY="your weather API key"
```

> _If you want to host project on [Netlify](https://www.netlify.com/) you should also add those environment variables containing API keys on server (Site settings > Build & deploy > Environment)._

5. The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), but for [Netlify](https://www.netlify.com/)'s lambda functions work some npm scripts was added:

- `netlify dev` - starts dev server (uses `react-scripts start`)
- `netlify deploy -p` - deploys project on [Netlify](https://www.netlify.com/) (don't forget to run `react-scripts build` before that)

## :art: Inspiration

UI design was inspired by [@DLacambra](https://twitter.com/dlacambra)'s - [Atmosphere iPad Prototype](https://dribbble.com/shots/3554303-Atmosphere-iPad-Prototype)
