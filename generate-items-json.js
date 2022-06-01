const util = require('util')
const fs = require('fs')
const cheerio = require('cheerio')

async function main () {
  const htmlCode = await util.promisify(fs.readFile)('./items.html', { encoding: 'utf8' })
  const $ = cheerio.load(htmlCode)

  const items = Array.from(
    $('tr')
    .map((idx, elem) => {
      const tds = $(elem).find('td')
      return {
        id: parseInt(tds.eq(0).text().trim(), 10),
        name: tds.eq(3).find('a').text().trim()
      }
    })
  )

  const itemsByID = {}
  items.forEach(item => {
    itemsByID[item.id] = item.name
  })

  console.log(JSON.stringify(itemsByID, null, 2))
}

main().catch(err => console.error(err))
