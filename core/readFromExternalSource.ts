import buildAudioPeaks from './buildAudioPeaks'
import decode from './decode'

async function readFromExternalSource(source: string) {
  const response = await fetch(source)
  const arrayBuffer = await response.arrayBuffer()
  const audioBuffer = await decode(arrayBuffer)
  const peaks = buildAudioPeaks(audioBuffer)

  return peaks
}

export default readFromExternalSource
