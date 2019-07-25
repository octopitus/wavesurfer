import React, {useState, useRef} from 'react'
import {Image, View, Animated, Text} from 'react-native'

import play from '@assets/play.png'
import next from '@assets/next.png'
import previous from '@assets/previous.png'

import {Track} from './interfaces'
import styles from './styles'
import WaveSurfer from '@core/WaveSurfer'

interface Props {
  track: Track
}

const Slide = (props: Props) => {
  const [playing, setPlaying] = useState(false)
  const aniamtedValue = useRef(new Animated.Value(0)).current
  const cover = props.track.album.images[0].url
  const artistNames = props.track.artists.map(artist => {
    return artist.name
  })

  return (
    <View style={styles.slide}>
      <Image source={{uri: cover}} style={styles.cover} />
      <View style={styles.panelContent}>
        <View style={[styles.cover, styles.overlay]} />
        <Text style={styles.slideHeader}>{props.track.name}</Text>
        <Text style={styles.slideSubHeader}>{artistNames.join(', ')}</Text>
        <View style={styles.btnGroup}>
          <Image source={previous} style={styles.btn} />
          <Image source={play} style={[styles.btn, styles.playBtn]} />
          <Image source={next} style={styles.btn} />
        </View>
        <WaveSurfer
          playing={playing}
          animatedValue={aniamtedValue}
          source={{uri: props.track.preview_url}}
          activeColor="#FFFFFF"
          inactiveColor="#adb5bd"
        />
      </View>
    </View>
  )
}

export default Slide
