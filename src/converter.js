const converterGba = require('./converter-gba')
const converterDsGen4 = require('./converter-ds-gen4')

module.exports = function convert (file, showdownPokedexData) {
  return converterDsGen4.convert(file) || { output: converterGba.convert(file, { showdownPokedexData }) }
}
