import React from 'react'
import blobToBuffer from 'blob-to-buffer'

const FileInput = props => {
  const onChange = ev => {
    if (ev.target.files.length === 0) {
      return props.onFile(null)
    }

    const file = ev.target.files[0]
    blobToBuffer(file, (err, buf) => {
      if (err != null) {
        return console.error(err)
      }

      props.onFile({ name: file.name, buffer: buf })
    })
  }

  return <div className='w-100 bg-white-10 shadow-1 pa2 pb3 mb2 br2'>
    {(props.title != null) && <p className='mt0 mb2 pa1'>{props.title}:</p>}
    <div className='flex flex-row'>
      <div className='pa1 flex items-center justify-center'>
        <label className='font-button bg-moon-gray text-color br2 ph3 pv1 hover-color' htmlFor={props.id}>
          Upload
        </label>
      </div>
      {(props.file != null) && <div className='flex items-center justify-center pa1 pl2'>{props.file.name}</div>}
    </div>
    <input id={props.id} className='dn' type='file' onChange={onChange} />
  </div>
}

export default FileInput
