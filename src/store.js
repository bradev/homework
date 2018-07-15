import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './rootReducer';

const middlewares = [
  thunk
];
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({/* Options */});
  middlewares.push(logger);
}
const middleware = applyMiddleware(...middlewares);
const composeEnhancers = composeWithDevTools({/* Options */});

export default createStore(
  rootReducer,
  {},
  composeEnhancers(middleware)
);
