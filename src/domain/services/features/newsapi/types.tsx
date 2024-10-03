export type NewsResponse = {
  status?: string | null;
  totalResults?: number | null;
  articles: Articles[];
};

export type Source = {
  id?: string | null;
  name?: string | null;
};

export type Articles = {
  source?: Source;
  author?: string | null;
  title?: string | null;
  description?: string | null;
  url?: string | null;
  urlToImage?: string | null;
  publishedAt?: string | null;
  content?: string | null;
};

/**
 * @GET("v2/top-headlines")
 *    suspend fun getTemperatureChart(
 *         @Query("country") country : String = "us",
 *         @Query("apiKey") apiKey : String = "bd3e283759ad4ac5a2adefbf32356380",
 *     ): NewsResponse
 */

export type HeadlineRequest = {
  country: string;
  apiKey: string;
};

export const requestNews: HeadlineRequest = {
  country: 'us',
  apiKey: 'bd3e283759ad4ac5a2adefbf32356380',
};
