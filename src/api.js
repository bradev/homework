import axios from 'axios';

export default {
  persons: search =>
    axios.get(`/persons?search=${search}`).then(res => res.data),
  roles: () => axios.get("/roles").then(res => res.data),
  vehicle: {
    byPlateNumber: nr =>
      axios.get(`/vehicles?plateNumber=${nr}`).then(res => res.data),
    usersByVehicleId: id =>
      axios.get(`/vehicles/${id}/users`).then(res => {
        return res.data;
      }),
    removeUser: (vehicleId, personId) =>
      axios
        .post(`/vehicles/${vehicleId}/users/${personId}/remove`)
        .then(res => res.data),
    addUser: ({ id, roleCode, validFrom, validTo }, vehicleId) =>
      axios
        .post(`/vehicles/${vehicleId}/users/add`, {
          from: validFrom,
          personId: id,
          role: roleCode,
          to: validTo
        })
        .then(res => res.data)
  }
};
