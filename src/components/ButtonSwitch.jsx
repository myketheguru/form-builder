import React from 'react'

const ButtonSwitch = ({ onChange}) => {
  return (
    <div className="button-switch">
        <input type="checkbox" name="switch" id="switch" onChange={evt => onChange(evt)} />
        <label htmlFor='switch'>
            <div className="actuator"></div>
        </label>
    </div>
  )
}

export default ButtonSwitch 