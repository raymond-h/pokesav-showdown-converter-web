const pokesavGba = require('pokesav-gba')
const dedent = require('dedent');

const indexToNatDex = require('./data-gen3/pokemon-index-to-nat-dex-num');

function output(gameSave) {
  return dedent`
    === ${gameSave.name}'s team ===

    ${ gameSave.team.map( pkmn => pokemon(gameSave, pkmn) ).join('\n\n') }
  `
}

function pokemon(gameSave, pkmn) {
  return dedent`
    ${pkmn.name} (${pkmn.species})${gender(pkmn)}${item(pkmn.heldItem)}
    Ability: ${pkmn.ability}
    Level: ${pkmn.level}
    Shiny: ${pkmn.shiny ? 'Yes' : 'No'}
    Happiness: ${pkmn.friendship}
    EVs: ${stats(pkmn.evs)}
    ${nature(pkmn)} Nature
    IVs: ${stats(pkmn.ivs)}
    ${moves(pkmn.moves)}
  `
}

const statNames = {
  hp: 'HP',
  atk: 'Atk', def: 'Def',
  spd: 'Spd',
  spAtk: 'SAtk', spDef: 'SDef'
}

const item = item => (item != null) ? ` @ ${item}` : ''

const stats = stats => {
  const statsStrs = Object.keys(statNames).map(stat => `${stats[stat]} ${statNames[stat]}`)

  return statsStrs.join(' / ')
}

const moves = moves => moves.map(move => `- ${move.name}`).join('\n')

const gender = pkmn =>
  (pkmn.gender == null) ? '' : (
    (pkmn.gender === 'female' ? ' (F)' : ' (M)')
  )

const titleize = s => s[0].toUpperCase() + s.substr(1)

const nature = pkmn => (pkmn.nature == null) ? 'Naughty' : titleize(pkmn.nature)

function evaluateShowdownPokedexData(buf) {
  let module = { exports: {} };
  let exports = module.exports;

  eval(buf.toString('utf8'));

  return module.exports;
}

function convert(file, options) {
  options = options || {}

  let showdownPokedexData = null
  if(options.showdownPokedexData != null) {
    const evalResult = evaluateShowdownPokedexData(options.showdownPokedexData)

    if(Object.keys(evalResult).length === 1) {
      showdownPokedexData = evalResult[Object.keys(evalResult)[0]]
    }
    else {
      showdownPokedexData = evalResult
    }

    showdownPokedexData = Object.values(showdownPokedexData)
  }

  const save = new pokesavGba.Savefile(file)

  if(showdownPokedexData != null) {
    save.current.team.forEach(pkmn => {
      const natDexNum = indexToNatDex[pkmn.speciesIndex]
      pkmn.nationalDexNumber = natDexNum
      const showdownData = showdownPokedexData.find(d => d.num === natDexNum)
      pkmn.ability = showdownData.abilities[pkmn.abilityIndex] || showdownData.abilities[0]
    })
  }

  return output(save.current)
}

module.exports = {
  convert,
  output, pokemon, item,
  stats, moves, gender,
  nature
}
