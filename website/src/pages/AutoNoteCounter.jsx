import React from 'react'
import ProceedBackButton from '../components/ProceedBackButton'

const AutoNoteCounter = () => {
  return (
    <>
      <ProceedBackButton nextPage="/teleop-note-counter" />
      <ProceedBackButton nextPage="/initial-auto" back={true}/>
    </>
  )
}

export default AutoNoteCounter
