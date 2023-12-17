import React, { useRef, useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { View, StyleSheet, TouchableOpacity, Text, Modal, Picker, Button } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Mainstyles, Buttonstyles, theme } from '../theme';
import { getSmashystreamUrl, getSuperembedUrl, get2embedUrl } from '../api/moviedb';

const PlayerScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[Buttonstyles.background, { borderRadius: 10, padding: 1, width: 30, marginHorizontal: 20, marginVertical: 10 }]} onPress={() => navigation.goBack()}>
        <ChevronLeftIcon width={28} height={28} color="white" />
      </TouchableOpacity>

      {/* Video Player */}
      <iframe
        allowFullScreen
        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        source={{ uri: get2embedUrl(params.id) }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.background,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: theme.background,
  },
  video: {
    alignSelf: 'center',
    width: '100%',
    height: 200,
  },
  fullScreenVideo: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: 'white',
  },
  slider: {},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: theme.subBackground,
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalCloseButton: {
    flexDirection: 'row-reverse',
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: theme.mainColor,
  },
});

export default PlayerScreen;