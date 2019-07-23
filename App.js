/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, useEffect, useState} from 'react'
import {Animated, StatusBar} from 'react-native'

import './FileReader'

import decode from '@core/decode'
import buildAudioPeaks from '@core/buildAudioPeaks'
import WaveSurfer from '@core/WaveSurfer'

const App = () => {
  const [peaks, setPeaks] = useState([])
  const animatedValue = new Animated.Value(0)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3'
      )
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await decode(arrayBuffer)
      const peaks = buildAudioPeaks(audioBuffer)

      setPeaks(peaks)
    }

    fetchData()
  }, [])

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <WaveSurfer peaks={peaks} animatedValue={animatedValue} />
    </Fragment>
  )
}

export default App
