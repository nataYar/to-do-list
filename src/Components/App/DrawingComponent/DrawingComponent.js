import React, { useRef, useEffect, useState}  from 'react';
import Canvas from '../Canvas/Canvas';
import CanvasTools from '../CanvasTools/CanvasTools';
import './DrawingComponent.css';

function DrawingComponent ({ }) {
    const [currentColor, setCurrentColor] = useState("#000000");
    const [currentWidth, setCurrentWidth] = useState(4);
    const [eraserMode, setEraserMode] = useState(false);
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    return ( 
        <div className='drawing-component'>
            <Canvas color={currentColor} brushWidth={currentWidth} eraser={eraserMode}
            setDisplayColorPicker={setDisplayColorPicker} /> 
            {/* TOOLS LIKE CHANGE WIDTH BUTTON and ERASER */}
            <section className='canvas-tools'>
                <CanvasTools color={currentColor} setCurrentColor={setCurrentColor}
                currentWidth={currentWidth} setCurrentWidth={setCurrentWidth}
                eraserMode={eraserMode} setEraserMode={setEraserMode}
                displayColorPicker={displayColorPicker} setDisplayColorPicker={setDisplayColorPicker} />
            </section>
            
        </div>
    )
}

    export default DrawingComponent;

