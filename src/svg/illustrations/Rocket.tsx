import React from 'react';
import PropTypes from 'prop-types';
import solar from './solar.png';

const Rocket = ({ width = '100%', height = '100%' }) => {
  
  return (
    <img width="600px" src={solar} alt="Solar" />
  );
};

Rocket.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Rocket;
