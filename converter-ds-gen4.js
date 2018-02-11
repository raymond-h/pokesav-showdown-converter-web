const { PokesavDsGen4, fromBuffer } = require('pokesav-ds-gen4');
const dedent = require('dedent');

const pokemonData = require('./data-gen4/pokemon');
const abilities = require('./data-gen4/abilities');
const items = require('./data-gen4/items');
const movesData = require('./data-gen4/moves');

function output(current) {
  return dedent`
    === ${current.trainerName}'s team ===

    ${ current.partyPokemon.map(pkmn => pokemon(current, pkmn)).join('\n\n') }
  `
}

function pokemon(gameSave, pkmn) {
  const name = pkmn.base.blockB.isNicknamed ?
    `${pkmn.base.blockC.nickname} (${pokemonData[pkmn.base.blockA.nationalPokedexId]})` :
    pokemonData[pkmn.base.blockA.nationalPokedexId]

  return dedent`
    ${name}${gender(pkmn)}${item(pkmn.base.blockA.heldItem)}
    Ability: ${abilities[pkmn.base.blockA.ability]}
    Level: ${pkmn.battleStats.level}
    Shiny: ${pkmn.base.isShiny ? 'Yes' : 'No'}
    Happiness: ${pkmn.base.blockA.friendship}
    EVs: ${stats(pkmn.base.blockA.ev)}
    ${titleize(PokesavDsGen4.Nature[pkmn.base.nature])} Nature
    IVs: ${stats(pkmn.base.blockB.iv)}
    ${moves(pkmn.base.blockB.moves)}
  `
}

const statNames = {
  hp: 'HP',
  attack: 'Atk', defense: 'Def',
  speed: 'Spd',
  specialAttack: 'SAtk', specialDefense: 'SDef'
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

function convert(file) {
  if(file.length < 512 * 1024) {
    return null
  }

  const data = fromBuffer(file);
  if(data.game === PokesavDsGen4.Game.UNKNOWN) {
    return null;
  }

  return output(data.generalBlockCurrent);
}

module.exports = { convert };
