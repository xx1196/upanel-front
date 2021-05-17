import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import {ThemeProvider} from "@material-ui/core/styles";

import theme from "assets/theme/theme.js";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

//redux
import {Provider} from "react-redux";
import generateStore from "./redux/store";
import {ApolloProvider} from "react-apollo";
import {ApolloClient} from "apollo-boost";

let WithThemeProvider = () => <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline/>
    <BrowserRouter>
        <Switch>
            <Route path="/admin" render={(props) => <AdminLayout {...props} />}/>
            <Route path="/auth" render={(props) => <AuthLayout {...props} />}/>
            <Redirect from="/" to="/admin/index"/>
        </Switch>
    </BrowserRouter>
</ThemeProvider>;

let store = generateStore();
let client = new ApolloClient({
    uri: "http://localhost:8000/graphql"
});

let WithProvider = () => <Provider store={store}><WithThemeProvider/></Provider>;

let WithApollo = () => <ApolloProvider client={client}><WithProvider/></ApolloProvider>

ReactDOM.render(
    <WithApollo/>,
    document.querySelector("#root")
);
