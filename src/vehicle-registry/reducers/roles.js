import { ROLES_FETCHED } from "./../../types.js";

export default function(state = [], action = {}) {
  switch (action.type){
    case ROLES_FETCHED:
      return action.roles;
    default:
      return state;
  }
}
