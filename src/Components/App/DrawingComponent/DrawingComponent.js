import React, { useState, useEffect}  from 'react';
import Canvas from '../Canvas/Canvas';
import CanvasTools from '../CanvasTools/CanvasTools';
import './DrawingComponent.css';
import { firestore } from '../../../firebase';
// const taskListRef = firestore.collection(`users/rLoTYFSoTHQ6RRBnw9Hei9mOlc92/taskList`);

function DrawingComponent ({ canvaVisibility, setCanvaVisibility }) {
    const [currentColor, setCurrentColor] = useState("#g3h3j4");
    const [currentWidth, setCurrentWidth] = useState(4);
    const [eraserMode, setEraserMode] = useState(false);
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    useEffect(() => {console.log(currentColor)}, [currentColor]);

    return ( 
        <div className='drawing-component'>
            <div className='canvas-container'>
                <Canvas color={currentColor} brushWidth={currentWidth} eraser={eraserMode}
                setDisplayColorPicker={setDisplayColorPicker} /> 
            </div>
           
            <CanvasTools canvaVisibility={canvaVisibility} setCanvaVisibility={setCanvaVisibility} color={currentColor} setCurrentColor={setCurrentColor}
            currentWidth={currentWidth} setCurrentWidth={setCurrentWidth}
            eraserMode={eraserMode} setEraserMode={setEraserMode}
            displayColorPicker={displayColorPicker} setDisplayColorPicker={setDisplayColorPicker} />
       
        </div>
    )
}

    export default DrawingComponent;

