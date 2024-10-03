import {fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://newsapi.org',
  prepareHeaders: async (headers: Headers) => {
    return await getHeader(headers);
  },
});

export const getHeader = async (headers: Headers) => {
  // headers.set('X-Current-Unit-Of-Work', store.getState().main.lastUnitOfWork);
  // headers.set('Content-Type', 'application/octet-stream');
  // headers.set('Accept', 'application/octet-stream');
  // headers.set('X-Forwarded-Host', Config.BASE_URL ?? '');

  return headers;
};
