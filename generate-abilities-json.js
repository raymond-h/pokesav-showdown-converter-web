const util = require('util')
const fs = require('fs')
const cheerio = require('cheerio')

async function main () {
  const htmlCode = await util.promisify(fs.readFile)('./abilities.html', { encoding: 'utf8' })
  const $ = cheerio.load(htmlCode)

  const abilities = Array.from(
    $('tr')
    .map((idx, elem) => {
      const tds = $(elem).find('td')
      return {
        id: parseInt(tds.eq(0).text().trim(), 10),
        name: tds.eq(1).text().trim(),
        generation: tds.eq(3).text().trim()
      }
    })
  )
    .filter(ability => !Number.isNaN(ability.id))
    .filter(ability => ['I', 'II', 'III', 'IV', 'V'].includes(ability.generation))

  const abilitiesById = {}
  abilities.forEach(a => {
    abilitiesById[a.id] = a.name
  })

  // console.log(abilitiesById);
  console.log(JSON.stringify(abilitiesById, null, 2))
}

main().catch(err => console.error(err))
