import React from 'react'
import * as clipboard from 'clipboard-polyfill'

class ClipboardCopy extends React.Component {
  constructor (props) {
    super(props)
    this.state = { copiedRecently: false }
  }

  handleClick () {
    if (!this.state.copiedRecently) {
      clipboard.writeText(this.props.value)
      .then(() => {
        this.setState({ copiedRecently: true })

        setTimeout(() => {
          this.setState({ copiedRecently: false })
        }, 1000)
      }, err => {
        console.error(err)
      })
    }
  }

  render () {
    return <button className={'font-button bg-moon-gray text-color br2 w-copy pv1 b--transparent tc ' + (this.state.copiedRecently ? 'copy-animation' : 'hover-color')} onClick={this.handleClick.bind(this)}>
      {this.state.copiedRecently ? 'Copied!' : 'Copy'}
    </button>
  }
}

export default ClipboardCopy
