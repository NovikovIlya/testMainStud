import React from 'react'
import { ContactInformation } from './ContactInformation'
import { NumberInformation } from './NumberUnformation.tsx'
import TextAreaComponent from './TextAreaComponent'

const MainContact = () => {
  return (
    <div className='px-[50px] pb-[80px] pt-[40px] w-full'>
        <ContactInformation/>
        <NumberInformation/>
        <TextAreaComponent/>
    </div>
  )
}

export default MainContact