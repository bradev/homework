import React from 'react';
import { connect } from 'react-redux'
import { usersById, removeUser } from './../../actions/vehicle';
import vehicleUsersSelector from './../../selectors/vehicleUsersSelector';
import VehicleUsersList from './../elements/VehicleUsersList';
import { Segment, Message } from 'semantic-ui-react'
import errorMessage from './../../../common/utils/errorMessage';
import rolesSelector from './../../selectors/rolesSelector';

export class VehicleUsers extends React.Component  {

  state = {
    loadingUsers: false,
    removingUser: false,
    errMsg: ''
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.vehicle.id !== prevProps.vehicle.id) {
      this.setState({ loadingUsers: true, errMsg: ''})
      this.props
        .usersById(this.props.vehicle.id)
        .catch(err =>
          this.setState({
            errMsg: errorMessage(err.response.status)
          })
        )
        .finally(() => this.setState({ loadingUsers: false }));
    }
  }

  removeUser = personId => {
    this.setState({ removingUser: true, errMsg: '' })
    this.props.removeUser(this.props.vehicle.id, personId)
    .catch(err =>
      this.setState({
        errMsg: errorMessage(err.response.status)
      }))
    .finally(() => {
      this.setState({ removingUser: false })
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.vehicleUsers !== nextProps.vehicleUsers ||
      this.props.vehicle.id !== nextProps.vehicle.id ||
      this.state.loadingUsers !== nextState.loadingUsers ||
      this.state.removingUser !== nextState.removingUser ||
      this.state.errMsg !== nextState.errMsg ||
      this.props.roles !== nextProps.roles
    )
  }

  render() {
    const vehicleExists = !!Object.keys(this.props.vehicle).length;
    const vehicleUsersExist = !!this.props.vehicleUsers.length;

    return (
      <div>
        {vehicleUsersExist && <Segment style={{marginTop: '40px'}} padded>

        {this.state.errMsg && (
          <Message negative>
            {this.state.errMsg}
          </Message>
        )}

        {vehicleUsersExist && (
          <VehicleUsersList
            remove={this.removeUser}
            users={this.props.vehicleUsers}
            loadingUsers={this.state.loadingUsers}
            removingUser={this.state.removingUser}
            roles={this.props.roles}
          />
        )}

      </Segment>}

      {(vehicleExists && !vehicleUsersExist) && (
        <Message>
          {"There are no persons associated with this vehicle."}
        </Message>
      )}
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    vehicle: state.vehicle,
    vehicleUsers: Object.keys(state.vehicleUsers).length
      ? vehicleUsersSelector(state)
      : [],
    roles: rolesSelector(state) || {}
  };
};

export default connect(mapStateToProps, { usersById, removeUser })(VehicleUsers)
