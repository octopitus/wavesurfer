import {StyleSheet} from 'react-native'

const Colors = {
  black: '#212529',
  gray: '#868e96',
  white: '#FFF'
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
  },
  panel: {
    backgroundColor: Colors.white
  },
  panelContent: {
    flex: 1,
    padding: 24
  },
  slide: {
    flex: 1,
    position: 'relative'
  },
  cover: StyleSheet.absoluteFillObject,
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  slideHeader: {
    fontSize: 28,
    color: Colors.white
  },
  slideSubHeader: {
    fontSize: 16,
    color: Colors.white
  },
  btnGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btn: {
    tintColor: Colors.white
  },
  playBtn: {
    width: 56,
    height: 56
  }
})

export default styles
