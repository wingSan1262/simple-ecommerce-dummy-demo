import React from 'react';
import {RefreshControl, SafeAreaView, ScrollView, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import '../../base';
import {navigate} from '../../base/navigationstheme/Navigator';
import ContentNews from '../component/ContentNews';
import {NewsListHooks} from '../NewsListHooks';

export function NewsList() {
  const {newsData, chooseNews, isLoadNews, colors, refetchNews} =
    NewsListHooks();

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl
            refreshing={isLoadNews}
            colors={[colors.primary]}
            onRefresh={refetchNews}
          />
        }>
        <View
          style={{
            backgroundColor: Colors.white,
          }}>
          {newsData?.articles.map((value, index) => (
            <View key={index}>
              <ContentNews
                article={value}
                onSelectTask={it => {
                  chooseNews(it);
                  navigate('NewsDetail');
                }}
                isRight={index % 2 == 0}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
