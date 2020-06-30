import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboarb from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboarb} />
    <Route path="/repository" component={Repository} />
  </Switch>
);

export default Routes;
