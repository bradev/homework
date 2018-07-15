import React from 'react';
import { connect } from 'react-redux'
import { Divider, Segment, Button, Header, Message } from 'semantic-ui-react'
import SearchPersonDropdown from './../elements/SearchPersonDropdown';
import RolesDropdown from './../elements/RolesDropdown';
import { addUser } from './../../actions/vehicle';
import vehicleUsersSelector from './../../selectors/vehicleUsersSelector';
import hasKeyWithVal from './../../../common/utils/hasKeyWithVal';
import Datepicker from './../elements/datepicker/';
import { segmentHeading } from './AddUser.css';
import moment from 'moment';
import errorMessage from './../../../common/utils/errorMessage';


export class AddUser extends React.PureComponent {

  state = {
    personData: {},
    errors: {},
    loading: false,
    hasOwner: false,
    hasResUser: false
  }

  onChange = data => {
    this.setState({
      personData: { ...this.state.personData, ...data }
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const { vehicleId } = this.props;
    const { personData } = this.state;

    const errors = this.validate(personData);
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.addUser(personData, vehicleId)
      .catch(err =>
        this.setState({
          ...this.state,
          errors: { global: errorMessage(err.response.status) }
        })
      )
      .finally(() => this.setState({ loading: false }))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { vehicleUsers } = this.props;
    if (vehicleUsers !== prevProps.vehicleUsers) {
      this.setState({
        hasOwner: hasKeyWithVal(vehicleUsers, 'roleCode', 'OWNER'),
        hasResUser: hasKeyWithVal(vehicleUsers, 'roleCode', 'RESPONSIBLE_USER')
      });
    }
  }

  isValidRole = roleCode => {
    const { hasOwner, hasResUser } = this.state;
    const rolesMap = {
      OWNER: hasOwner,
      RESPONSIBLE_USER: hasResUser
    }
    return !rolesMap[roleCode];
  }

  isTempUser = roleCode => roleCode === 'TEMPORARY_USER'
  personIsChosen = () => !!this.props.vehicleUsersObj[this.state.personData.id];

  validate = data => {
    const errors = {};
    if (!data.roleCode) errors.role = "Choose a role";
    if (!this.isValidRole(data.roleCode))
      errors.role = `This role is chosen. Car may have one owner or responsible user`;
    if (!data.id) errors.person = "Choose a person";
    if (this.personIsChosen())
      errors.person = "Person with this ID is already associated with this vehicle";
    if (this.isTempUser(data.roleCode) && !data.validFrom)
      errors.validFrom = true;
    if (this.isTempUser(data.roleCode) && !data.validTo) errors.validTo = true;
    return errors;
  };

  handleQuickDuration = (count, type) => {
    this.onChange({
      validFrom: moment().format('YYYY-MM-DD'),
      validTo: moment().add(count, type).format('YYYY-MM-DD')
    })
  }

  render() {
    const { errors, loading, personData } = this.state;

    return (
      <div>
        {errors.global && (
          <Message size='mini' negative>
            {errors.global}
          </Message>
        )}

        {this.props.vehicleId && (
            <div>
              <Header as="h4">Add user to vehicle</Header>
              <Segment loading={loading}>
                <SearchPersonDropdown error={errors.person} onSelect={this.onChange} />
                <Divider />
                <RolesDropdown
                  error={errors.role}
                  roles={this.props.roles}
                  onSelect={this.onChange}
                />

                {this.isTempUser(personData.roleCode) && (
                  <div>
                    <div className={segmentHeading}>Temporary permit duration: </div>
                    <Datepicker
                      error={errors.validFrom}
                      type="validFrom"
                      onSelect={this.onChange}
                      selected={personData.validFrom}
                    />
                    <Datepicker
                      error={errors.validTo}
                      type="validTo"
                      onSelect={this.onChange}
                      selected={personData.validTo}
                    />
                    <div>
                      <Button
                        size="tiny"
                        onClick={this.handleQuickDuration.bind(null, 1, "months")}
                      >
                        1 month
                      </Button>
                      <Button
                        size="tiny"
                        onClick={this.handleQuickDuration.bind(null, 3, "months")}
                      >
                        3 months
                      </Button>
                      <Button
                        size="tiny"
                        onClick={this.handleQuickDuration.bind(null, 1, "years")}>
                        1 year
                      </Button>
                    </div>
                  </div>
                )}

                <Divider />
                <Button
                  disabled={loading}
                  size="tiny"
                  primary
                  fluid
                  onClick={this.onSubmit}
                >
                  Add user
                </Button>
              </Segment>
            </div>
          )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    vehicleId: state.vehicle.id,
    vehicleUsers: Object.keys(state.vehicleUsers).length
      ? vehicleUsersSelector(state)
      : [],
    roles: state.roles,
    vehicleUsersObj: state.vehicleUsers
  };
};


export default connect(mapStateToProps, { addUser })(AddUser)
