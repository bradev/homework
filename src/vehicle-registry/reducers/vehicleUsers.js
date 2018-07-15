import {
  VEHICLE_USERS_FETCHED,
  VEHICLE_USER_REMOVED,
  VEHICLE_FETCHED,
  VEHICLE_USER_ADDED
} from "./../../types";
import omit from 'lodash/omit';

export default function(state = {}, action = {}) {
  switch (action.type){
    case VEHICLE_USERS_FETCHED:
      return { ...state, ...action.users.entities.vehicleUsers };
    case VEHICLE_USER_ADDED:
      const user = action.user;
      return { ...state, [user.id]: user };
    case VEHICLE_USER_REMOVED:
      return {...omit(state, action.personId)}
    case VEHICLE_FETCHED:
      return {}
    default:
      return state;
  }
}
