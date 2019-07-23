// @ts-ignore
import AV from 'aurora'
// @ts-ignore
import {OfflineAudioContext as AudioContext} from 'web-audio-engine'

export default function decode(
  arrayBuffer: ArrayBuffer,
  context = new AudioContext()
): Promise<any> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    const asset = AV.Asset.fromBuffer(arrayBuffer)

    asset.on('error', reject)

    asset.decodeToBuffer((buffer: Buffer) => {
      const channels = asset.format.channelsPerFrame
      const samples = buffer.length / channels
      const audioBuffer = context.createBuffer(
        channels,
        samples,
        asset.format.sampleRate
      )

      const audioChans = []
      for (let i = 0; i < channels; i++) {
        audioChans.push(audioBuffer.getChannelData(i))
      }
      for (let i = 0; i < buffer.length; i++) {
        audioChans[i % channels][Math.round(i / channels)] = buffer[i]
      }

      resolve(audioBuffer)
    })
  })
}
