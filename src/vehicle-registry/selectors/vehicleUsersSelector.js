import { createSelector }  from 'reselect';

// selector
export const getVehicleUsers = state => state.vehicleUsers;

export default createSelector(getVehicleUsers, users => Object.values(users));
