import React, { useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

const ColorPicker = ({ onChange = () => {}, defaultValue }) => {
    const [colorValue, setColorValue] = useState(defaultValue || '#000000')
    const [id] = useState(uuidV4())

  return (
    <div className='_color_picker' onClick={evt => evt.stopPropagation()}>
        <label htmlFor={id} className="color-indicator" style={{ backgroundColor: colorValue }}></label>
        <input 
            type="color" 
            id={id} 
            value={colorValue} 
            onChange={evt => {setColorValue(evt.target.value); onChange({value: colorValue, evt})}} 
        />
        <p className='color-value'>{ colorValue }</p>
    </div>
  )
}

export default ColorPicker