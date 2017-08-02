var html = require('choo/html')
const DragDrop = require('../drag-drop-component')

var TITLE = '🚂🚋🚋'

module.exports = view

const dragDrop = new DragDrop()

function view (state, emit) {
  if (state.title !== TITLE) {
    emit(state.events.DOMTITLECHANGE, TITLE)
  }

  dragDrop.onFiles = function(files) {
    console.log('Dragged files:', files)
    emit('new-savefile', files[0])
  }

  return html`
    <body class="sans-serif">
      <div class="mw8 center">
        <h1 class="f-headline tc w-100">
          Pokemon savefile to Showdown converter
        </h1>
        <div class="fl w-30 pa2">
          ${ dragDrop.render() }
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