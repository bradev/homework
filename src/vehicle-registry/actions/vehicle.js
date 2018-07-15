import {
  VEHICLE_FETCHED,
  VEHICLE_USERS_FETCHED,
  VEHICLE_USER_REMOVED,
  VEHICLE_USER_ADDED
} from "../../types";

import { normalize } from "normalizr";
import api from '../../api';
import vehicleUsersSchema from './../schemas/vehicleUsersSchema';

export const vehicleFetched = vehicle => ({
  type: VEHICLE_FETCHED,
  vehicle
});
export const vehicleUsersFetched = users => ({
  type: VEHICLE_USERS_FETCHED,
  users
});
export const vehicleUserRemoved = personId => ({
  type: VEHICLE_USER_REMOVED,
  personId
});
export const vehicleUserAdded = user => ({
  type: VEHICLE_USER_ADDED,
  user
});

export const searchByPlateNumber = nr => dispatch => {
  return api.vehicle.byPlateNumber(nr).then(vehicle => {
    dispatch(vehicleFetched(vehicle));
  });
}

export const usersById = id => dispatch => {
  return api.vehicle.usersByVehicleId(id).then(users => {
    dispatch(vehicleUsersFetched(normalize(users, [vehicleUsersSchema])));
  });
}

export const removeUser = (vehicleId, personId) => dispatch => {
  return api.vehicle.removeUser(vehicleId, personId).then(() => {
    dispatch(vehicleUserRemoved(personId));
  });
}

export const addUser = (personData, vehicleId) => dispatch => {
  return api.vehicle.addUser(personData, vehicleId).then(() => {
    dispatch(vehicleUserAdded(personData));
  });
}
