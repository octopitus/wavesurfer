import RNFetch from 'rn-fetch-blob'

import buildAudioPeaks, {PeakOptions} from './buildAudioPeaks'
import decode from './decode'

async function readFromExternalSource(source: string, options: PeakOptions) {
  const response = await RNFetch.fetch('GET', source)
  const base64 = await response.base64()

  // Convert to array buffer
  const content: string = global.atob(base64)
  const buffer = new ArrayBuffer(content.length)
  const view = new Uint8Array(buffer)
  view.set(Array.from(content).map(c => c.charCodeAt(0)))

  const audioBuffer = await decode(buffer)
  const peaks = buildAudioPeaks(audioBuffer, options)

  return peaks
}

export default readFromExternalSource
