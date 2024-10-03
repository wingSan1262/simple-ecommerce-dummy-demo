import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {
  Articles,
  useGetNewsListQuery,
} from '../domain/services/features/newsapi';
import {ShowError} from '../base/hooks';
import {setCurrentNews} from '../base/store';
import {useTheme} from 'react-native-paper';

export const NewsListHooks = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const chooseNews = (it: Articles) => {
    dispatch(setCurrentNews(it));
  };

  const {
    data: newsData,
    isLoading: isLoadNews,
    isError: isErrorNews,
    error: errorNews,
    refetch: refetchNews,
  } = useGetNewsListQuery({});
  ShowError(isErrorNews, errorNews);

  return {
    t,
    dispatch,
    newsData,
    isLoadNews,
    refetchNews,
    chooseNews,
    colors
  };
};
