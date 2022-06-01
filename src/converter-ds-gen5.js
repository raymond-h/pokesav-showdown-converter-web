const { PokesavDsGen5, fromBuffer } = require('pokesav-ds-gen5')
const dedent = require('dedent')

const pokemonData = require('../data-gen5/pokemon')
const abilities = require('../data-gen5/abilities')
const items = require('../data-gen5/items')
const movesData = require('../data-gen5/moves')

function output (current) {
  return dedent`
    === ${current.trainerDataBlock.trainerName}'s team ===

    ${current.partyPokemonBlock.partyPokemon.map(pkmn => pokemon(current, pkmn)).join('\n\n')}
  `
}

function pokemon (gameSave, pkmn) {
  const name = pkmn.base.blockB.isNicknamed
    ? `${pkmn.base.blockC.nickname} (${pokemonData[pkmn.base.blockA.nationalPokedexId]})`
    : pokemonData[pkmn.base.blockA.nationalPokedexId]

  return dedent`
    ${name}${gender(pkmn)}${item(pkmn.base.blockA.heldItem)}
    Ability: ${abilities[pkmn.base.blockA.ability]}
    Level: ${pkmn.battleStats.level}
    Shiny: ${pkmn.base.isShiny ? 'Yes' : 'No'}
    Happiness: ${pkmn.base.blockA.friendship}
    EVs: ${stats(pkmn.base.blockA.ev)}
    ${titleize(PokesavDsGen5.Nature[pkmn.base.blockB.nature])} Nature
    IVs: ${stats(pkmn.base.blockB.iv)}
    ${moves(pkmn.base.blockB.moves)}
  `
}

const statNames = {
  hp: 'HP',
  attack: 'Atk',
  defense: 'Def',
  speed: 'Spd',
  specialAttack: 'SAtk',
  specialDefense: 'SDef'
}

const item = item => (item !== 0) ? ` @ ${items[item]}` : ''

const stats = stats => {
  const statsStrs = Object.keys(statNames).map(stat => `${stats[stat]} ${statNames[stat]}`)

  return statsStrs.join(' / ')
}

const moves = moves =>
  moves
    .filter(move => move !== 0)
    .map(move => `- ${movesData[move]}`)
    .join('\n')

const gender = pkmn =>
  pkmn.base.blockB.isGenderless ? '' : (
    (pkmn.base.blockB.isFemale ? ' (F)' : ' (M)')
  )

const titleize = s => s[0].toUpperCase() + s.substr(1).toLowerCase()

function convert (file) {
  if (file.length < 512 * 1024) {
    return null
  }

  const data = fromBuffer(file)
  if (data == null || data.game === PokesavDsGen5.Game.UNKNOWN) {
    return null
  }

  return {
    output: output(data),
    signature: data.cardSignatureBadgeBlock.trainerCardSignature
  }
}

module.exports = { convert }
