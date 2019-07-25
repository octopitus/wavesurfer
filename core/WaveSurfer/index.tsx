import React, {Component, createRef} from 'react'
import {View, Animated, Dimensions, Easing} from 'react-native'
import MaskedView from '@react-native-community/masked-view'

import readFromExternalSource from '@core/readFromExternalSource'
import styles from './styles'

const {width} = Dimensions.get('screen')

interface Props {
  source: {uri: string}
  width: number
  height: number
  blockWidth: number
  blockPaddingInner: number
  activeColor: string
  inactiveColor: string
  animatedValue: Animated.Value
  onDurationChange: (value: number) => void
}

interface State {
  peaks: number[]
}

export default class WaveSurfer extends Component<Props, State> {
  static defaultProps = {
    width: width,
    height: 320,
    activeColor: 'green',
    inactiveColor: 'red',
    blockWidth: 3,
    blockPaddingInner: 1.5,
    animatedValue: new Animated.Value(0),
    onDurationChange: () => {}
  }

  state = {peaks: []}

  _scrollRef = createRef<any>()
  _onScrollEventListener: ReturnType<typeof Animated.event> | null = null
  _onDurationChangeListener: string | null = null
  _animation: Animated.CompositeAnimation | null = null

  constructor(props: Props) {
    super(props)

    this._onScrollEventListener = Animated.event([
      {nativeEvent: {contentOffset: {x: this.props.animatedValue}}}
    ])

    this._onDurationChangeListener = this.props.animatedValue.addListener(
      this._updateProgress
    )
  }

  componentDidMount() {
    const {uri} = this.props.source

    readFromExternalSource(uri, {maxBlockHeight: this.props.height}).then(
      peaks => this.setState({peaks})
    )
  }

  componentDidUpdate() {
    if (this.state.peaks.length) {
      this._startAutoScrolling()
    }
  }

  componentWillUnmount() {
    if (this._onDurationChangeListener != null) {
      this.props.animatedValue.removeListener(this._onDurationChangeListener)
    }
  }

  _updateProgress = ({value}: {value: number}) => {
    const blockWidth = this.props.blockWidth + this.props.blockPaddingInner
    const widthOfPeakView = this.state.peaks.length * blockWidth
    const totalDuration = this.state.peaks.length

    // prettier-ignore
    const duration = ((value) * totalDuration) / widthOfPeakView
    this.props.onDurationChange(duration)
  }

  _startAutoScrolling = () => {
    // @ts-ignore
    const travelled = this.props.animatedValue.__getValue()
    const blockWidth = this.props.blockWidth + this.props.blockPaddingInner
    const widthOfPeakView = this.state.peaks.length * blockWidth
    const totalDuration = this.state.peaks.length

    // prettier-ignore
    const remainingDuration = ((widthOfPeakView - travelled) * totalDuration) / widthOfPeakView

    this._animation = Animated.timing(this.props.animatedValue, {
      toValue: widthOfPeakView,
      duration: remainingDuration * 1000,
      easing: Easing.linear
    })

    this._animation.start()
  }

  _ensureScrollPositionIsCorrect = () => {
    // @ts-ignore
    const travelled = this.props.animatedValue.__getValue()

    if (this._scrollRef.current) {
      this._scrollRef.current.getNode().scrollTo({
        x: travelled,
        animated: false
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
    const blockWidth = this.props.blockWidth + this.props.blockPaddingInner
    const peakViewWidth = this.state.peaks.length * blockWidth
    const translateX = this.props.animatedValue.interpolate({
      inputRange: [0, peakViewWidth],
      outputRange: [0, -peakViewWidth]
    })

    const width = this.props.blockWidth
    const marginRight = this.props.blockPaddingInner

    return (
      <Animated.View
        style={[styles.peakContainer, {transform: [{translateX}]}]}>
        {this.state.peaks.map((peak, index) => {
          return (
            <View
              key={index}
              style={[styles.peak, {width, marginRight, height: peak}]}
            />
          )
        })}
      </Animated.View>
    )
  }

  render() {
    if (!this.state.peaks.length) {
      return null
    }

    const blockWidth = this.props.blockWidth + this.props.blockPaddingInner

    // prettier-ignore
    const peakViewWidth = this.state.peaks.length * blockWidth + this.props.width
    const peakViewHeight = Math.max(...this.state.peaks)

    return (
      <View style={styles.container}>
        <Animated.ScrollView
          ref={this._scrollRef}
          horizontal
          decelerationRate={0.5}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={this._onScrollEventListener}
          onScrollBeginDrag={this._ensureScrollPositionIsCorrect}
          onMomentumScrollEnd={this._startAutoScrolling}
          onScrollEndDrag={this._startAutoScrolling}
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
