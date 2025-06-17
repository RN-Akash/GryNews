import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = 'BOOKMARKS';

export const toggleBookmark = async (article) => {
  try {
    const existing = await AsyncStorage.getItem(BOOKMARKS_KEY);
    let bookmarks = existing ? JSON.parse(existing) : [];
    const index = bookmarks.findIndex((item) => item.url === article.url);
    if (index !== -1) {
      bookmarks.splice(index, 1);
    } else {
      bookmarks.push(article);
    }
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    return bookmarks;
  } catch (e) {
    console.error('Error toggling bookmark', e);
    return [];
  }
};

export const getBookmarks = async () => {
  try {
    const data = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error get bookmarks', e);
    return [];
  }
};

export const isBookmarked = async (articleUrl) => {
  try {
    const existing = await AsyncStorage.getItem(BOOKMARKS_KEY);
    const bookmarks = existing ? JSON.parse(existing) : [];
    return bookmarks.some((item) => item.url === articleUrl);
  } catch (e) {
    console.error('Error checking bookmark', e);
    return false;
  }
};
