import React from 'react';
import { connect } from 'react-redux'
import { Table, Header } from 'semantic-ui-react'

const Vehicle = ({ vehicle }) => {

  const vehicleExists = !!Object.keys(vehicle).length;
  const { plateNumber, brand, color } = vehicle;

  return (
    <div>
      {vehicleExists && (
        <div>
          <Header as='h4'>Vehicle data</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Brand</Table.HeaderCell>
                <Table.HeaderCell>Plate number</Table.HeaderCell>
                <Table.HeaderCell>Color</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{brand}</Table.Cell>
                <Table.Cell>{plateNumber}</Table.Cell>
                <Table.Cell>{color}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>)}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    vehicle: state.vehicle
  }
}

export default connect(mapStateToProps)(Vehicle)
