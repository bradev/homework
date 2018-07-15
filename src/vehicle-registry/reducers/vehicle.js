import { VEHICLE_FETCHED } from "./../../types";

export default function(state = {}, action = {}) {
  switch (action.type){
    case VEHICLE_FETCHED:
      return action.vehicle;
    default:
      return state;
  }
}
