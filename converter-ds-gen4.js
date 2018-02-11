const { fromBuffer, PokesavDsGen4 } = require('pokesav-ds-gen4');

function convert(file) {
  if(file.length < 512 * 1024) {
    return null
  }

  const data = fromBuffer(file);
  if(data.game === PokesavDsGen4.Game.UNKNOWN) {
    return null;
  }

  const current = data.generalBlockCurrent;

  return `=== ${current.trainerName}'s team ===\n`;
}

module.exports = { convert };
