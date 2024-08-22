import  { ReactNode } from 'react'

type ErrorProps ={
    children:ReactNode
}

const ErrorMessage = ({children}: ErrorProps) => {
  return (
    <p className='bg-red-600 rounded-md p-2 text-white font-bold text-center text-sm'>{children}</p>
  )
}

export default ErrorMessage