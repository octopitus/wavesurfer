/* eslint-disable */
var btoa = function(s) {
  var c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    e = [],
    i = 0,
    b,
    buf

  while (i < s.length) {
    b = [s.charCodeAt(i++), s.charCodeAt(i++), s.charCodeAt(i++)]
    buf = (b[0] << 16) + ((b[1] || 0) << 8) + (b[2] || 0)
    e.push(
      c.charAt((buf & (63 << 18)) >> 18),
      c.charAt((buf & (63 << 12)) >> 12),
      c.charAt(isNaN(b[1]) ? 64 : (buf & (63 << 6)) >> 6),
      c.charAt(isNaN(b[2]) ? 64 : buf & 63)
    )
  }
  return e.join('')
}

global.btoa = global.btoa || btoa

var atob = function(s) {
  var c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    buf,
    a = (b = d = []),
    j = (i = 0)

  if (
    s.length % 4 != 0 ||
    new RegExp('[^' + c + ']').test(s) ||
    (/=/.test(s) && (/=[^=]/.test(s) || /={3}/.test(s)))
  )
    throw new Error('Invalid base64 data')

  while (i < s.length) {
    j = i
    a = []
    for (; i < j + 4; i++) a.push(c.indexOf(s.charAt(i)))

    buf = (a[0] << 18) + (a[1] << 12) + ((a[2] & 63) << 6) + (a[3] & 63)
    b = [
      (buf & (255 << 16)) >> 16,
      a[2] == 64 ? -1 : (buf & (255 << 8)) >> 8,
      a[3] == 64 ? -1 : buf & 255
    ]

    for (j = 0; j < 3; j++)
      if (b[j] >= 0 || j === 0) d.push(String.fromCharCode(b[j]))
  }
  return d.join('')
}

global.atob = global.atob || atob
