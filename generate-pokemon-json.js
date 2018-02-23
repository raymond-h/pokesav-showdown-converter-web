const util = require('util')
const fs = require('fs')
const cheerio = require('cheerio')

async function main () {
  const htmlCode = await util.promisify(fs.readFile)('./pokemon.html', { encoding: 'utf8' })
  const $ = cheerio.load(htmlCode)

  const pokemon = Array.from(
    $('tr')
    .map((idx, elem) => {
      const tds = $(elem).find('td')
      return {
        id: parseInt(tds.eq(1).text().trim(), 10),
        name: tds.eq(3).text().trim()
      }
    })
  )

  const pokemonById = {}
  pokemon.forEach(a => {
    pokemonById[a.id] = a.name
  })

  // console.log(pokemonById);
  console.log(JSON.stringify(pokemonById))
}

main().catch(err => console.error(err))
