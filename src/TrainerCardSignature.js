import React from 'react'
import Nanocomponent from 'nanocomponent'
import toReact from 'nanocomponent-adapters/react'
import html from 'bel'

function renderSignature(canvasElem, signature) {
  if(canvasElem == null || canvasElem.style == null) {
    return
  }

  if(signature == null) {
    canvasElem.style.display = 'none';
    return
  }

  canvasElem.style.display = 'inline-block';

  const ctx = canvasElem.getContext('2d');

  const data = ctx.createImageData(192, 64);

  for(let i = 0; i < signature.length; i++) {
    let tmp = signature[i];
    for(let j = 0; j < 8; j++) {
      const val = (tmp & 0x80) !== 0 ? 0 : 255;
      data.data[(i*8+j)*4+0] = val;
      data.data[(i*8+j)*4+1] = val;
      data.data[(i*8+j)*4+2] = val;
      data.data[(i*8+j)*4+3] = 255;
      tmp <<= 1;
    }
  }

  ctx.putImageData(data, 0, 0);
}

class TrainerCardSignature extends Nanocomponent {
  constructor() {
    super()
    this.signature = null
  }

  load(elem) {
    renderSignature(elem, this.signature);
  }

  update({ signature }) {
    this.signature = signature
    renderSignature(this.element, signature)
    return false
  }

  createElement({ signature }) {
    this.signature = signature
    const elem = html`<canvas
      class="ba"
      width="192"
      height="64">
    </canvas>`;
    renderSignature(elem, signature);
    return elem;
  }
}

export default toReact(TrainerCardSignature, React)
