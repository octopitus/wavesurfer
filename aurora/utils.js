/**
 * Makes a multidimensional array
 */
exports.makeArray = (lengths, Type) => {
  if (!Type) {
    Type = Float64Array
  }

  if (lengths.length === 1) {
    return new Type(lengths[0])
  }

  const ret = [],
    len = lengths[0]

  for (let j = 0; j < len; j++) {
    ret[j] = exports.makeArray(lengths.slice(1), Type)
  }

  return ret
}
