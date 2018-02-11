var html = require('choo/html')
const DragDrop = require('../drag-drop-component')
const TrainerCardSignature = require('../trainer-card-signature-component')

var TITLE = 'Pokemon savefile to Showdown converter'

module.exports = view

const dragDrop = new DragDrop()
const trainerCardSignature = new TrainerCardSignature()

function view (state, emit) {
  if (state.title !== TITLE) {
    emit(state.events.DOMTITLECHANGE, TITLE)
  }

  dragDrop.onFiles = function(file) {
    console.log('Dragged file:', file)
    emit('new-savefile', file)
  }

  return html`
    <body class="sans-serif">
      <div class="mw8 center">
        <h1 class="f-headline tc w-100">
          Pokemon savefile to Showdown converter
        </h1>
        <div class="fl w-30 pa2">
          ${ dragDrop.render() }
          ${ trainerCardSignature.render(state.trainerCardSignature) }
        </div>
        <div class="fl w-70 pa2">
          <textarea class="db w-100 h5 ba pa2 ma0">
            ${ state.output }
          </textarea>
        </div>
      </div>
    </body>
  `
}