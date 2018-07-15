import { ROLES_FETCHED } from "../../types";
import api from '../../api';

export const rolesFetched = roles => ({
  type: ROLES_FETCHED,
  roles
});

export const fetchRoles = () => dispatch => {
  return api.roles().then(roles => {
    dispatch(rolesFetched(roles));
  });
}
