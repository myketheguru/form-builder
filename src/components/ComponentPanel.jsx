import { v4 as uuidV4 } from "uuid"
import { BsTextParagraph, BsInputCursorText } from 'react-icons/bs'
import { FaHeading } from 'react-icons/fa'
import { GiClick } from 'react-icons/gi'
import { MdShortText } from 'react-icons/md'

const ComponentPanel = () => {

    const handleDragStart = (evt) => {
        const obj = {}
        obj.id = uuidV4()
        obj.styles = {}
        let elementType = evt.target.dataset.element
        evt.dataTransfer.dropEffect = 'move'
        evt.dataTransfer.effectsAllowed = "all"
        obj.type = elementType

        if (elementType === 'h1') {
            obj.innerHTML = 'Some Placeholder Text'
            obj.className = 'h1-component'
        } else if (elementType === 'p') {
            obj.className = 'p-component'
            if (evt.target.innerText.split(' ')[0] === 'Long') {
                obj.innerHTML = 'Wide thrilled i and the croaking. Art tis a door only above me truly by the, madam sought perched with the a bust to, nevermore faster head with at books rapping. Me deep sought lamplight shall that see let, one.'
            } else {
                obj.innerHTML = 'And and seat lattice is i rapping lenore laden we,.'
            }
        } else if (elementType === 'button') {
            obj.innerHTML = 'Button Text'
            obj.className = 'button-component'
        } else if (elementType === 'input') {
            obj.placeholder = 'Enter text'
            obj.className = 'input-component'
        }

        evt.dataTransfer.setData('text/plain', JSON.stringify(obj))
    }

  return (
    <aside className="components-panel">
        <header>
            <h3>Form Builder</h3>
            <p>Drag fields to build your form</p>
        </header>

        <div className="components-list">
            <div className="component" draggable="true" data-element="h1" onDragStart={handleDragStart}>
                <FaHeading />
                <span>Header</span>
            </div>
            <div className="component" draggable="true" data-element="p" onDragStart={handleDragStart}>
                <MdShortText />
                <span>Short Text</span>
            </div>
            <div className="component" draggable="true" data-element="p" onDragStart={handleDragStart}>
                <BsTextParagraph />
                <span>Long Text</span>
            </div>
            <div className="component" draggable="true" data-element="input" onDragStart={handleDragStart}>
                <BsInputCursorText />
                <span>Input</span>
            </div>
            <div className="component" draggable="true"  data-element="button" onDragStart={handleDragStart}>
                <GiClick />
                <span>Button</span>
            </div>
        </div>
    </aside>
  )
}

export default ComponentPanel