import {StyleSheet, Dimensions} from 'react-native'

const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  maskContainer: {
    flexDirection: 'row'
  },
  mask: {
    width: width / 2
  },
  scroll: {
    alignItems: 'center'
  },
  peakContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: width / 2
  },
  peak: {
    backgroundColor: '#000'
  },
  scrollView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent'
  }
})

export default styles
