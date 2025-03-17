import React from 'react'
import { ContactInformation } from './ContactInformation'
import { NumberInformation } from './NumberUnformation.tsx'

const MainContact = () => {
  return (
    <div className='px-[50px] pb-[80px] pt-[50px]'>
        <ContactInformation/>
        <NumberInformation/>
    </div>
  )
}

export default MainContact