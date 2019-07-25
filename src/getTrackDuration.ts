export default function getTrackDuration(ms: number) {
  const second = Math.round(ms / 1000)
  const min = Math.round(second / 60)
  const remainingSecond = second - min * 60

  return {
    minute: min,
    second: remainingSecond
  }
}
