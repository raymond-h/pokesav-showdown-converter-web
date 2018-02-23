import React from 'react'
import blobToBuffer from 'blob-to-buffer'

const FileInput = props => {
  const onChange = ev => {
    if (ev.target.files.length === 0) {
      return props.onFile(null)
    }

    blobToBuffer(ev.target.files[0], (err, buf) => {
      if (err != null) {
        return console.error(err)
      }

      props.onFile(buf)
    })
  }

  return <div className='w-100 ba pa2 mb2'>
    {(props.title != null) && <p className='b mt0 mb2'>{props.title}:</p>}

    <input className='w-100' type='file' onChange={onChange} />
  </div>
}

export default FileInput
