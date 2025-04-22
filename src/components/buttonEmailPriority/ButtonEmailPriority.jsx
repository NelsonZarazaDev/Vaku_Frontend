import React from 'react'
import UsePriority from '../../hooks/priority/UsePriority'

export default function ButtonEmailPriority() {
  const {notifyEmail} = UsePriority();
  return (
    <div onClick={notifyEmail} className='bg-accent flex justify-center items-center font-bold text-text box-shadow-card rounded-full w-30 h-10 cursor-pointer'>
        Notificar
    </div>
  )
}
