import React, { Component } from 'react'

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

  handleNewSavefile (buf) {
    this.setState({ savefile: buf })
  }

  handleNewShowdownFile (buf) {
    this.setState({ showdownFile: buf })
  }

  render () {
    const result = (this.state.savefile != null)
      ? convert(Buffer.from(this.state.savefile), this.state.showdownFile)
      : null

    const output = (result != null) ? result.output : 'output\ngoes\nhere'
    const signature = (result != null) ? result.signature : null

    return <div className='mw8 center sans-serif'>
      <h1 className='f-headline tc w-100'>
        Pokemon savefile to Showdown converter
      </h1>
      <div className='fl w-30 pa2'>
        <FileInput title='Savefile' onFile={this.handleNewSavefile.bind(this)} />
        <FileInput title='Showdown pokedex.js file (optional)' onFile={this.handleNewShowdownFile.bind(this)} />
        {signature && <TrainerCardSignature signature={signature} />}
      </div>
      <div className='fl w-70 pa2 flex flex-column items-end'>
        <textarea className='db w-100 h5 ba pa2 ma0 mb2' value={output} readOnly />
        <ClipboardCopy className='mb2' value={output} />
      </div>
    </div>
  }
}
