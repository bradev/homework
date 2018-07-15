import { combineReducers } from "redux";
import vehicle from './vehicle-registry/reducers/vehicle';
import vehicleUsers from './vehicle-registry/reducers/vehicleUsers';
import roles from './vehicle-registry/reducers/roles';

const rootReducer = combineReducers({
  vehicle,
  vehicleUsers,
  roles
});

export default rootReducer;
