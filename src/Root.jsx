import React, { Component } from "react";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader";

import Application from "./layouts/Application";
import ErrorBoundary from "./components/globals/ErrorBoundary/ErrorBoundary";
import Fatal from "./pages/error/Fatal";
import store from "./reduxStore";
import { logger } from "./shared/utils";
import { Setting } from "./shared/constants";

import "./Root.scss";

class Root extends Component {
  state = {
    restartCounts: 0
  };

  componentDidMount() {
    window.addEventListener("error", this.handleUncaughtError);
    store.runRootSaga();
  }

  componentWillUnmount() {
    const task = store.getRootTask();
    if (task) task.cancel();
    window.removeEventListener("error", this.handleUncaughtError);
  }

  handleUncaughtError = err => {
    logger.log("error", JSON.stringify(logger.parseError(err)));
    return store
      .restartRootSagaAsync()
      .then(task => {
        console.log("Uncaught error detected, restart all sagas", task.id);
        return task;
      })
      .catch(sagaError => {
        logger.log("error", JSON.stringify(logger.parseError(sagaError)));
      });
  };

  handleErrorBoundaryError = ({ error, errorInfo, clearError }) => {
    this.handleUncaughtError(error).then(() => {
      if (this.state.restartCounts <= Setting.MAX_RETRY_TIMES) {
        clearError();
        this.setState(prev => ({ restartCounts: prev.restartCounts + 1 }));
      }
    });
  };

  render() {
    return (
      <ErrorBoundary
        renderError={Fatal}
        onError={this.handleErrorBoundaryError}
      >
        <Provider store={store}>
          <Application />
        </Provider>
      </ErrorBoundary>
    );
  }
}

export default hot(module)(Root);
