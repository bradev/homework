import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactDatepicker from 'react-datepicker';
import DateInput from './DateInput';
import { datePickerStyle } from './index.css';


const DatePicker = ({type, onSelect, selected, error}) => {

  const handleOnChange = date => {
    onSelect({[type]: date})
  }

  return (
    <div className={datePickerStyle}>
      <ReactDatepicker
        todayButton={'Today'}
        customInput={<DateInput type={type} error={error} />}
        selected={selected ? moment(selected) : null}
        onChange={(e, data) => handleOnChange(e.format('YYYY-MM-DD'))}
        dateFormat='YYYY-MM-DD'
        minDate={moment()}
        popperPlacement="left-end"
      />
    </div>
  );
}

DatePicker.propTypes = {
  onSelect: PropTypes.func,
  type: PropTypes.string,
  selected: PropTypes.string,
  error: PropTypes.bool
};

export default DatePicker;
