import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import SearchVehicleForm from "./../forms/SearchVehicleForm";
import { searchByPlateNumber } from './../../actions/vehicle';

class SearchVehicle extends React.Component {
  submit = nr => this.props.searchByPlateNumber(nr)

  render() {
    return (
      <Grid centered>
        <Grid.Column mobile={16} tablet={10} computer={6}>
          <SearchVehicleForm submit={this.submit} />
        </Grid.Column>
      </Grid>
    );
  }
}

SearchVehicle.propTypes = {
  searchByPlateNumber: PropTypes.func.isRequired
};

export default connect(null, { searchByPlateNumber })(SearchVehicle);
