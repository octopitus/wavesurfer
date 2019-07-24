import React, {Component} from 'react'
import {View, Animated, Dimensions} from 'react-native'
import MaskedView from '@react-native-community/masked-view'

import styles from './styles'

const {width} = Dimensions.get('screen')

interface Props {
  peaks: number[]
  width: number
  activeColor: string
  inactiveColor: string
  animatedValue: Animated.Value
}

export default class WaveSurfer extends Component<Props> {
  static defaultProps = {
    width: width,
    activeColor: 'green',
    inactiveColor: 'red',
    animatedValue: new Animated.Value(0)
  }

  renderMask = () => {
    const maskHeight = Math.max(...this.props.peaks)

    return (
      <View style={styles.maskContainer}>
        <View
          style={[
            styles.mask,
            {height: maskHeight, backgroundColor: this.props.activeColor}
          ]}
        />
        <View
          style={[
            styles.mask,
            {height: maskHeight, backgroundColor: this.props.inactiveColor}
          ]}
        />
      </View>
    )
  }

  renderElement = () => {
    const peakViewWidth = this.props.peaks.length * 4
    const translateX = this.props.animatedValue.interpolate({
      inputRange: [0, peakViewWidth],
      outputRange: [0, -peakViewWidth]
    })

    return (
      <Animated.View
        style={[styles.peakContainer, {transform: [{translateX}]}]}>
        {this.props.peaks.map((peak, index) => {
          return <View key={index} style={[styles.peak, {height: peak}]} />
        })}
      </Animated.View>
    )
  }

  render() {
    if (!this.props.peaks.length) {
      return null
    }

    const peakViewWidth = this.props.peaks.length * 4 + this.props.width
    const peakViewHeight = Math.max(...this.props.peaks)

    return (
      <View style={styles.container}>
        <Animated.ScrollView
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: this.props.animatedValue}}}],
            {useNativeDriver: true}
          )}
          style={styles.scrollView}>
          <View style={{height: peakViewHeight, width: peakViewWidth}} />
        </Animated.ScrollView>
        <MaskedView pointerEvents="none" maskElement={this.renderElement()}>
          {this.renderMask()}
        </MaskedView>
      </View>
    )
  }
}
