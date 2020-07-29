import React, { Component } from 'react';

import classes from './Header.module.scss';
import LocationInput from './LocationInput/LocationInput';
import TitleAndLocation from './TitleAndLocation/TitleAndLocation';

class Header extends Component {
  render() {
    return (
      <div className={classes.Header}>
        <TitleAndLocation location={this.props.location} />
        <LocationInput
          onSubmitHandler={this.props.onSubmitHandler}
          error={this.props.error}
        />
      </div>
    );
  }
}

export default Header;
