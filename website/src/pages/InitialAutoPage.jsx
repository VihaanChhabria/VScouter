import React from 'react'
import ProceedBackButton from '../components/ProceedBackButton'

const InitialAutoPage = () => {
  return (
    <>
      <ProceedBackButton nextPage="/auto-note-counter"/>
      <ProceedBackButton back={true} nextPage="/"/>
    </>
  )
}

export default InitialAutoPage
