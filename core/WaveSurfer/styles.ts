import {StyleSheet, Dimensions} from 'react-native'

const {height, width} = Dimensions.get('screen')

const styles = StyleSheet.create({
  maskContainer: {
    flexDirection: 'row',
    height,
    width
  },
  mask: {
    height,
    width: width / 2
  },
  scroll: {
    alignItems: 'center'
  },
  peakContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  peak: {
    width: 4,
    marginRight: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
})

export default styles
