import React, { useState, useContext } from 'react'

const TooltipContext = React.createContext()
const AppProvider = ({ children }) => {
  const [isTooltipOpen, setTooltipOpen] = useState(false)
  const [location, setLocation] = useState({})
  const [text, setText] = useState('')

  const openTooltip = (text, coordinates) => {
    setTooltipOpen(true)
    setLocation(coordinates)
    setText(text)
  }
  const closeTooltip = () => {
    setTooltipOpen(false)
  }

  return (
    <TooltipContext.Provider
      value={{ isTooltipOpen, location, openTooltip, closeTooltip, text }}
    >
      {children}
    </TooltipContext.Provider>
  )
}

export const useOpenTooltip = () => {
  return useContext(TooltipContext)
}
export { AppProvider }
