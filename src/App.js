import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import InicioPagina from './Pages/InicioPagina'
import ServiciosPagina from './Pages/ServiciosPagina'
import FulfillmentPagina from './Pages/FulfillmentPagina'
import RastreoPagina from './Pages/RastreoPagina'
import ContactoPagina from './Pages/ContactoPagina'
import SignUpPagina from './Pages/SignUpPagina'
import SignInPagina from './Pages/SignInPagina'
import ForgotPasswordPagina from './Pages/ForgotPasswordPagina'
import CreateGuidePagina from './Pages/CreateGuidePagina'
import RecargarSaldoPagina from './Pages/RecargarSaldoPagina'

//Private Route Component
import PrivateRoute from './components/routing/PrivateRoute'
import ResetPasswordPagina from './Pages/ResetPasswordPagina';
import UserDashboard from './Pages/UserDashboard';

function App() {
  return (
    <Router>
          <div>
            <Switch>
              <Route exact path="/">
                <InicioPagina/>
              </Route>
              <Route exact path="/servicios">
                <ServiciosPagina/>
              </Route>
              <Route exact path="/fulfillment">
                <FulfillmentPagina />
              </Route>
              <Route exact path="/rastreo">
                <RastreoPagina />
              </Route>
              <Route exact path="/rastreo/:guide">
                <RastreoPagina />
              </Route>
              <Route exact path="/contacto">
                <ContactoPagina />
              </Route>
              <Route exact path="/signin">
                <SignInPagina />
              </Route>
              <Route exact path="/signup">
                <SignUpPagina/>
              </Route>
              <Route exact path="/forgotpassword">
                <ForgotPasswordPagina/>
              </Route>
              <Route exact path="/passwordreset/:resetToken">
                <ResetPasswordPagina/>
              </Route>
              <Route exact path="/createguide">
                <CreateGuidePagina/>
              </Route>
              
              <PrivateRoute exact path="/userdashboard" component={UserDashboard} >
              </PrivateRoute>

              <PrivateRoute exact path="/cotizar" component={UserDashboard} >
              </PrivateRoute>

              <PrivateRoute exact path="/createguide" component={CreateGuidePagina} >
              </PrivateRoute>

              <PrivateRoute exact path="/recargarsaldo" component={RecargarSaldoPagina} >
              </PrivateRoute>

            </Switch>
          </div>
      </Router>
  );
}

export default App;
