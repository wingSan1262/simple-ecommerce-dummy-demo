import {baseApi} from '../../ApiClient';
import {NewsResponse} from './types';

export const newsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getNewsList: build.query<NewsResponse, {}>({
      query: () => ({
        url: '/v2/top-headlines?country=us&apiKey=bd3e283759ad4ac5a2adefbf32356380',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useGetNewsListQuery} = newsApi;
