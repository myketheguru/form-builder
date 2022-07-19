/* eslint-disable react-hooks/exhaustive-deps */
import { useDropzoneState } from '../store/store'
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
  

  return selectedDataIndex >= 0 ? (
    <aside className="properties-panel" onClick={evt => evt.stopPropagation()}>
        <h3>Field Properties</h3>
        <div className="block">
            <p>Label Text</p>
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
        <div className="block">
            <p>Background Color</p>
            <ColorPicker onChange={({value, evt}) => handleBgColorChange(value)} defaultValue={dropzoneData[selectedDataIndex].styles.background} />
        </div>
        <div className="block">
            <p>Text Color</p>
            <ColorPicker onChange={({value, evt}) => handleColorChange(value)} defaultValue={dropzoneData[selectedDataIndex].styles.color} />
        </div>
    </aside>
  ) : (
    <div className="nothing-selected">
        <p>Select/drop a component to customize</p>
    </div>
  )
}

export default PropertiesPanel