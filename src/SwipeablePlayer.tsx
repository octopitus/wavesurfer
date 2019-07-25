import React, {Component} from 'react'

import SlidingUpPanel from 'rn-sliding-up-panel'
// @ts-ignore
import {visibleHeight, statusBarHeight} from 'rn-sliding-up-panel/libs/layout'
import Swiper from 'react-native-swiper'

import Slide from './Slide'
import samples from './samples'
import styles from './styles'

const height = visibleHeight() - statusBarHeight()

class SwipeablePlayer extends Component {
  render() {
    return (
      <SlidingUpPanel
        draggableRange={{top: height, bottom: 120}}
        snappingPoints={[height, 120]}
        containerStyle={styles.panel}>
        <Swiper showsButtons={false} showsPagination={false} loop={false}>
          {samples.tracks.map(track => (
            <Slide key={track.id} track={track} />
          ))}
        </Swiper>
      </SlidingUpPanel>
    )
  }
}

export default SwipeablePlayer
