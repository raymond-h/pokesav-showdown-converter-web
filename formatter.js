const dedent = require('dedent');

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

module.exports = {
  output, pokemon, item,
  stats, moves, gender,
  nature
}
