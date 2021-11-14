import React from 'react';
import { ChromePicker } from 'react-color'
import './CanvasTools.css';

function CanvasTools({ clearCanvas, canvaVisibility, setCanvaVisibility, 
  color, setCurrentColor, 
  setCurrentWidth, 
  eraserMode, setEraserMode, 
  displayColorPicker, setDisplayColorPicker , 
  setAttachment}) {

  function handleWidthChange(e){
    try{ 
      setCurrentWidth(e.target.value);
    } catch (e) {
      console.log(e)
    }
  }
  
  function toggleEraserMode (){
    document.querySelector('.eraser').classList.toggle('active');
    setEraserMode(!eraserMode);
    setDisplayColorPicker(false);
  }


  function movePicToInput(){
    const canvas = document.getElementById('canvas');
    const inputField = document.getElementById('attachment-field');
    const dataUrl = canvas.toDataURL();

    const newImg = document.createElement('img');
    newImg.src = dataUrl;
    newImg.alt = 'img from canvas';
    inputField.appendChild(newImg);
    newImg.classList.add('attached-pic_in-input');
    document.querySelector('.cross').classList.remove('tick');
    document.getElementById('attachment-field').style.display = 'block';
    setCanvaVisibility(false);
    setAttachment(true) 
  }

  function clearCanvas() {
    const canvas = document.getElementById('canvas');
    canvas.width = canvas.width;
    setDisplayColorPicker(false)
    }


    return (
      <div className='canvas-tool-bar'> 
        <button className='canvas-tool close-canvas' onClick={() => setCanvaVisibility(!canvaVisibility)} />
        <button className='canvas-tool clear-btn' onClick={() => clearCanvas()} />
        <button className='canvas-tool eraser' 
        onClick={() => toggleEraserMode()}
        ></button>

        <select name='width' className='canvas-tool width-brush'
          onChange={handleWidthChange} 
          onClick={() => setDisplayColorPicker(false)} > 
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

        <button className='canvas-tool color-picker' onClick={() => setDisplayColorPicker(!displayColorPicker)} />
        { displayColorPicker ? 
        <div>
            <div className='color-picker-popup' >
                <ChromePicker disableAlpha
                color={color}
                onChange={ setCurrentColor  }
                onChangeComplete={ setCurrentColor }
                />
            </div> 
        </div> : null }

        <button className='canvas-tool save-btn' 
        onClick={movePicToInput} />

      </div>
    )
}

export default CanvasTools;