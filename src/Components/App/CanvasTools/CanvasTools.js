import React, { useRef, useEffect, useState}  from 'react';
import { ChromePicker } from 'react-color'
import './CanvasTools.css';

function CanvasTools({ color, setCurrentColor, currentWidth, setCurrentWidth, 
  eraserMode, setEraserMode, displayColorPicker, setDisplayColorPicker }) {
  
  const [displayWidthPicker, setDisplayWidthPicker] = useState(false);

  function handleWidthChange(e){
    setCurrentWidth(e.target.value);
  }
  
  function toggleEraserMode (){
    document.querySelector('.eraser').classList.toggle('active');
    setEraserMode(!eraserMode)
  }
    return (
      <div className='canvas-tool-bar'>
        <button className='canvas-tool color-picker' onClick={() => setDisplayColorPicker(!displayColorPicker)}></button>
        { displayColorPicker ? 
        <div>
            <div className='color-picker-popup' >
                <ChromePicker disableAlpha
                color={color}
                // onChange={ setCurrentColor  }
                onChangeComplete={ setCurrentColor }
                />
            </div> 
        </div> : null }
        <select name='width' className='canvas-tool width-brush'
          onChange={handleWidthChange} > 
          <option value='1'>1</option>
          <option value='3'>3</option>
          <option value='5'>5</option>
          <option value='7'>7</option>
          <option value='9'>9</option>
          <option value='15'>15</option>
          <option value='25'>25</option>
          <option value='35'>35</option>
          <option value='70'>70</option>
          <option value='120'>120</option>
        </select>

        <button className='canvas-tool eraser' 
        onClick={() => toggleEraserMode()}
        ></button>
        {/* IF ERASER => do smth in canvas component!!!!! */}

      </div>
    )
}

export default CanvasTools;