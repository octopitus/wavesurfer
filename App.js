/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar
} from "react-native";

import "./FileReader";

const { width } = Dimensions.get("screen");
const AudioContext = require("web-audio-engine").RenderingAudioContext;
const context = new AudioContext();

const App = () => {
  const [peaks, setPeaks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://file-examples.com/wp-content/uploads/2017/11/file_example_WAV_1MG.wav"
      );
      const buffer = await response.arrayBuffer();
      const audioBuffer = await context.decodeAudioData(buffer);
      const leftChannel = audioBuffer.getChannelData(0);

      const numberOfBlocks = 200;
      const eachBlockHeight = 8;
      const blockGap = leftChannel.length / numberOfBlocks;
      const _peaks = [];

      for (let i = 0; i < numberOfBlocks; i++) {
        const audioBufferKey = Math.floor(blockGap * i);
        const blockWidth = Math.abs(leftChannel[audioBufferKey] * width);
        _peaks.push({ width: blockWidth, height: eachBlockHeight });
      }

      setPeaks(_peaks);
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {peaks.map((peak, index) => (
            <View key={index} style={[styles.peak, peak]} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scroll: {
    alignItems: "center"
  },
  peak: {
    backgroundColor: "red"
  }
});

export default App;
