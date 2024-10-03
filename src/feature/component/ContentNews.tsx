import React from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';

import {Text} from 'react-native-paper';
import {Articles} from '../../domain/services/features/newsapi';
import BackgroundGradationBox from '../../base/component/backgroundgradation';
import {ShowSlideLeft} from '../../base/component/slidecontainer';

interface ContentNewsProps {
  article: Articles;
  onSelectTask: (articles: Articles) => void;
  isRight: boolean;
}

const ContentNews: React.FC<ContentNewsProps> = ({
  article,
  onSelectTask,
  isRight,
}) => {
  return (
    <ShowSlideLeft delay={200} isFromRight={isRight}>
      <TouchableOpacity onPress={() => onSelectTask(article)}>
        <ImageBackground
          style={[
            styles.container,
            {
              alignItems: isRight ? 'flex-end' : 'flex-start',
            },
          ]}
          source={{uri: article.urlToImage ?? ''}}>
          <BackgroundGradationBox
            isRight={isRight}
            style={{
              height: '100%',
              width: '100%',
              zIndex: 5,
            }}>
            <Text style={styles.title}>{article.title || ''}</Text>
          </BackgroundGradationBox>
        </ImageBackground>
      </TouchableOpacity>
    </ShowSlideLeft>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    marginRight: 8,
    zIndex: 7,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    width: '50%',
    color: 'white',
    textAlign: 'justify',
  },
});

export default ContentNews;
