import React from 'react';
import { Route, Switch } from 'react-router-dom';
import VehicleRegistry from './vehicle-registry/';
import NotFoundPage from './common/components/pages/NotFoundPage';

const App = () => {
  return (
    <div className="ui container">
      <Switch>
        <Route path="/" exact component={VehicleRegistry} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  )
}

export default App;
