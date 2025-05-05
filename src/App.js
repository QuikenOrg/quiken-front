import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import InicioPagina from "./Pages/InicioPagina";
import ServiciosPagina from "./Pages/ServiciosPagina";
import FulfillmentPagina from "./Pages/FulfillmentPagina";
import RastreoPagina from "./Pages/RastreoPagina";
import ContactoPagina from "./Pages/ContactoPagina";
import SignUpPagina from "./Pages/SignUpPagina";
import SignInPagina from "./Pages/SignInPagina";
import ForgotPasswordPagina from "./Pages/ForgotPasswordPagina";
import CreateGuidePagina from "./Pages/CreateGuidePagina";
import RecargarSaldoPagina from "./Pages/RecargarSaldoPagina";

//Private Route Component
import PrivateRoute from "./components/routing/PrivateRoute";
import ResetPasswordPagina from "./Pages/ResetPasswordPagina";
import UserDashboard from "./Pages/UserDashboard";
import NewDashboard from "./Pages/NewDashboard";
import NewGuias from "./Pages/NewGuias";
import NewRecargar from "./Pages/NewRecargar";
import NewCotizar from "./Pages/NewCotizar";
import NewCreateGuide from "./Pages/NewCreateGuide";
import MyPayments from "./Pages/MyPayments";
import { UserContextProvider } from "./components/Context/UserContext";
import { HelmetProvider } from "react-helmet-async";


function App() {
  return (
    <HelmetProvider>
    <UserContextProvider>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <InicioPagina />
            </Route>
            <Route exact path="/servicios">
              <ServiciosPagina />
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
              <SignUpPagina />
            </Route>
            <Route exact path="/forgotpassword">
              <ForgotPasswordPagina />
            </Route>
            <Route exact path="/passwordreset/:resetToken">
              <ResetPasswordPagina />
            </Route>
            <Route exact path="/createguide">
              <CreateGuidePagina />
            </Route>

            <PrivateRoute
              exact
              path="/userdashboard"
              component={UserDashboard}
            ></PrivateRoute>

            <PrivateRoute
              exact
              path="/cotizar"
              component={UserDashboard}
            ></PrivateRoute>

            {/* Nuevas Private Routes */}
            <PrivateRoute
              exact
              path="/newdashboard"
              component={NewDashboard}
            ></PrivateRoute>

            <PrivateRoute
              exact
              path="/newmyguides"
              component={NewGuias}
            ></PrivateRoute>

            <PrivateRoute
              exact
              path="/mypayments"
              component={MyPayments}
            ></PrivateRoute>

            <PrivateRoute
              exact
              path="/newrecargar"
              component={NewRecargar}
            ></PrivateRoute>

            <PrivateRoute
              exact
              path="/newcreateguide"
              component={NewCreateGuide}
            ></PrivateRoute>

            <PrivateRoute
              exact
              path="/newcotizar"
              component={NewCotizar}
            ></PrivateRoute>

            <PrivateRoute
              exact
              path="/createguide"
              component={CreateGuidePagina}
            ></PrivateRoute>

            <PrivateRoute
              exact
              path="/recargarsaldo"
              component={RecargarSaldoPagina}
            ></PrivateRoute>
          </Switch>
        </div>
      </Router>
    </UserContextProvider>
    </HelmetProvider>
  );
}

export default App;
