/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react'
import {YellowBox, SafeAreaView} from 'react-native'

import './FileReader'

import SwipeablePlayer from './src/SwipeablePlayer'
import PlayList from './src/PlayList'
import {Track} from './src/interfaces'

YellowBox.ignoreWarnings(['Warning: '])

const App = () => {
  const [track, setTrack] = useState<Track>(null)

  return (
    <SafeAreaView style={{flex: 1}}>
      <PlayList selectedTrack={track} onChange={setTrack} />
      <SwipeablePlayer selectedTrack={track} onChange={setTrack} />
    </SafeAreaView>
  )
}

export default App
