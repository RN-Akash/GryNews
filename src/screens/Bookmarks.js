import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet, } from 'react-native';
import { getBookmarks } from './storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function Bookmark() {

  const route = useNavigation();

  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getBookmarks();
      setBookmarks(data);
    };
    load();
  }, []);

  function NewsItem({ article }) {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => route.navigate('NewsDetails', { 'url': article?.url })}>
        {article.image_url && (
          <Image source={{ uri: article.image_url }} style={styles.thumbnail} />
        )}
        <View style={styles.textBlock}>
          <Text style={styles.titleNews} numberOfLines={2}>
            {article.title}
          </Text>
          <Text style={styles.description} numberOfLines={3}>
            {article.summary ?? ''}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={0.6} onPress={() => route.goBack()}>
            <Image source={require('../assets/backArrow.png')} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          <Text style={styles.title}>Bookmarks</Text>
        </View>

        {!bookmarks.length ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ padding: 20 }}>No bookmarks yet</Text>
          </View>
          :
          <>
            <FlatList
              data={bookmarks}
              keyExtractor={item => item.url}
              renderItem={({ item }) => <NewsItem article={item} />}
              showsVerticalScrollIndicator={false}
            />
          </>
        }
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    elevation: 4,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginStart: 20
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
  textBlock: { flex: 1, marginLeft: 10 },
  titleNews: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4
  },
  description: { color: '#555' },
  bookmark: { alignSelf: 'flex-end', marginTop: 8 },
});
