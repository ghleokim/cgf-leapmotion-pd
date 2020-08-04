function multiply(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

function angle(a, b) {
  this.normalizedA = 0
  this.normalizedB = 0

  a.forEach(function (el) {
    this.normalizedA += el * el
  })
  b.forEach(function (el) {
    this.normalizedB += el * el
  })

  normalizedA = Math.sqrt(normalizedA)
  normalizedB = Math.sqrt(normalizedB)

  return (multiply(a, b) / (normalizedA * normalizedB))
}

module.exports.angle = angle;