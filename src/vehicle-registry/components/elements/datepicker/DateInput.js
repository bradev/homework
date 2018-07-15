import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react'


class DateInput extends React.PureComponent {

  state = {
    typeToText: {
      validFrom: 'Select from',
      validTo: 'Select to'
    }
  }

  render() {
    const { value, type, error } = this.props;

    return (
     <Input
       readOnly
       error={error}
       placeholder={this.state.typeToText[type]}
       onClick={this.props.onClick}
       value={value}
     />
    );
  }

}

DateInput.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.bool
};

export default DateInput;
