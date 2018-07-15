import { createSelector }  from 'reselect';

// selector
export const getRoles = state => state.roles;

export default createSelector(getRoles, roles => {
  return roles.reduce((accumulator, currentValue) => {
    const {code, text} = currentValue;
    return {...accumulator, [code]: text}
  }, {});
});
