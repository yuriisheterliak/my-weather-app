import React, { memo } from 'react';

import { ReactComponent as ThunderIcon } from '../../../assets/images/rain-thunder.svg';
import { ReactComponent as CloudsIcon } from '../../../assets/images/cloud.svg';
import { ReactComponent as LightCloudsIcon } from '../../../assets/images/cloud-sun.svg';
import { ReactComponent as FogIcon } from '../../../assets/images/fog.svg';
import { ReactComponent as LightRainIcon } from '../../../assets/images/light_rain.svg';
import { ReactComponent as RainIcon } from '../../../assets/images/rain.svg';
import { ReactComponent as SnowIcon } from '../../../assets/images/snow.svg';
import { ReactComponent as SunIcon } from '../../../assets/images/sun.svg';

const WeatherIcon = memo((props) => {
  let id = props.weatherID;
  let iconComponent = <LightRainIcon className={props.className} />;

  if (id >= 200 && id <= 232)
    iconComponent = <ThunderIcon className={props.className} />;

  if ((id >= 502 && id <= 511) || (id >= 521 && id <= 531))
    iconComponent = <RainIcon className={props.className} />;

  if (id >= 600 && id <= 622)
    iconComponent = <SnowIcon className={props.className} />;

  if (id >= 701 && id <= 781)
    iconComponent = <FogIcon className={props.className} />;

  if (id === 800) iconComponent = <SunIcon className={props.className} />;

  if (id >= 801 && id <= 802)
    iconComponent = <LightCloudsIcon className={props.className} />;

  if (id >= 803 && id <= 804)
    iconComponent = <CloudsIcon className={props.className} />;

  return iconComponent;
});

export default WeatherIcon;
