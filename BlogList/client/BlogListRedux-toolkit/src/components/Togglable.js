import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from './Button'
import { styled } from 'styled-components'

const SwitchButton = styled(Button)`
  margin: 0px;
`
const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisiblity = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisiblity
    }
  })

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <SwitchButton onClick={toggleVisiblity}>{props.buttonLabel}</SwitchButton>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <SwitchButton onClick={toggleVisiblity}>cancel</SwitchButton>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable