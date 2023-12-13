import React, { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { View, StyleSheet, TouchableOpacity, Text, Modal, Picker } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Mainstyles, Buttonstyles, theme } from '../theme';

const VideoScreen = () => {
  const video = useRef(null);
  const navigation = useNavigation();
  const [status, setStatus] = useState({});
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('auto');

  const togglePlaying = () => {
    if (status.isLoaded) {
      if (status.isPlaying) {
        video.current.pauseAsync();
      } else {
        video.current.playAsync();
      }
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const skipForwardOrBackward = (isForward) => {
    const offset = isForward ? 10000 : -10000;
    const newPosition = status.positionMillis + offset;
    video.current.setPositionAsync(newPosition);
  };

  const handleSeeking = (value) => {
    setIsSeeking(true);
    const newPosition = value * status.durationMillis;
    video.current.setPositionAsync(newPosition);
  };

  const handleSeekingComplete = () => {
    setIsSeeking(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
  };

  const handleQualityChange = (value) => {
    setSelectedQuality(value);
    video.current.setPreferredPeakBitRateAsync(value === 'auto' ? undefined : parseInt(value));
  };

  useEffect(() => {
    // Autoplay the video when the component is mounted
    if (status.isLoaded && !status.isPlaying) {
      video.current.playAsync();
    }
  }, [status.isLoaded]);

  const renderPickerItems = (items) => {
    return items.map((item) => (
      <Picker.Item key={item.value} label={item.label} value={item.value} />
    ));
  };

  return (
    <View style={isFullScreen ? styles.fullScreenContainer : styles.container}>
      <TouchableOpacity style={[Buttonstyles.background, { borderRadius: 10, padding: 1, width: 30, marginHorizontal: 20, marginVertical: 10 }]} onPress={() => navigation.goBack()}>
        <ChevronLeftIcon width={28} height={28} color="white" />
      </TouchableOpacity>

      {/* Video Player */}
      <Video
        ref={video}
        style={isFullScreen ? styles.fullScreenVideo : styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        preferredPeakBitRate={selectedQuality === 'auto' ? undefined : parseInt(selectedQuality)}
      />

      {/* Playback Controls */}
      <View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {formatTime(isSeeking ? status.positionMillis : status.positionMillis)}
          </Text>
          <Text style={styles.timeText}>{formatTime(status.durationMillis)}</Text>
        </View>

        <Slider
          style={styles.slider}
          minimumTrackTintColor={theme.mainColor}
          minimumValue={0}
          maximumTrackTintColor={theme.subBackground}
          maximumValue={1}
          thumbTintColor={theme.mainColor}
          thumbStyle={{ width: 10, height: 10 }}
          value={isSeeking ? status.positionMillis / status.durationMillis : status.positionMillis / status.durationMillis}
          onValueChange={handleSeeking}
          onSlidingComplete={handleSeekingComplete}
        />
      </View>

      {/* Control Buttons */}
      <View style={styles.buttonsContainer}>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => skipForwardOrBackward(false)}>
            <MaterialCommunityIcons name={'skip-backward'} size={25} color={'white'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={togglePlaying}>
            <MaterialCommunityIcons name={status.isPlaying ? 'pause' : 'play'} size={25} color={'white'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => skipForwardOrBackward(true)}>
            <MaterialCommunityIcons name={'skip-forward'} size={25} color={'white'} />
          </TouchableOpacity>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => setShowCaptions(true)}>
            <MaterialCommunityIcons name={'closed-caption'} size={25} color={'white'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowSettings(true)}>
            <MaterialIcons name={'settings'} size={25} color={'white'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleFullScreen}>
            <MaterialCommunityIcons name={isFullScreen ? 'fullscreen-exit' : 'fullscreen'} size={25} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Subtitles Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCaptions}
        onRequestClose={() => setShowCaptions(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Subtitles</Text>
            <Picker
              style={{ backgroundColor: theme.subBackground, color: 'white' }}
              selectedValue={selectedQuality}
              onValueChange={handleQualityChange}
            >
              {renderPickerItems([
                { label: 'Vietnamese', value: 'auto' },
                { label: 'English', value: '1000' },
              ])}
            </Picker>

            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowCaptions(false)}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Settings Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSettings}
        onRequestClose={() => setShowSettings(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Video Quality</Text>
            <Picker
              style={{ backgroundColor: theme.subBackground, color: 'white' }}
              selectedValue={selectedQuality}
              onValueChange={handleQualityChange}
            >
              {renderPickerItems([
                { label: '360p', value: 'auto' },
                { label: '720p', value: '200' },
                { label: '1080p', value: '500' },
                { label: '2K', value: '1000' },
              ])}
            </Picker>

            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowSettings(false)}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

export default VideoScreen;