import { useState } from 'react'

export const useField = (type, baseValue = '') => {
  const [value, setValue] = useState(baseValue)

  const onChange = event => {
    event.preventDefault()
    setValue(event.target.value)
  }
  return [{ value, onChange, type }, setValue]
}