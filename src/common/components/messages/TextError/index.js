import React from "react";
import PropTypes from "prop-types";
import { textError } from './TextError.css';

const TextError = ({ text }) => {
  return (
    <div className={textError}>{text}</div>
  );
}

TextError.propTypes = {
  text: PropTypes.string.isRequired
};

export default TextError;
