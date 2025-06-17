import React, { useEffect, useState } from 'react';
import {
  View, FlatList, Text, ActivityIndicator,
  StyleSheet, Image, TouchableOpacity
} from 'react-native';

import { toggleBookmark, isBookmarked } from '../screens/storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const url = 'https://api.spaceflightnewsapi.net/v4/articles/?limit=10&offset=10';

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkedMap, setBookmarkedMap] = useState({});

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const respo = await fetch(url);
      const JsonRespo = await respo.json();
      const articlesData = JsonRespo.results;

      // Check bookmark status for each article
      const map = {};
      for (const article of articlesData) {
        const status = await isBookmarked(article.url);
        map[article.url] = status;
      }

      setArticles(articlesData);
      setBookmarkedMap(map);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBookmark = async (article) => {
    await toggleBookmark(article);
    setBookmarkedMap(prev => ({
      ...prev,
      [article.url]: !prev[article.url],
    }));
  };

  const NewsItem = ({ article }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('NewsDetails', { url: article.url })}>

        {article.image_url && (
          <Image source={{ uri: article.image_url }} style={styles.thumbnail} />
        )}

        <View style={styles.textBlock}>
          <Text style={styles.titleNews} numberOfLines={2}>{article.title}</Text>
          <Text style={styles.description} numberOfLines={3}>{article.summary ?? ''}</Text>

          <TouchableOpacity
            style={styles.bookmark}
            activeOpacity={0.6}
            onPress={() => handleToggleBookmark(article)}>
            <Image
              source={
                bookmarkedMap[article.url]
                  ? require('../assets/mark.png')
                  : require('../assets/bookmark.png')
              }
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 10 }}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" style={{ marginTop: 50 }} />
          </View>
        ) : (
          <>
            <View style={styles.container}>
              <Text style={styles.title}>GryNews</Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate('Bookmarks')}>
                <Image
                  source={require('../assets/mark.png')}
                  style={{ width: 26, height: 26 }}
                />
              </TouchableOpacity>
            </View>

            <FlatList
              data={articles}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <NewsItem article={item} />}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    elevation: 4,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  textBlock: {
    flex: 1,
    marginLeft: 10,
  },
  titleNews: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: '#555',
  },
  bookmark: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
});
