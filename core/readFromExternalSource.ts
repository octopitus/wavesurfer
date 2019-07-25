import buildAudioPeaks, {PeakOptions} from './buildAudioPeaks'
import decode from './decode'

async function readFromExternalSource(source: string, options: PeakOptions) {
  const response = await fetch(source)
  const arrayBuffer = await response.arrayBuffer()
  const audioBuffer = await decode(arrayBuffer)
  const peaks = buildAudioPeaks(audioBuffer, options)

  return peaks
}

export default readFromExternalSource
