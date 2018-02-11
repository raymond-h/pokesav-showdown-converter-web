const util = require('util');
const fs = require('fs');
const cheerio = require('cheerio');

async function main() {
  const htmlCode = await util.promisify(fs.readFile)('./moves.html', { encoding: 'utf8' });
  const $ = cheerio.load(htmlCode);

  const moves = Array.from(
    $('tr')
    .map((idx, elem) => {
      const tds = $(elem).find('td');
      return {
        id: parseInt(tds.eq(0).text().trim(), 10),
        name: tds.eq(1).find('a').text().trim(),
        generation: tds.eq(8).text().trim()
      };
    })
  )
    .filter(move => !Number.isNaN(move.id))
    .filter(move => ['I', 'II', 'III', 'IV'].includes(move.generation));

  const movesById = {};
  moves.forEach(a => {
    movesById[a.id] = a.name;
  });

  // console.log(movesById);
  console.log(JSON.stringify(movesById));
}

main().catch(err => console.error(err));
