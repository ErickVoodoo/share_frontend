// @flow

import { Observable } from 'rxjs/Rx';
import queryString from 'query-string';

import { GET_INITIAL, GET_ATTRIBUTES } from '../../Constants/Actions/core.js';
import { successGetInitial, failGetInitial, successGetAttributes, failGetAttributes } from '../Actions/core.js';
import { startProgressBar, stopProgressBar } from '../Actions/behaviors.js';

import { ABORT_REQUEST } from '../../Constants/Actions/core.js';
import { PROGRESSBARS } from '../../Constants/progressbar.js';

import request from '../../Utils/request.js';

export const fetchInitialEpic = (action$: Object): Object =>
  action$.ofType(GET_INITIAL)
    .mergeMap(() =>
      Observable.create((observable) => {
        Promise.all([
          request({
            path: `http://localhost:8080/api/v1/countries`,
            method: 'GET',
          }),
          request({
            path: `http://localhost:8080/api/v1/categories`,
            method: 'GET',
          }),
          request({
            path: `http://localhost:8080/api/v1/delivers`,
            method: 'GET',
          }),
          request({
            path: `http://localhost:8080/api/v1/plans`,
            method: 'GET',
          })
        ])
          .then(([q, w, e, r]) => {
            setTimeout(() => {
              observable.next(successGetInitial(
                { payload:
                  {
                    countries: q.response.countries,
                    categories: w.response.categories,
                    delivers: e.response.delivers,
                    plans: r.response.plans,
                  }
                }
              ));
              observable.next(stopProgressBar(PROGRESSBARS.getInitial));
              observable.complete();
            }, 500);
          })
          .catch(({ error }) => {
            observable.next(failGetInitial({ error }));
            observable.next(stopProgressBar(PROGRESSBARS.getInitial));
            observable.complete();
          })
      })
      .startWith(startProgressBar(PROGRESSBARS.getInitial))
      .takeUntil(action$.ofType(ABORT_REQUEST))
    );


export const fetchAddresses = (action$: Object): Object =>
  action$.ofType(GET_ATTRIBUTES)
    .mergeMap(({ payload: { params }}) =>
      Observable.create((observable) => {
        request({
          path: `http://localhost:8080/api/v1/addresses?${queryString.stringify(params)}`,
          method: 'GET',
        })
          .then(({ response }) => {
            setTimeout(() => {
              observable.next(successGetAttributes(
                { payload:
                  {
                    cities: response.cities,
                    streets: response.streets,
                  }
                }
              ));
              observable.next(stopProgressBar(PROGRESSBARS.getAttributes));
              observable.complete();
            }, 500);
          })
          .catch(({ error }) => {
            observable.next(failGetAttributes({ error }));
            observable.next(stopProgressBar(PROGRESSBARS.getAttributes));
            observable.complete();
          })
      })
      .startWith(startProgressBar(PROGRESSBARS.getAttributes))
      .takeUntil(action$.ofType(ABORT_REQUEST))
    );
