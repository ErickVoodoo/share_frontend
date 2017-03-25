/* @flow */

import { isObject } from 'lodash';
import axios from 'axios';

export type Props = {
  path: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  headers?: Object;
  body?: Object;
};

// $FlowIssue
export default function ({ path: url, method = 'GET', body = {}, headers = {} }: Props) {
  return axios({
    url,
    method,
    data: body && isObject(body) && !(body instanceof FormData) ? JSON.stringify(body) : body,
    headers,
  })
    .then((response) => {
      if (response && response.data) {
        return response.data;
      }

      return Promise.resolve();
    })
    .catch(({ response: { data } }) => {
      return Promise.reject(data);
    });
}
