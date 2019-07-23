import React, {Component} from 'react'
import {View, Animated} from 'react-native'
import MaskedView from '@react-native-community/masked-view'

import styles from './styles'

interface Props {
  peaks: number[]
  animatedValue: Animated.Value
}

export default class WaveSurfer extends Component<Props> {
  static defaultProps = {
    animatedValue: new Animated.Value(0)
  }

  renderMask = () => {
    return (
      <View style={styles.maskContainer}>
        <View style={[styles.mask, {backgroundColor: 'red'}]} />
        <View style={[styles.mask, {backgroundColor: 'green'}]} />
      </View>
    )
  }

  renderElement = () => {
    return (
      <Animated.View
        style={[
          styles.peakContainer,
          {transform: [{translateX: this.props.animatedValue}]}
        ]}>
        {this.props.peaks.map((peak, index) => {
          return <View key={index} style={[styles.peak, {height: peak}]} />
        })}
      </Animated.View>
    )
  }

  render() {
    return (
      <MaskedView maskElement={this.renderElement()}>
        {this.renderMask()}
      </MaskedView>
    )
  }
}
