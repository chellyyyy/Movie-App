import React, { useRef, useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, TouchableOpacity, Text, Modal, Picker, Button } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Mainstyles, Buttonstyles, theme } from '../theme';
import { getYoutubedUrl, getSmashystreamUrl, getSuperembedUrl, get2embedUrl } from '../api/moviedb';

const GoBack = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.buttonBack}
      onPress={() => navigation.goBack()}
    >
      <ChevronLeftIcon width={28} height={28} color="white" />
    </TouchableOpacity>
  );
};

const PlayerScreen = () => {
  const { params } = useRoute();

  return (
    <View style={styles.container}>
      <GoBack />

      {/* Video Player */}
      <WebView source={{ uri: getSmashystreamUrl(params.id) }} style={styles.webView} />
    </View>
  );
};

const TrailerScreen = () => {
  const { params } = useRoute();

  return (
    <View style={styles.container}>
      <GoBack />
      
      {/* Video Player */}
      <WebView source={{ uri: getYoutubedUrl(params.id) }} style={styles.webView} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  buttonBack: {
    position: 'absolute',
    top: 30,
    left: 20,
    borderRadius: 10,
    padding: 1,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  webView: {
    flex: 1,
  },
});

export { PlayerScreen, TrailerScreen };