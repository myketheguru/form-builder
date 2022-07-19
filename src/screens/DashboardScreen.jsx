/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { AiOutlineDelete } from "react-icons/ai"
import { FiEdit } from "react-icons/fi"
import ComponentPanel from '../components/ComponentPanel'
import PropertiesPanel from '../components/PropertiesPanel'
import { useDropzoneState } from '../store/store'
import './styles/dashboard.css'

const DashboardScreen = () => {

    const dropzoneData = useDropzoneState(state => state.dropzoneData)
    const showProperties = useDropzoneState(state => state.showProperties)
    const setDropzoneData = useDropzoneState(state => state.setDropzoneData)
    const setShowProperties = useDropzoneState(state => state.setShowProperties)
    const setSelectedDataIndex = useDropzoneState(state => state.setSelectedDataIndex)
    const [renderCount, setRenderCount] = useState(0)

    const handleDragOver = (evt) => {
        evt.preventDefault()
        return false
    }

    const handleDrop = (evt) => {
        evt.stopPropagation()

        document.querySelectorAll('.container')
        .forEach(container => container.classList.remove('container-active'))

        try {
            const data = JSON.parse(evt.dataTransfer.getData('text/plain') ?? '{}')
            if (data.className) {
                setDropzoneData([ ...dropzoneData, data])
                console.log(dropzoneData)
            }

            setSelectedDataIndex(dropzoneData.length)
            setShowProperties(true)
            
            return false
        } catch (error) {
            
        }
    } 

    const handleItemDrop = (evt) => {
        evt.stopPropagation()
        document.querySelectorAll('.container')
        .forEach(container => container.classList.remove('container-active'))
        const data = JSON.parse(evt.dataTransfer.getData('text/plain') ?? '{}')
        if (evt.dataTransfer.getData('text/plain').length === 1) {
            let newData = dropzoneData;
            let incoming = Number(evt.dataTransfer.getData('text/plain'))
            let dest = Number(evt.currentTarget.id.slice(-1));

            [newData[incoming], newData[dest]] = [newData[dest], newData[incoming]] 

            setDropzoneData(newData)
            setRenderCount(renderCount + 1)
        } else if (data.className) {
            try {
                let stop = Number(evt.currentTarget.id.slice(-1))
                console.log(stop)
                let newData = dropzoneData
                newData.splice(stop, 0, data)
                
                setDropzoneData(newData)                
                setRenderCount(renderCount + 1)
                return false
            } catch (error) {
                
            }
        }
    }

    const handleClick = (evt, index) => {
        evt.stopPropagation()
        let target = evt.currentTarget

        document.querySelectorAll('.container')
        .forEach(container => container.classList.remove('container-active'))

        if (target.classList.contains('container-active')) {
            target.classList.remove('container-active')
        } else {
            target.classList.add('container-active')
        }
        setSelectedDataIndex(index)
        setShowProperties(true)
    }

    const removeContainer = (evt, id) => {
        evt.stopPropagation()
        let newDropzoneData = dropzoneData.filter(data => data.id !== id)
        setDropzoneData(newDropzoneData)
        setSelectedDataIndex(-1)
        setShowProperties(false)
    }

    const dismissContainerActive = (evt) => {
        document.querySelectorAll('.container')
        .forEach(container => container.classList.remove('container-active'))
        setShowProperties(false)
    }

    const generateDropzoneData = (data, index) => {
        const el = data.type === 'input' ? React.createElement(data.type, { 
            className: data.className,
            style: data.styles, 
            placeholder: data.placeholder, 
         }) : React.createElement(data.type, { 
            className: data.className,
            style: data.styles,
         },  data.innerHTML)

         const editBtn = React.createElement('button', { className: 'edit' }, <FiEdit />)
         
         const deleteBtn = React.createElement('button', {
            className: 'del',
            onClick: (evt) => removeContainer(evt, data.id)
        }, <AiOutlineDelete />)
            
        const container = React.createElement('div', {
            className: 'container container-active',
            draggable: true,
            id: 'container-' + index,
            key: index, 
            onDragStart: (evt) => {
                evt.dataTransfer.setData('text/plain', index.toString())
            },
            onDragOver: (evt) => evt.preventDefault(),
            onDrop: handleItemDrop,
            onClick: (evt) => handleClick(evt, index)
        }, el, editBtn, deleteBtn)
        
        return container
    }
    
    useEffect(() => {
      document.addEventListener('click', dismissContainerActive)
      
      return () => {
        document.removeEventListener('click', dismissContainerActive)
      }
    }, [])
    

  return (
    <div className="dashboard-screen">
        <nav></nav>
        <main>
            <ComponentPanel />
            <div className="arena">
                <div id="dropzone" onDragOver={handleDragOver} onDrop={handleDrop}>
                    {
                        dropzoneData.map(generateDropzoneData)
                    }
                </div>
                <button>Export to file</button>
            </div>
            {showProperties &&  <PropertiesPanel rerender={setRenderCount} />}
        </main>
    </div>
  )
}

export default DashboardScreen