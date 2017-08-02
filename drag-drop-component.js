const Nanocomponent = require('nanocomponent')
const html = require('choo/html')
const dragDrop = require('drag-drop/buffer')

class DragDrop extends Nanocomponent {
  beforerender(el) {
    dragDrop(el, this.onFiles)
  }

  update(onFiles) {
    return false
  }

  createElement() {
    return html`<div class="ba pa2">
    	Drag savefile here!
    </div>`;
  }
}

module.exports = DragDrop
