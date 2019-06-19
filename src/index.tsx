import * as React from "react";
import * as ReactDOM from "react-dom";

import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "./theme";
import Dashboard from "./Dashboard";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
const client = new ApolloClient({
  uri: "http://localhost:5000/query"
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ApolloProvider client={client}>
      <Dashboard />
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
