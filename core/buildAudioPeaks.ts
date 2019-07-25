export interface PeakOptions {
  maxBlockHeight: number
  numberOfBlocks?: number
}

export default function buildAudioPeaks(
  audioBuffer: AudioBuffer,
  options: PeakOptions
) {
  const numberOfBlocks =
    options.numberOfBlocks || Math.round(audioBuffer.duration)
  const leftChannel = audioBuffer.getChannelData(0)
  const blockGap = leftChannel.length / numberOfBlocks
  const _peaks = []

  for (let i = 0; i < numberOfBlocks; i++) {
    const bufferKey = Math.floor(blockGap * i)
    const peak = Math.abs(leftChannel[bufferKey] * options.maxBlockHeight)
    _peaks.push(peak)
  }

  return _peaks
}
