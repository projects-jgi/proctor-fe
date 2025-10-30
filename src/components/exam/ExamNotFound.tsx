import { CircleX } from 'lucide-react'
import React from 'react'

function ExamNotFound() {
  return (
    <div className="flex flex-col items-center w-full text-secondary text-3xl my-14">
        <CircleX size={52} />
        <p>Exams not found</p>
    </div>
  )
}

export default ExamNotFound