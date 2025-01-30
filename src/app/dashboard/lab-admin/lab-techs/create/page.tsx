import React from 'react'
import LabTechCreationForm from '@/components/SignUpForms/LabTechCreationForm'

const CreateLabTechnician = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8 max-w-lg mx-auto'>
      <div className="card w-full max-w-lg flex justify-center lg:w-[410px] mb-5">
        <LabTechCreationForm />
      </div>
    </div>
  )
}

export default CreateLabTechnician