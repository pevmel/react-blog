import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from "../configureStore";

import Categories from "./Categories";

const store = configureStore();

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Categories} />
            <Route path="/number" render={() => ("Category")} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App
