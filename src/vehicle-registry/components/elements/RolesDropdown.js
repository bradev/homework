import React from 'react';
import { Dropdown } from 'semantic-ui-react'
import TextError from './../../../common/components/messages/TextError/';

const RolesDropdown = ({roles, onSelect, error}) => {

  const options = roles.reduce((accumulator, currentValue) => {
    const {code, text} = currentValue;
    return [...accumulator, {
      key: code,
      value: code,
      text
    }]
  }, []);

  return (
    <div>
      <Dropdown
        error={!!error}
        fluid
        selection
        placeholder='Select role'
        options={options}
        onChange={(e, data) => onSelect({
          roleCode: data.value
        })}
      />

      {!!error && <TextError text={error} />}
    </div>
  )
}

export default RolesDropdown;
