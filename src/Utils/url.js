// @flow

import { isFunction } from 'lodash';
import createHistory from 'history/createBrowserHistory'
import queryString from 'query-string';

const history = createHistory();

export const addQuery = (query: Object): void => {
  const location: Object = Object.assign({}, history.location);
  const search: string = Object.assign(queryString.parse(location.search), query);
  location.search = queryString.stringify(search);
  history.push(location);
};

export const removeQuery = (queryNames: Array<string>): void => {
  const location = Object.assign({}, history.location);
  const search: Array<string> = queryString.parse(location.search);
  // $FlowIssue
  queryNames.forEach((q: string) => delete search[q]);
  location.search = queryString.stringify(search);
  history.push(location);
};

export const clearQuery = (): void => {
  const location = Object.assign({}, history.location);
  location.search = '';
  history.push(location);
};

export const getFromQuery = (name: string): string => {
  const location = Object.assign({}, history.location);
  return queryString.parse(location.search)[name];
};

export const getSearchParams = (): Object => {
  const location = Object.assign({}, history.location);
  return queryString.parse(location.search);
}

export const subscribeHistory = (callback: Function): void => {
  const unlisten = history.listen((location, action) => {
    if (isFunction(callback)) {
      callback();
    }
  })

  return unlisten;
};
