import {StyleSheet} from 'react-native'

const Colors = {
  black: '#212529',
  gray: '#868e96'
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.gray,
    padding: 12
  },
  thumb: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    marginRight: 12
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  trackName: {
    fontSize: 14,
    color: Colors.black
  },
  artistName: {
    fontSize: 12,
    marginTop: 2,
    color: Colors.gray
  },
  duration: {
    color: Colors.gray
  }
})

export default styles
