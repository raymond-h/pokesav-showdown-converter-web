const Nanocomponent = require('nanocomponent')
const html = require('choo/html')
const blobToBuffer = require('blob-to-buffer')

class DragDrop extends Nanocomponent {
  update(onFiles) {
    return false
  }

  createElement() {
    const onChange = ev => {
      blobToBuffer(ev.target.files[0], (err, buf) => {
        if(err != null) {
          return console.error(err);
        }

        this.onFiles(buf);
      });
    };

    return html`<div class="w-100 ba pa2">
      <input class="w-100" type="file" onchange=${onChange} />
    </div>`;
  }
}

module.exports = DragDrop
