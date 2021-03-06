import React, {Component} from 'react'
import {ScrollView} from 'react-native'

import samples from './samples'
import {Track as TrackType} from './interfaces'
import Track from './Track'

interface Props {
  onChange: (track: TrackType) => void
}

class PlayList extends Component<Props> {
  render() {
    return (
      <>
        <ScrollView>
          {samples.tracks.map(track => (
            <Track
              key={track.id}
              track={track}
              onSelect={this.props.onChange}
            />
          ))}
        </ScrollView>
      </>
    )
  }
}

export default PlayList
