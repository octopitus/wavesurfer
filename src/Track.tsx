import React, {Component} from 'react'
import {View, Image, Text, TouchableWithoutFeedback} from 'react-native'

import play from '@assets/play.png'
import plause from '@assets/pause.png'
import {Track as TrackType} from './interfaces'
import getTrackDuration from './getTrackDuration'
import styles from './styles'

interface Props {
  track: TrackType
  onSelect: (track: TrackType) => void
}

class Track extends Component<Props> {
  render() {
    const uri = this.props.track.album.images[0].url
    const trackName = this.props.track.name
    const duration = getTrackDuration(this.props.track.duration_ms)
    const artistNames = this.props.track.artists.map(artist => {
      return artist.name
    })

    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.onSelect(this.props.track)}>
        <View style={styles.container}>
          <Image source={{uri}} style={styles.thumb} />
          <View style={styles.content}>
            <Text style={styles.trackName}>{trackName}</Text>
            <Text style={styles.artistName}>{artistNames.join(', ')}</Text>
          </View>
          <Text style={styles.duration}>
            {duration.minute + ':' + duration.second}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default Track
