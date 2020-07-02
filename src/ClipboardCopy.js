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
    return <button onClick={this.handleClick.bind(this)}>
      {this.state.copiedRecently ? 'Copied!' : 'Copy'}
    </button>
  }
}

export default ClipboardCopy
