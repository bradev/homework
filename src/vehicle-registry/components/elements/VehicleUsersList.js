import React from 'react';
import {
  Button,
  Table,
  Loader,
  Segment
} from "semantic-ui-react";
import { tRow } from './VehicleUsersList.css';


const VehicleUsersList = ({users, remove, loadingUsers, removingUser, roles}) => {

  const validityPeriod = (from, to) => {
    return from && to ? `${from} to ${to}` : 'none';
  }

  const rows = users.map(user =>
    <Table.Row key={user.id} className={tRow}>
      <Table.Cell>{user.personalId}</Table.Cell>
      <Table.Cell>{`${user.firstName} ${user.lastName}`}</Table.Cell>
      <Table.Cell>{roles[user.roleCode] || user.roleCode}</Table.Cell>
      <Table.Cell>{validityPeriod(user.validFrom, user.validTo)}</Table.Cell>
      <Table.Cell>
        <Button
          loading={removingUser}
          size="tiny"
          primary
          fluid
          onClick={e => remove(user.id)}
        >
          Remove
        </Button>
      </Table.Cell>
    </Table.Row>
  );

  return (
    <div>
      <Segment as="h4" textAlign="center" attached="top">
        Persons associated with this vehicle
      </Segment>

      <Loader active={loadingUsers} inline='centered' />
      {
        !loadingUsers &&
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Personal ID</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Validity period</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows}
          </Table.Body>
        </Table>
      }
    </div>
  )
}

export default VehicleUsersList;
