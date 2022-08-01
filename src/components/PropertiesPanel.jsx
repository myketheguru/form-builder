/* eslint-disable react-hooks/exhaustive-deps */
import { useDropzoneState } from '../store/store'
import Alignment from './Alignment'
import ButtonSwitch from './ButtonSwitch'
import ColorPicker from './ColorPicker'

const PropertiesPanel = ({ rerender }) => {
    const dropzoneData = useDropzoneState(state => state.dropzoneData)
    const selectedDataIndex = useDropzoneState(state => state.selectedDataIndex)
    const setDropzoneData = useDropzoneState(state => state.setDropzoneData)
    
  const handleContentChange = (evt) => {
    let newData = dropzoneData
    newData[selectedDataIndex] = { ...dropzoneData[selectedDataIndex], [(dropzoneData[selectedDataIndex] && ('innerHTML' in dropzoneData[selectedDataIndex])) ? 'innerHTML' : 'placeholder']: evt.target.value  }
    setDropzoneData(newData)
    rerender(Math.random() * 1000)
  }

  const handleValueChange = (evt) => {
    let newData = dropzoneData
    newData[selectedDataIndex] = { ...dropzoneData[selectedDataIndex], value: evt.target.value  }
    setDropzoneData(newData)
    rerender(Math.random() * 1000)
  }

  const handleReadOnlyField = (evt) => {
    let newData = dropzoneData
    newData[selectedDataIndex] = { ...dropzoneData[selectedDataIndex], disabled: !dropzoneData[selectedDataIndex].disabled  }
    setDropzoneData(newData)
    rerender(Math.random() * 1000)
  }

  const handleColorChange = (color) => {
    let newData = dropzoneData
    newData[selectedDataIndex].styles = { ...newData[selectedDataIndex].styles, color: color }
    setDropzoneData(newData)
    rerender(Math.random() * 1000)
  }
  
  const handleBgColorChange = (color) => {
    let newData = dropzoneData
    newData[selectedDataIndex].styles = { ...newData[selectedDataIndex].styles, background: color }
    setDropzoneData(newData)
    rerender(Math.random() * 1000)
  }

  const handlePaddingChange = (prop, value) => {
    let newData = dropzoneData
    newData[selectedDataIndex].styles = { 
      ...newData[selectedDataIndex].styles, 
      [prop]: value }
    setDropzoneData(newData)
    rerender(Math.random() * 1000)
  }
  
  const handleMarginChange = (prop, value) => {
    let newData = dropzoneData
    newData[selectedDataIndex].styles = { 
      ...newData[selectedDataIndex].styles, 
      [prop]: value }
    setDropzoneData(newData)
    rerender(Math.random() * 1000)
  }

  const handleAlignmentChange = (alignment) => {
    let newData = dropzoneData
    newData[selectedDataIndex].styles = { ...newData[selectedDataIndex].styles, textAlign: alignment }
    setDropzoneData(newData)
    rerender(Math.random() * 1000)
  }  

  const handleFontValuesChange = (prop, value) => {
    let newData = dropzoneData
    newData[selectedDataIndex].styles = { ...newData[selectedDataIndex].styles, [prop]: value }
    setDropzoneData(newData)
    rerender(Math.random() * 1000)
  }  

  const handleMinMaxChange = (prop, value) => {
    let newData = dropzoneData
    newData[selectedDataIndex] = { ...dropzoneData[selectedDataIndex], [prop]: value  }
    setDropzoneData(newData)
    rerender(Math.random() * 1000)
  }

  return selectedDataIndex >= 0 ? (
    <aside className="properties-panel" onClick={evt => evt.stopPropagation()}>
        <h3>Field Properties</h3>
        <div className="inner">
        <div className="block">
            <p>{dropzoneData[selectedDataIndex]?.placeholder ? 'Placeholder' : 'Label Text'}</p>
            <textarea 
                value={
                    dropzoneData[selectedDataIndex]?.innerHTML || dropzoneData[selectedDataIndex]?.placeholder
                } 
                name={(dropzoneData[selectedDataIndex] && ('innerHTML' in dropzoneData[selectedDataIndex])) ? 'innerHTML' : 'placeholder'}
                onChange={evt => {
                    handleContentChange(evt)
                }} 
                cols="30" rows="5"></textarea>
        </div>
        {dropzoneData[selectedDataIndex].type === 'input' &&
          <div className="block">
            <p>Default Value</p>
            <textarea 
                name={'value'}
                value={
                  dropzoneData[selectedDataIndex]?.value
                }
                onChange={evt => {
                    handleValueChange(evt)
                }} 
                cols="30" rows="3"></textarea>
        </div>}
        {dropzoneData[selectedDataIndex].type === 'input' &&
        <div className="block">
            <p>Read Only</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ButtonSwitch
              onChange={handleReadOnlyField}
             />
             <p>{ dropzoneData[selectedDataIndex]?.disabled ? 'ON' : 'OFF' }</p>
            </div>
        </div>}
        <div className="block">
            <p>Typography</p>
                <Alignment onChange={handleAlignmentChange} />
                <div className="dir">
                <input 
                  type="text"
                  placeholder='Font Family'
                    // value={
                    //     dropzoneData[selectedDataIndex]?.styles.padding
                    // } 
                    name={'fontFamily'}
                    onChange={evt => {
                      handleFontValuesChange(evt.target.name, evt.target.value)
                    }} 
               />
                <input 
                  type="text"
                  placeholder='Font Size (px)'
                    // value={
                    //     dropzoneData[selectedDataIndex]?.styles.padding
                    // } 
                  name={'fontSize'}
                  onChange={evt => {
                    handleFontValuesChange(evt.target.name, evt.target.value)
                  }} 
                />
                <input 
                  type="text"
                  placeholder='Font Weight'
                    // value={
                    //     dropzoneData[selectedDataIndex]?.styles.padding
                    // } 
                  name={'fontWeight'}
                  onChange={evt => {
                    handleFontValuesChange(evt.target.name, evt.target.value)
                  }} 
                />
                <input 
                  type="text"
                  placeholder='Font Style'
                    // value={
                    //     dropzoneData[selectedDataIndex]?.styles.padding
                    // } 
                  name={'fontStyle'}
                  onChange={evt => {
                    handleFontValuesChange(evt.target.name, evt.target.value)
                  }} 
                />
               </div>
        </div>
        {
          dropzoneData[selectedDataIndex].type === 'input' &&
          <div className="block">
            <p>Character Limit</p>
            <div className="dir">
              <input type="number" placeholder='MIN' onChange={evt => { handleMinMaxChange('min', evt.target.value) }} />
              <input type="number" placeholder='MAX' onChange={evt => { handleMinMaxChange('max', evt.target.value) }} />
            </div>
          </div>
        }
        <div className="block">
            <p>Padding</p>
            <input 
              type="text"
              placeholder='padding (All sides)'
                // value={
                //     dropzoneData[selectedDataIndex]?.styles.padding
                // } 
                name={'padding'}
                onChange={evt => {
                    handlePaddingChange(evt.target.name, evt.target.value)
                }} 
               />
               <div className="dir">
                <input 
                  type="text"
                  placeholder='top'
                    // value={
                    //     dropzoneData[selectedDataIndex]?.styles.padding
                    // } 
                  name={'paddingTop'}
                  onChange={evt => {
                      handlePaddingChange(evt.target.name, evt.target.value)
                  }} 
                />
                <input 
                  type="text"
                  placeholder='right'
                    // value={
                    //     dropzoneData[selectedDataIndex]?.styles.padding
                    // } 
                  name={'paddingRight'}
                  onChange={evt => {
                      handlePaddingChange(evt.target.name, evt.target.value)
                  }} 
                />
                <input 
                  type="text"
                  placeholder='left'
                    // value={
                    //     dropzoneData[selectedDataIndex]?.styles.padding
                    // } 
                  name={'paddingLeft'}
                  onChange={evt => {
                      handlePaddingChange(evt.target.name, evt.target.value)
                  }} 
                />
                <input 
                  type="text"
                  placeholder='bottom'
                    // value={
                    //     dropzoneData[selectedDataIndex]?.styles.padding
                    // } 
                  name={'paddingBottom'}
                  onChange={evt => {
                      handlePaddingChange(evt.target.name, evt.target.value)
                  }} 
                />
               </div>
        </div>
        <div className="block">
            <p>Margin</p>
            <input 
              type="text"
              placeholder='margin (All sides)'
                // value={
                //     dropzoneData[selectedDataIndex]?.styles.margin
                // } 
                name={'margin'}
                onChange={evt => {
                    handleMarginChange(evt.target.name, evt.target.value)
                }} 
               />
               <div className="dir">
                <input 
                  type="text"
                  placeholder='top'
                    // value={
                    //     dropzoneData[selectedDataIndex]?.styles.margin
                    // } 
                  name={'marginTop'}
                  onChange={evt => {
                      handleMarginChange(evt.target.name, evt.target.value)
                  }} 
                />
                <input 
                  type="text"
                  placeholder='right'
                    // value={
                    //     dropzoneData[selectedDataIndex]?.styles.margin
                    // } 
                  name={'marginRight'}
                  onChange={evt => {
                      handleMarginChange(evt.target.name, evt.target.value)
                  }} 
                />
                <input 
                  type="text"
                  placeholder='left'
                    // value={
                    //     dropzoneData[selectedDataIndex]?.styles.margin
                    // } 
                  name={'marginLeft'}
                  onChange={evt => {
                      handleMarginChange(evt.target.name, evt.target.value)
                  }} 
                />
                <input 
                  type="text"
                  placeholder='bottom'
                    // value={
                    //     dropzoneData[selectedDataIndex]?.styles.margin
                    // } 
                  name={'marginBottom'}
                  onChange={evt => {
                      handleMarginChange(evt.target.name, evt.target.value)
                  }} 
                />
               </div>
        </div>
        <div className="block">
            <p>Background Color</p>
            <ColorPicker onChange={({value, evt}) => handleBgColorChange(value)} defaultValue={dropzoneData[selectedDataIndex].styles.background} />
        </div>
        <div className="block">
            <p>Text Color</p>
            <ColorPicker onChange={({value, evt}) => handleColorChange(value)} defaultValue={dropzoneData[selectedDataIndex].styles.color} />
        </div>
        </div>
    </aside>
  ) : (
    <div className="nothing-selected">
        <p>Select/drop a component to customize</p>
    </div>
  )
}

export default PropertiesPanel