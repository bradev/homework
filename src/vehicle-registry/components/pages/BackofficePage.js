import React from 'react';
import { Grid, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import SearchVehicle from './../parts/SearchVehicle';
import Vehicle from './../parts/Vehicle';
import AddUser from './../parts/AddUser';
import VehicleUsers from './../parts/VehicleUsers';
import { fetchRoles } from './../../actions/roles';
import { wrapper } from './BackofficePage.css';

class BackofficePage extends React.Component {

  componentDidMount() {
    this.props.fetchRoles();
  }

  render() {
    return (
      <div className={wrapper}>
        <Header textAlign="center" as="h2">
          Vehicle registry backoffice
        </Header>

        <SearchVehicle />

        <Grid columns="equal">
          <Grid.Column>
            <Vehicle />
          </Grid.Column>
          <Grid.Column>
            <AddUser />
          </Grid.Column>
        </Grid>

        <VehicleUsers />
      </div>
    )
  }

}

export default connect(null, { fetchRoles })(BackofficePage)
