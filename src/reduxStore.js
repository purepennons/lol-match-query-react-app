import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import reduxThunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";
import storage from "store";

import { __DEV__ } from "./config/env";
import { Storage } from "./shared/constants/";
import { rootReducer, getRootSaga } from "./features/";

let rootTask = null;

const sagaMiddleware = createSagaMiddleware();

const reduxLogger = createLogger();

const composeEnhancers = __DEV__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ serialize: true }) || compose
  : compose;
const middleware = [reduxThunk, sagaMiddleware];

if (__DEV__ || !!storage.get(Storage.DEBUG)) {
  middleware.push(reduxLogger);
}

const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(...middleware))
);

const runRootSaga = (getSaga = getRootSaga) => {
  return sagaMiddleware.run(function*() {
    yield fork(getSaga());
  });
};

const restartRootSagaAsync = (getSaga = getRootSaga) => {
  // Before changing to a new root saga task,
  // we must cancel the old one and wait until
  // the task has been done, or it will cause
  // two saga tasks running in the background
  // parallelly.
  return new Promise((resolve, reject) => {
    if (!rootTask) {
      rootTask = runRootSaga(getSaga);
      resolve(rootTask);
    } else {
      rootTask.cancel();
      rootTask.done
        .then(() => {
          rootTask = runRootSaga(getSaga);
          resolve(rootTask);
        })
        .catch(err => reject(err));
    }
  });
};

if (module.hot) {
  module.hot.accept("./features/", () => {
    const reduxModule = require("./features/");
    const nextRootReducer = reduxModule.rootReducer;
    const getNextRootSaga = reduxModule.getRootSaga;

    store.replaceReducer(nextRootReducer);
    restartRootSagaAsync(getNextRootSaga).then(task =>
      console.log("[HMR]: restart all sagas", task.id)
    );
  });
}

store.runSaga = sagaMiddleware.run;
// promise based api
store.restartRootSagaAsync = restartRootSagaAsync;
store.runRootSaga = restartRootSagaAsync;
store.getRootTask = () => rootTask;

export default store;
