import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import './vibe/scss/styles.scss';

import Firebase, { FirebaseProvider } from './firebase'

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <FirebaseProvider value={Firebase}>
          <Route component={DashboardLayout} />
        </FirebaseProvider>
      </Switch>
    </BrowserRouter>
  );
}
