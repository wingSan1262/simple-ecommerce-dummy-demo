import React from 'react';
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import {Text, Avatar, useTheme} from 'react-native-paper';

import '../../base';
import {useReduxSelector} from '../../base/store';
import {ShowFadeInSlideBottom} from '../../base/component/fadecontainer';
import {ShowSlideLeft} from '../../base/component/slidecontainer';
import {goBack} from '../../base/navigationstheme/Navigator';

export function NewsDetail() {
  const {currentNews} = useReduxSelector(s => s.app);
  const {colors} = useTheme();
  return (
    <SafeAreaView>
      <View>
        <Image
          source={{uri: currentNews.urlToImage || ''}}
          style={{width: '100%', height: 200}}
        />
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
          style={{position: 'absolute', top: 16, left: 16}}>
          <Avatar.Icon
            icon={'chevron-left'}
            size={40}
            color={'#fff'}
            style={{backgroundColor: colors.primary}}
          />
        </TouchableOpacity>
      </View>

      <ShowFadeInSlideBottom delay={200} style={{}}>
        <Text style={{textAlign: 'left', fontWeight: 'bold', fontSize: 20}}>
          {currentNews.title}
        </Text>
      </ShowFadeInSlideBottom>

      {currentNews.author && (
        <ShowFadeInSlideBottom delay={200} style={{}}>
          <Text style={{textAlign: 'justify', fontSize: 12, padding: 8}}>
            {currentNews.author}
          </Text>
        </ShowFadeInSlideBottom>
      )}

      {currentNews.source?.name && (
        <ShowFadeInSlideBottom delay={200} style={{}}>
          <Text style={{textAlign: 'justify', fontSize: 12, padding: 8}}>
            {currentNews.source.name}
          </Text>
        </ShowFadeInSlideBottom>
      )}

      <ShowFadeInSlideBottom delay={200} style={{}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 12,
            fontStyle: 'italic',
            paddingVertical: 16,
            paddingHorizontal: 32,
          }}>
          {currentNews.description ? `"${currentNews.description}"` : ''}
        </Text>
      </ShowFadeInSlideBottom>

      <ShowSlideLeft delay={200} isFromRight={false}>
        <Text
          style={{
            textAlign: 'justify',
            paddingVertical: 16,
            paddingHorizontal: 8,
          }}>
          {currentNews.content}
        </Text>
      </ShowSlideLeft>
    </SafeAreaView>
  );
}
