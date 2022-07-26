import { useState } from 'react'
import { AiOutlineAlignLeft, AiOutlineAlignCenter, AiOutlineAlignRight } from "react-icons/ai";


const Alignment = ({ onChange = () => {} }) => {
    const [alignment, setAlignment] = useState('left')
  return (
    <div className="alignment">
        <button className={alignment === 'left' ? 'selected' : 'not-selected'} onClick={() => { onChange('left'); setAlignment('left') }}>
            <AiOutlineAlignLeft />
        </button>
        <button className={alignment === 'center' ? 'selected' : 'not-selected'} onClick={() => { onChange('center'); setAlignment('center') }}>
            <AiOutlineAlignCenter />
        </button>
        <button className={alignment === 'right' ? 'selected' : 'not-selected'} onClick={() => { onChange('right'); setAlignment('right') }}>
            <AiOutlineAlignRight />
        </button>
    </div>
  )
}

export default Alignment