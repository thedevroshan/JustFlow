import React from 'react'
import Image from 'next/image'
const ProjectListElement = () => {
  return (
    <div className='flex items-center justify-start gap-2 w-full h-fit px-2 py-1 hover:bg-foreground rounded-lg cursor-pointer'>
        <Image
            src="/user-icon.png"
            alt="Project List Element"
            width={42}
            height={42}
        />
        <span className='text-white text-lg font-medium'>Project Name</span>
    </div>
  )
}

export default ProjectListElement