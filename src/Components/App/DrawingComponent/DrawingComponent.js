import React, { useState}  from 'react';
import Canvas from '../Canvas/Canvas';
import CanvasTools from '../CanvasTools/CanvasTools';
import './DrawingComponent.css';

function DrawingComponent ({ canvaVisibility, setCanvaVisibility, setAttachment }) {
    const [currentColor, setCurrentColor] = useState("#g3h3j4");
    const [currentWidth, setCurrentWidth] = useState(6);
    const [eraserMode, setEraserMode] = useState(false);
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    return ( 
        <div className='drawing-component'>
            <div className='canvas-container'>
                <Canvas color={currentColor} brushWidth={currentWidth} eraser={eraserMode}
                setDisplayColorPicker={setDisplayColorPicker} /> 
            </div>
           
            <CanvasTools canvaVisibility={canvaVisibility} 
            setCanvaVisibility={setCanvaVisibility} 
            color={currentColor} 
            setCurrentColor={setCurrentColor}
            currentWidth={currentWidth} 
            setCurrentWidth={setCurrentWidth}
            eraserMode={eraserMode} 
            setEraserMode={setEraserMode}
            displayColorPicker={displayColorPicker} 
            setDisplayColorPicker={setDisplayColorPicker} 
            setCanvaVisibility={setCanvaVisibility }
            setAttachment={setAttachment}/>
        </div>
    )
}

    export default DrawingComponent;

