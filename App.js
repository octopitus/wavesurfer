/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'

import './FileReader'
import WaveSurfer from '@core/WaveSurfer'

const App = () => {
  return (
    <WaveSurfer
      source={{
        uri:
          'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3'
      }}
    />
  )
}

export default App
