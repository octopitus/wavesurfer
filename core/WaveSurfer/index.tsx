import React, {Component} from 'react'
import {
  View,
  Animated,
  PanResponder,
  PanResponderGestureState,
  PanResponderInstance,
  GestureResponderEvent
} from 'react-native'
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

  _initialPosition = 0

  gestureResponder: PanResponderInstance

  constructor(props: Props) {
    super(props)

    this.gestureResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: this.onPanResponderGrant.bind(this),
      onPanResponderMove: this.onPanResponderMove.bind(this),
      onPanResponderRelease: this.onPanResponderRelease.bind(this),
      onPanResponderReject: this.onPanResponderReject.bind(this)
    })
  }

  onPanResponderGrant(
    evt: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) {
    const {locationX} = evt.nativeEvent
    console.log({locationX})
    // @ts-ignore
    this._initialPosition = this.props.animatedValue.__getValue()
  }

  onPanResponderMove(
    evt: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) {
    this.props.animatedValue.setValue(this._initialPosition + gestureState.dx)
  }

  onPanResponderRelease() {
    this._initialPosition =
      // @ts-ignore
      this._initialPosition + this.props.animatedValue.__getValue()
  }

  onPanResponderReject() {
    this._initialPosition =
      // @ts-ignore
      this._initialPosition + this.props.animatedValue.__getValue()
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
      <MaskedView
        {...this.gestureResponder.panHandlers}
        maskElement={this.renderElement()}>
        {this.renderMask()}
      </MaskedView>
    )
  }
}
