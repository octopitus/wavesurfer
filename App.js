/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react'

import './FileReader'
import WaveSurfer from '@core/WaveSurfer'
import PlayList from './src/PlayList'
import {Track} from './src/interfaces'

const App = () => {
  const [track, setTrack] = useState<Track>(null)

  return (
    <>
      <PlayList onTrackSelect={setTrack} />
      {track ? <WaveSurfer source={{uri: track.preview_url}} /> : null}
    </>
  )
}

export default App
