import React, { Component } from 'react'

export function renderSignature (canvasElem, signature) {
  if (canvasElem == null || canvasElem.style == null) {
    return
  }

  if (signature == null) {
    canvasElem.style.display = 'none'
    return
  }

  canvasElem.style.display = 'inline-block'

  const ctx = canvasElem.getContext('2d')

  const data = ctx.createImageData(192, 64)

  for (let i = 0; i < signature.length; i++) {
    let tmp = signature[i]
    for (let j = 0; j < 8; j++) {
      const val = (tmp & 0x80) !== 0 ? 0 : 255
      data.data[(i * 8 + j) * 4 + 0] = val
      data.data[(i * 8 + j) * 4 + 1] = val
      data.data[(i * 8 + j) * 4 + 2] = val
      data.data[(i * 8 + j) * 4 + 3] = 255
      tmp <<= 1
    }
  }

  ctx.putImageData(data, 0, 0)
}

export default class TrainerCardSignature extends Component {
  constructor (props) {
    super(props)
    this.signature = null
  }

  componentDidMount () {
    renderSignature(this.canvas, this.props.signature)
  }

  componentDidUpdate () {
    renderSignature(this.canvas, this.props.signature)
  }

  render () {
    return <canvas
      ref={canvas => { this.canvas = canvas }}
      className='ba'
      width='192'
      height='64' />
  }
}
