import React, {Component, createRef} from 'react'
import {View, Animated, Dimensions} from 'react-native'
import MaskedView from '@react-native-community/masked-view'

import readFromExternalSource from '@core/readFromExternalSource'
import styles from './styles'

const {width} = Dimensions.get('screen')

interface Props {
  source: {uri: string}
  width: number
  blockWidth: number
  blockPaddingInner: number
  activeColor: string
  inactiveColor: string
  animatedValue: Animated.Value
}

interface State {
  peaks: number[]
}

export default class WaveSurfer extends Component<Props, State> {
  static defaultProps = {
    width: width,
    activeColor: 'green',
    inactiveColor: 'red',
    blockWidth: 3,
    blockPaddingInner: 1,
    animatedValue: new Animated.Value(0)
  }

  state = {
    peaks: []
  }

  scrollRef = createRef<any>()

  componentDidMount() {
    const {uri} = this.props.source
    readFromExternalSource(uri).then(peaks => this.setState({peaks}))
  }

  componentDidUpdate() {
    if (this.state.peaks.length) {
      Animated.timing(this.props.animatedValue, {
        toValue: this.state.peaks.length * 4,
        duration: (this.state.peaks.length / 3) * 1000
      }).start(({finished}) => {
        if (finished && this.scrollRef.current) {
          this.scrollRef.current.getNode().scrollToEnd()
        }
      })
    }
  }

  renderMask = () => {
    const maskHeight = Math.max(...this.state.peaks)

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
    const peakViewWidth = this.state.peaks.length * 4
    const translateX = this.props.animatedValue.interpolate({
      inputRange: [0, peakViewWidth],
      outputRange: [0, -peakViewWidth]
    })

    return (
      <Animated.View
        style={[styles.peakContainer, {transform: [{translateX}]}]}>
        {this.state.peaks.map((peak, index) => {
          return <View key={index} style={[styles.peak, {height: peak}]} />
        })}
      </Animated.View>
    )
  }

  render() {
    if (!this.state.peaks.length) {
      return null
    }

    const peakViewWidth = this.state.peaks.length * 4 + this.props.width
    const peakViewHeight = Math.max(...this.state.peaks)

    return (
      <View style={styles.container}>
        <Animated.ScrollView
          ref={this.scrollRef}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {x: this.props.animatedValue}}}
          ])}
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
