import React from 'react'

export default function Button({ buttonName }) {
  return (
    <button style={{ width: '100%' }}>
      {'HELLO WORLD' + (buttonName ? ' and ' + buttonName : '')}
    </button>
  )
}
