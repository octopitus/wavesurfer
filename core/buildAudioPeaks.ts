interface BuildOptions {
  blockWidth: number
  numberOfBlocks?: number
}

const defaultOptions = {
  blockWidth: 3
}

export default function buildAudioPeaks(
  audioBuffer: AudioBuffer,
  options: BuildOptions = defaultOptions
) {
  const numberOfBlocks =
    options.numberOfBlocks || Math.round(audioBuffer.duration) * 3
  const surfaceWidth = numberOfBlocks * options.blockWidth
  const leftChannel = audioBuffer.getChannelData(0)
  const blockGap = leftChannel.length / numberOfBlocks
  const _peaks = []

  for (let i = 0; i < numberOfBlocks; i++) {
    const bufferKey = Math.floor(blockGap * i)
    const peak = Math.abs(leftChannel[bufferKey] * surfaceWidth)
    _peaks.push(peak)
  }

  return _peaks
}
