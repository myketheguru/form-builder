/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from 'react'
import { AiOutlineDelete } from "react-icons/ai"
import { FiEdit } from "react-icons/fi"
import ComponentPanel from '../components/ComponentPanel'
import './styles/dashboard.css'

const DashboardScreen = () => {

    const [dropzoneData, setDropzoneData] = useState([])
    const dropzoneRef = useRef()
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

    const handleClick = (evt) => {
        let target = evt.currentTarget

        document.querySelectorAll('.container')
        .forEach(container => container.classList.remove('container-active'))

        if (target.classList.contains('container-active')) {
            target.classList.remove('container-active')
        } else {
            target.classList.add('container-active')
        }
    }

    const removeContainer = (evt, id) => {
        let newDropzoneData = dropzoneData.filter(data => data.id !== id)
        setDropzoneData(newDropzoneData)
    }

  return (
    <div className="dashboard-screen">
        <nav></nav>
        <main>
            <ComponentPanel />
            <div className="arena">
                <div id="dropzone" onDragOver={handleDragOver} onDrop={handleDrop} ref={dropzoneRef}>
                    {
                        dropzoneData.map((data, index) => {
                            const el = React.createElement(data.type, { 
                                className: data.className, 
                                placeholder: data.placeholder, 
                             }, data.innerHTML)

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
                                onClick: handleClick
                            }, el, editBtn, deleteBtn)
                            
                            return container
                        })
                    }
                </div>
                <button>Export to file</button>
            </div>
            <aside className="properties-panel"></aside>
        </main>
    </div>
  )
}

export default DashboardScreen