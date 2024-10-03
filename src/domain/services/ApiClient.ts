import {createApi} from '@reduxjs/toolkit/dist/query/react';
import {baseQuery} from './baseQueries';

const reducerPathBaseApi = 'baseApi';

export const baseApi = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
  reducerPath: reducerPathBaseApi,
});

export const baseApiReducer = {[reducerPathBaseApi]: baseApi.reducer};
