import React, { Component } from 'react'
import blobToBuffer from 'blob-to-buffer'

import FileInput from './FileInput'
import TrainerCardSignature from './TrainerCardSignature'
import ClipboardCopy from './ClipboardCopy'
import convert from './converter'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      savefile: null,
      showdownFile: null
    }
  }

  handleNewSavefile (file) {
    this.setState({ savefile: file })
  }

  handleNewShowdownFile (file) {
    this.setState({ showdownFile: file })
  }

  handleFileDrop (ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if (ev.dataTransfer.items && ev.dataTransfer.items.length > 0 && ev.dataTransfer.items[0].kind === 'file') {
      const file = ev.dataTransfer.items[0].getAsFile()
      blobToBuffer(file, (err, buf) => {
        if (err != null) {
          return console.error(err)
        }
  
        this.handleNewSavefile({ name: file.name, buffer: buf })
      })
    }
    else if (ev.dataTransfer.files) {
      const file = ev.dataTransfer.files[0]
      blobToBuffer(ev.dataTransfer.files[0], (err, buf) => {
        if (err != null) {
          return console.error(err)
        }
  
        this.handleNewSavefile({ name: file.name, buffer: buf })
      })
    }
  }
  
  handleDragOver(ev) {
    ev.preventDefault();
    ev.stopPropagation();

  }

  render () {
    const result = (this.state.savefile != null)
      ? convert(Buffer.from(this.state.savefile.buffer), this.state.showdownFile)
      : null

    const output = (result != null) ? result.output : ''
    const signature = (result != null) ? result.signature : null

    return <div className='vh-100 w-100 flex items-center justify-center bg-near-black' onDrop={this.handleFileDrop.bind(this)} onDragOver={this.handleDragOver.bind(this)}>
      <div className='bg-panel-color pt4 ph5 pb5 br2'>
        <div className='mw9 center sans-serif moon-gray'>
          <h1 className='font-title tc w-100 fade-in'>
            Pokemon savefile to Showdown converter
          </h1>
          <hr className='b--gray w-60 mv4' />
          <div className='font-body mw8 pt3 w-100 center flex flex-row'>
            <div className='fl pa2 w-40 flex flex-column'>
              <FileInput id='file-input-save' file={this.state.savefile} title='Savefile' onFile={this.handleNewSavefile.bind(this)} />
              <FileInput id='file-inpud-dex' file={this.state.showdownFile} title='Showdown pokedex.js file (optional)' onFile={this.handleNewShowdownFile.bind(this)} />
            {signature && <div className='center pa4'><TrainerCardSignature signature={signature} /></div>}
            </div>
            <div className='fl w-60 pa2 flex flex-column items-end'>
              <textarea className='db w-100 h-textarea ba pa2 ma0 mb2 bg-near-black moon-gray consolas non-resizable' value={output} readOnly placeholder='Output goes here' />
              <ClipboardCopy className='mb2' value={output} />
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}
