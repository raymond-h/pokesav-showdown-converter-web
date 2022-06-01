const converterGba = require('./converter-gba')
const converterDsGen4 = require('./converter-ds-gen4')
const converterDsGen5 = require('./converter-ds-gen5')

module.exports = function convert (file, showdownPokedexData) {
  return converterDsGen5.convert(file) || converterDsGen4.convert(file) || { output: converterGba.convert(file, { showdownPokedexData }) }
}
